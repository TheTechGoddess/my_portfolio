import {
  collection,
  db,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
} from "../lib/firebase/firestore";
import { portfolioProjects } from "../lib/portfolioProjects";

const VISITOR_ID_KEY = "portfolio_visitor_id";
const REACTION_OPTIONS = [
  { id: "loved_it", label: "Loved it", emoji: "❤️" },
  { id: "impressive", label: "Very impressive", emoji: "🔥" },
  { id: "good_project", label: "Good project", emoji: "👍" },
  { id: "interesting", label: "Interesting", emoji: "💡" },
];

const reactionOptionIds = REACTION_OPTIONS.map((item) => item.id);

const ensureBrowser = () => typeof window !== "undefined";

const getVisitorId = () => {
  if (!ensureBrowser()) return "server";
  const existing = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;

  const created = `v_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
  window.localStorage.setItem(VISITOR_ID_KEY, created);
  return created;
};

const getReactionDocRef = (projectId, visitorId) =>
  doc(db, "projects", projectId, "reactions", visitorId);

const getVisitorReactionStorageKey = (projectId) =>
  `portfolio_project_reaction_${projectId}`;

const getStoredReactionForProject = (projectId) => {
  if (!ensureBrowser()) return "";
  return window.localStorage.getItem(getVisitorReactionStorageKey(projectId)) || "";
};

const setStoredReactionForProject = (projectId, reactionId) => {
  if (!ensureBrowser()) return;
  if (!reactionId) {
    window.localStorage.removeItem(getVisitorReactionStorageKey(projectId));
    return;
  }
  window.localStorage.setItem(getVisitorReactionStorageKey(projectId), reactionId);
};

const submitProjectReaction = async ({ projectId, reactionId }) => {
  if (!reactionOptionIds.includes(reactionId)) {
    throw new Error("Invalid reaction selected.");
  }

  const visitorId = getVisitorId();
  const projectReactionDocRef = getReactionDocRef(projectId, visitorId);
  const existingSnap = await getDoc(projectReactionDocRef);
  const existingReaction = existingSnap.exists() ? existingSnap.data().reaction : "";

  if (existingReaction === reactionId) {
    await deleteDoc(projectReactionDocRef);
    setStoredReactionForProject(projectId, "");
    return "";
  }

  await setDoc(
    projectReactionDocRef,
    {
      projectId,
      visitorId,
      reaction: reactionId,
      createdAt: existingSnap.exists()
        ? existingSnap.data().createdAt || serverTimestamp()
        : serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  setStoredReactionForProject(projectId, reactionId);
  return reactionId;
};

const emptyReactionSummary = () =>
  REACTION_OPTIONS.reduce((acc, item) => {
    acc[item.id] = 0;
    return acc;
  }, {});

const subscribeToProjectReactionSummary = (projectId, callback) => {
  const reactionsRef = collection(db, "projects", projectId, "reactions");
  const reactionsQuery = query(reactionsRef);

  return onSnapshot(reactionsQuery, (snapshot) => {
    const summary = emptyReactionSummary();

    snapshot.docs.forEach((reactionDoc) => {
      const reactionData = reactionDoc.data();
      if (summary[reactionData.reaction] !== undefined) {
        summary[reactionData.reaction] += 1;
      }
    });

    callback({
      summary,
      total: snapshot.docs.length,
    });
  });
};

const getAllProjectReactionStats = async () => {
  const stats = {};

  await Promise.all(
    portfolioProjects.map(async (project) => {
      const reactionsRef = collection(
        db,
        "projects",
        project.id,
        "reactions",
      );
      const snap = await getDocs(query(reactionsRef));
      const summary = emptyReactionSummary();
      snap.docs.forEach((item) => {
        const reactionData = item.data();
        if (summary[reactionData.reaction] !== undefined) {
          summary[reactionData.reaction] += 1;
        }
      });
      stats[project.id] = {
        projectName: project.name,
        total: snap.docs.length,
        summary,
      };
    }),
  );

  return stats;
};

const getReactionLabel = (reactionId) =>
  REACTION_OPTIONS.find((item) => item.id === reactionId)?.label || "";

const getReactionEmoji = (reactionId) =>
  REACTION_OPTIONS.find((item) => item.id === reactionId)?.emoji || "";

export {
  REACTION_OPTIONS,
  getAllProjectReactionStats,
  getReactionEmoji,
  getReactionLabel,
  getStoredReactionForProject,
  getVisitorId,
  submitProjectReaction,
  subscribeToProjectReactionSummary,
};
