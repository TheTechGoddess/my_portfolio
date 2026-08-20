import { portfolioProjects } from "../lib/portfolioProjects";
import {
  PUBLIC_EVENT_TYPES,
  countProjectViews,
  countPublicEventsByType,
  countUniqueVisitors,
  getBrowserBreakdown,
  getCountryBreakdown,
  getDeviceBreakdown,
  getPageViewBreakdown,
  getReferrerBreakdown,
  getVisitsOverTime,
} from "./analyticsService";
import { getFeedbackStats } from "./feedbackService";
import { getAllProjectReactionStats } from "./reactionService";

const getVisitGrowth = (visitsOverTime) => {
  const entries = Object.entries(visitsOverTime || {}).sort((a, b) =>
    a[0].localeCompare(b[0]),
  );
  const recent = entries.slice(-14);
  const previous = entries.slice(-28, -14);
  const recentTotal = recent.reduce((sum, [, value]) => sum + Number(value || 0), 0);
  const previousTotal = previous.reduce((sum, [, value]) => sum + Number(value || 0), 0);

  if (previousTotal === 0) {
    return recentTotal > 0 ? 100 : 0;
  }

  return Math.round(((recentTotal - previousTotal) / previousTotal) * 100);
};

const getAdminDashboardMetrics = async () => {
  const [
    feedbackStats,
    reactionStats,
    githubClicks,
    linkedinClicks,
    totalPageViews,
    totalContactClicks,
    feedbackSubmissions,
    projectReactionsTracked,
    totalVisitors,
    pageViewBreakdown,
    countryBreakdown,
    deviceBreakdown,
    browserBreakdown,
    referrerBreakdown,
    visitsOverTime,
  ] = await Promise.all([
    getFeedbackStats(),
    getAllProjectReactionStats(),
    countPublicEventsByType(PUBLIC_EVENT_TYPES.GITHUB_CLICK),
    countPublicEventsByType(PUBLIC_EVENT_TYPES.LINKEDIN_CLICK),
    countPublicEventsByType(PUBLIC_EVENT_TYPES.PAGE_VIEW),
    countPublicEventsByType(PUBLIC_EVENT_TYPES.CONTACT_CLICK),
    countPublicEventsByType(PUBLIC_EVENT_TYPES.FEEDBACK_SUBMITTED),
    countPublicEventsByType(PUBLIC_EVENT_TYPES.PROJECT_REACTION),
    countUniqueVisitors(),
    getPageViewBreakdown(),
    getCountryBreakdown(),
    getDeviceBreakdown(),
    getBrowserBreakdown(),
    getReferrerBreakdown(),
    getVisitsOverTime(),
  ]);

  const projectViewEntries = await Promise.all(
    portfolioProjects.map(async (project) => {
      const views = await countProjectViews(project.id);
      return [project.id, views];
    }),
  );

  const projectViews = Object.fromEntries(projectViewEntries);

  const projectEngagement = portfolioProjects
    .map((project) => {
      const reactionTotal = reactionStats[project.id]?.total || 0;
      const viewTotal = projectViews[project.id] || 0;
      return {
        projectId: project.id,
        projectName: project.name,
        views: viewTotal,
        reactions: reactionTotal,
        engagementScore: viewTotal + reactionTotal,
      };
    })
    .sort((a, b) => b.engagementScore - a.engagementScore);

  return {
    feedback: feedbackStats,
    clicks: {
      github: githubClicks,
      linkedin: linkedinClicks,
    },
    analytics: {
      totalVisitors,
      totalPageViews,
      totalContactClicks,
      feedbackSubmissions,
      projectReactionsTracked,
      pageViewBreakdown,
      countryBreakdown,
      deviceBreakdown,
      browserBreakdown,
      referrerBreakdown,
      visitsOverTime,
      visitGrowthPercent: getVisitGrowth(visitsOverTime),
    },
    projectViews,
    reactionStats,
    projectEngagement,
  };
};

export { getAdminDashboardMetrics };
