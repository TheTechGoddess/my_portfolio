"use client";

const cardClass =
  "rounded-2xl border border-[#23231f] bg-[#0b0b0b] p-4 md:p-5 shadow-lg shadow-black/40";

const StatCard = ({ label, value, extra }) => (
  <div className={`${cardClass} min-h-[110px] flex flex-col justify-between`}>
    <p className="text-sm text-accent">{label}</p>
    <p className="text-3xl font-bold text-[#FDE7EF]">{value}</p>
    {extra ? <p className="text-xs text-accent">{extra}</p> : null}
  </div>
);

const AnalyticsCards = ({ metrics, totalReactions }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total visits"
        value={metrics.analytics.totalVisitors}
        extra={`${metrics.analytics.visitGrowthPercent >= 0 ? "+" : ""}${metrics.analytics.visitGrowthPercent}%`}
      />
      <StatCard label="Total page views" value={metrics.analytics.totalPageViews} />
      <StatCard label="Total reactions" value={totalReactions} />
      <StatCard label="Total feedback" value={metrics.feedback.total} />
      <StatCard label="Pending feedback" value={metrics.feedback.pending} />
      <StatCard label="Approved feedback" value={metrics.feedback.approved} />
      <StatCard label="Rejected feedback" value={metrics.feedback.rejected} />
      <StatCard label="Replied feedback" value={metrics.feedback.replied} />
    </div>
  );
};

export default AnalyticsCards;
