"use client";

import { useEffect, useMemo, useState } from "react";
import {
  auth,
  onAuthStateChanged,
  signInAdmin,
  signOutAdmin,
} from "../../lib/firebase/auth";
import { portfolioProjectMap } from "../../lib/portfolioProjects";
import { getAdminDashboardMetrics } from "../../services/adminService";
import { backfillPublicApprovedFeedback } from "../../services/feedbackService";
import { REACTION_OPTIONS } from "../../services/reactionService";
import AnalyticsCards from "./AnalyticsCards";
import FeedbackManagement from "./FeedbackManagement";

const cardClass =
  "rounded-2xl border border-[#23231f] bg-[#0b0b0b] p-4 md:p-5 shadow-lg shadow-black/40";

const toEntries = (obj) =>
  Object.entries(obj || {}).sort((a, b) => Number(b[1] || 0) - Number(a[1] || 0));

const ChartBars = ({ title, data, colorClass = "bg-secondary" }) => {
  const entries = toEntries(data);
  const max = Math.max(...entries.map((item) => Number(item[1] || 0)), 1);

  return (
    <div className={cardClass}>
      <p className="text-lg font-semibold">{title}</p>
      <div className="mt-4 space-y-3">
        {!entries.length ? (
          <p className="text-accent text-sm">No data yet.</p>
        ) : (
          entries.map(([label, value]) => {
            const percentage = (Number(value || 0) / max) * 100;
            return (
              <div key={label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <p className="text-accent truncate pr-3">{label}</p>
                  <p className="text-[#FDE7EF] font-semibold">{value}</p>
                </div>
                <div className="h-2 w-full rounded-full bg-[#161616] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${colorClass}`}
                    style={{ width: `${Math.max(percentage, 4)}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthReady(true);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const refreshMetrics = async () => {
    if (!user) return;
    setLoadingMetrics(true);
    try {
      const dashboardMetrics = await getAdminDashboardMetrics();
      setMetrics(dashboardMetrics);
      setError("");
    } catch (metricsError) {
      setError(metricsError.message || "Unable to load dashboard metrics.");
    } finally {
      setLoadingMetrics(false);
    }
  };

  useEffect(() => {
    const syncAndRefresh = async () => {
      if (!user) return;
      await backfillPublicApprovedFeedback();
      await refreshMetrics();
    };
    syncAndRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      await signInAdmin(email.trim(), password);
      setPassword("");
      setError("");
    } catch (loginError) {
      setError(loginError.message || "Unable to sign in.");
    }
  };

  const onLogout = async () => {
    await signOutAdmin();
  };

  const totalReactions = useMemo(
    () =>
      Object.values(metrics?.reactionStats || {}).reduce(
        (total, item) => total + item.total,
        0,
      ),
    [metrics],
  );

  const reactionTypeTotals = useMemo(() => {
    const totals = REACTION_OPTIONS.reduce((acc, option) => {
      acc[`${option.emoji} ${option.label}`] = 0;
      return acc;
    }, {});

    Object.values(metrics?.reactionStats || {}).forEach((projectStat) => {
      REACTION_OPTIONS.forEach((option) => {
        totals[`${option.emoji} ${option.label}`] += projectStat.summary?.[option.id] || 0;
      });
    });

    return totals;
  }, [metrics]);

  const projectEngagementBars = useMemo(
    () =>
      (metrics?.projectEngagement || []).reduce((acc, project) => {
        acc[project.projectName] = project.views + project.reactions;
        return acc;
      }, {}),
    [metrics],
  );

  if (!authReady) {
    return (
      <div className="min-h-screen bg-black text-[#FDE7EF] flex items-center justify-center p-4">
        <p>Loading admin...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-[#FDE7EF] p-6 md:p-10 flex items-center justify-center">
        <div className="max-w-[560px] mx-auto">
          <div className={`${cardClass} border-primary/40`}>
            <p className="text-4xl font-bold inline border-b-4 border-primary">Admin</p>
            <p className="mt-4 text-accent">
              Sign in with your Firebase email/password account.
            </p>
            <form onSubmit={onLogin} className="mt-6 space-y-3">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Admin email"
                className="w-full p-3 bg-secondary rounded-lg text-black placeholder:text-black"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="w-full p-3 bg-secondary rounded-lg text-black placeholder:text-black"
                required
              />
              <button
                type="submit"
                className="border-2 border-secondary bg-secondary text-black px-5 py-3 rounded-lg font-semibold hover:opacity-90"
              >
                Sign in
              </button>
            </form>
            {error ? <p className="mt-4 text-red-300">{error}</p> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#FDE7EF] p-5 md:p-8">
      <div className="max-w-[1200px] mx-auto space-y-7">
        <header className={`${cardClass} border-primary/40`}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-4xl font-bold inline border-b-4 border-primary">
                Portfolio Admin
              </p>
              <p className="mt-3 text-accent text-sm">Signed in as {user.email}</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={refreshMetrics}
                className="border-2 border-[#23231f] hover:border-secondary px-4 py-2 rounded-lg"
              >
                Refresh
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="border-2 border-secondary bg-secondary text-black px-4 py-2 rounded-lg font-semibold"
              >
                Sign out
              </button>
            </div>
          </div>
          {error ? <p className="mt-4 text-red-300">{error}</p> : null}
        </header>

        <section>
          <p className="text-2xl font-semibold mb-4">Overview</p>
          {loadingMetrics || !metrics ? (
            <p className="text-accent">Loading metrics...</p>
          ) : (
            <AnalyticsCards metrics={metrics} totalReactions={totalReactions} />
          )}
        </section>

        <section>
          <p className="text-2xl font-semibold mb-4">Analytics Graphs</p>
          {loadingMetrics || !metrics ? (
            <p className="text-accent">Loading analytics charts...</p>
          ) : (
            <div className="grid lg:grid-cols-2 gap-4">
              <ChartBars title="Visits Over Time" data={metrics.analytics.visitsOverTime} />
              <ChartBars title="Project Engagement" data={projectEngagementBars} />
              <ChartBars title="Page Views by Route" data={metrics.analytics.pageViewBreakdown} />
              <ChartBars title="Reaction Type Distribution" data={reactionTypeTotals} />
              <ChartBars
                title="Country Breakdown (coarse)"
                data={metrics.analytics.countryBreakdown}
                colorClass="bg-primary"
              />
              <ChartBars title="Device Types" data={metrics.analytics.deviceBreakdown} />
              <ChartBars title="Browsers" data={metrics.analytics.browserBreakdown} />
              <ChartBars title="Referrers" data={metrics.analytics.referrerBreakdown} />
            </div>
          )}
        </section>

        <section>
          <p className="text-2xl font-semibold mb-4">Project Analytics</p>
          {loadingMetrics || !metrics ? (
            <p className="text-accent">Loading project metrics...</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {metrics.projectEngagement.map((project) => (
                <div key={project.projectId} className={`${cardClass} border-secondary/30`}>
                  <p className="font-semibold text-lg">
                    {portfolioProjectMap[project.projectId]?.name || project.projectName}
                  </p>
                  <p className="text-sm text-accent mt-1">
                    Views: {project.views} | Reactions: {project.reactions}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {REACTION_OPTIONS.map((reaction) => (
                      <span
                        key={`${project.projectId}_${reaction.id}`}
                        className="text-xs px-2 py-1 border border-[#23231f] rounded-md bg-[#111]"
                      >
                        {reaction.emoji}{" "}
                        {metrics.reactionStats[project.projectId]?.summary?.[reaction.id] || 0}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <FeedbackManagement onDataChanged={refreshMetrics} />
      </div>
    </div>
  );
};

export default AdminDashboard;
