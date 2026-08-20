import {
  collection,
  db,
  doc,
  getCountFromServer,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "../lib/firebase/firestore";
import { getVisitorId } from "./reactionService";

const VISITOR_SESSION_KEY = "portfolio_session_id";

const PUBLIC_EVENT_TYPES = {
  PAGE_VIEW: "page_view",
  PROJECT_VIEW: "project_view",
  GITHUB_CLICK: "github_click",
  LINKEDIN_CLICK: "linkedin_click",
  CONTACT_CLICK: "contact_click",
  FEEDBACK_SUBMITTED: "feedback_submitted",
  PROJECT_REACTION: "project_reaction",
};

const ensureBrowser = () => typeof window !== "undefined";

const getSessionId = () => {
  if (!ensureBrowser()) return "server_session";
  const existing = window.sessionStorage.getItem(VISITOR_SESSION_KEY);
  if (existing) return existing;
  const created = `s_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
  window.sessionStorage.setItem(VISITOR_SESSION_KEY, created);
  return created;
};

const getEventDocId = ({ eventType, projectId }) => {
  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  const timestamp = Date.now();
  return `${eventType}_${projectId || "none"}_${visitorId}_${sessionId}_${timestamp}`;
};

const inferCountryCode = () => {
  if (!ensureBrowser()) return "";
  const languageTag = window.navigator.language || "";
  const parts = languageTag.split("-");
  if (parts.length > 1 && parts[1].length === 2) {
    return parts[1].toUpperCase();
  }
  return "";
};

const inferDeviceType = () => {
  if (!ensureBrowser()) return "";
  const userAgent = window.navigator.userAgent || "";
  if (/tablet|ipad/i.test(userAgent)) return "tablet";
  if (/mobi|android|iphone/i.test(userAgent)) return "mobile";
  return "desktop";
};

const inferBrowser = () => {
  if (!ensureBrowser()) return "";
  const ua = window.navigator.userAgent || "";
  if (/edg/i.test(ua)) return "edge";
  if (/chrome|crios/i.test(ua)) return "chrome";
  if (/firefox|fxios/i.test(ua)) return "firefox";
  if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) return "safari";
  return "other";
};

const inferReferrer = () => {
  if (!ensureBrowser()) return "";
  if (!document.referrer) return "direct";
  try {
    return new URL(document.referrer).hostname || "direct";
  } catch {
    return "direct";
  }
};

const logPublicEvent = async (eventType, payload = {}) => {
  if (!ensureBrowser()) return;

  const visitorId = getVisitorId();
  const sessionId = getSessionId();
  const docId = getEventDocId({ eventType, projectId: payload.projectId });
  const eventLogRef = doc(collection(db, "public_event_logs"), docId);
  const countryCode = inferCountryCode();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const deviceType = inferDeviceType();
  const browser = inferBrowser();
  const referrer = inferReferrer();

  await setDoc(eventLogRef, {
    eventType,
    projectId: payload.projectId || "",
    pagePath: payload.pagePath || "",
    visitorId,
    sessionId,
    countryCode,
    timezone,
    deviceType,
    browser,
    referrer,
    createdAt: serverTimestamp(),
  });
};

const trackPortfolioEvent = async (eventType, payload = {}) => {
  try {
    await logPublicEvent(eventType, payload);
  } catch (error) {
    console.error("Failed to write event log", error);
  }
};

const countPublicEventsByType = async (eventType) => {
  const eventsRef = collection(db, "public_event_logs");
  const eventsQuery = query(eventsRef, where("eventType", "==", eventType));
  const snap = await getCountFromServer(eventsQuery);
  return snap.data().count;
};

const countProjectViews = async (projectId) => {
  const eventsRef = collection(db, "public_event_logs");
  const eventsQuery = query(
    eventsRef,
    where("eventType", "==", PUBLIC_EVENT_TYPES.PROJECT_VIEW),
  );
  const snap = await getDocs(eventsQuery);
  return snap.docs.filter((item) => item.data().projectId === projectId).length;
};

const countUniqueVisitors = async () => {
  const eventsRef = collection(db, "public_event_logs");
  const pageViewQuery = query(
    eventsRef,
    where("eventType", "==", PUBLIC_EVENT_TYPES.PAGE_VIEW),
  );
  const snap = await getDocs(pageViewQuery);
  const uniqueVisitors = new Set();

  snap.docs.forEach((item) => {
    const visitorId = item.data().visitorId;
    if (visitorId) {
      uniqueVisitors.add(visitorId);
    }
  });

  return uniqueVisitors.size;
};

const getPageViewBreakdown = async () => {
  const eventsRef = collection(db, "public_event_logs");
  const pageViewQuery = query(
    eventsRef,
    where("eventType", "==", PUBLIC_EVENT_TYPES.PAGE_VIEW),
  );
  const snap = await getDocs(pageViewQuery);
  const breakdown = {};

  snap.docs.forEach((item) => {
    const pagePath = item.data().pagePath || "/";
    breakdown[pagePath] = (breakdown[pagePath] || 0) + 1;
  });

  return breakdown;
};

const getCountryBreakdown = async () => {
  const eventsRef = collection(db, "public_event_logs");
  const pageViewQuery = query(
    eventsRef,
    where("eventType", "==", PUBLIC_EVENT_TYPES.PAGE_VIEW),
  );
  const snap = await getDocs(pageViewQuery);
  const breakdown = {};

  snap.docs.forEach((item) => {
    const code = item.data().countryCode || "Unknown";
    breakdown[code] = (breakdown[code] || 0) + 1;
  });

  return breakdown;
};

const getDeviceBreakdown = async () => {
  const eventsRef = collection(db, "public_event_logs");
  const pageViewQuery = query(
    eventsRef,
    where("eventType", "==", PUBLIC_EVENT_TYPES.PAGE_VIEW),
  );
  const snap = await getDocs(pageViewQuery);
  const breakdown = {};

  snap.docs.forEach((item) => {
    const deviceType = item.data().deviceType || "unknown";
    breakdown[deviceType] = (breakdown[deviceType] || 0) + 1;
  });

  return breakdown;
};

const getBrowserBreakdown = async () => {
  const eventsRef = collection(db, "public_event_logs");
  const pageViewQuery = query(
    eventsRef,
    where("eventType", "==", PUBLIC_EVENT_TYPES.PAGE_VIEW),
  );
  const snap = await getDocs(pageViewQuery);
  const breakdown = {};

  snap.docs.forEach((item) => {
    const browser = item.data().browser || "other";
    breakdown[browser] = (breakdown[browser] || 0) + 1;
  });

  return breakdown;
};

const getReferrerBreakdown = async () => {
  const eventsRef = collection(db, "public_event_logs");
  const pageViewQuery = query(
    eventsRef,
    where("eventType", "==", PUBLIC_EVENT_TYPES.PAGE_VIEW),
  );
  const snap = await getDocs(pageViewQuery);
  const breakdown = {};

  snap.docs.forEach((item) => {
    const referrer = item.data().referrer || "direct";
    breakdown[referrer] = (breakdown[referrer] || 0) + 1;
  });

  return breakdown;
};

const getVisitsOverTime = async () => {
  const eventsRef = collection(db, "public_event_logs");
  const pageViewQuery = query(
    eventsRef,
    where("eventType", "==", PUBLIC_EVENT_TYPES.PAGE_VIEW),
  );
  const snap = await getDocs(pageViewQuery);
  const breakdown = {};

  snap.docs.forEach((item) => {
    const seconds = item.data().createdAt?.seconds;
    if (!seconds) return;
    const date = new Date(seconds * 1000);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(date.getDate()).padStart(2, "0")}`;
    breakdown[key] = (breakdown[key] || 0) + 1;
  });

  return breakdown;
};

export {
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
  trackPortfolioEvent,
};
