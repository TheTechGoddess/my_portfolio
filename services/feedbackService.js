import {
  collection,
  db,
  deleteDoc,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "../lib/firebase/firestore";

const feedbackCollection = collection(db, "feedback");
const publicFeedbackCollection = collection(db, "public_feedback");

const createFeedbackEmailToken = () =>
  `ft_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;

const syncPublicFeedback = async (feedbackId, moderationStatus) => {
  const publicFeedbackRef = doc(db, "public_feedback", feedbackId);

  if (moderationStatus !== "approved") {
    await deleteDoc(publicFeedbackRef);
    return;
  }

  const feedbackRef = doc(db, "feedback", feedbackId);
  const feedbackSnap = await getDoc(feedbackRef);
  if (!feedbackSnap.exists()) return;

  const feedbackData = feedbackSnap.data();
  const displayName = feedbackData.anonymous
    ? "Anonymous"
    : feedbackData.name || "Anonymous";

  await setDoc(publicFeedbackRef, {
    feedbackId,
    displayName,
    anonymous: Boolean(feedbackData.anonymous),
    message: feedbackData.message || "",
    createdAt: feedbackData.createdAt || serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

const submitFeedback = async ({ name, anonymous, message }) => {
  const trimmedName = (name || "").trim();
  const trimmedMessage = (message || "").trim();
  const emailToken = createFeedbackEmailToken();

  if (!trimmedMessage) {
    throw new Error("Feedback message is required.");
  }

  const feedbackRef = doc(feedbackCollection);
  const now = serverTimestamp();

  await setDoc(feedbackRef, {
    name: trimmedName,
    email: "",
    hasEmail: false,
    anonymous: Boolean(anonymous),
    message: trimmedMessage,
    moderationStatus: "pending",
    replyStatus: "none",
    reply: "",
    emailToken,
    createdAt: now,
    updatedAt: now,
  });

  return {
    feedbackId: feedbackRef.id,
    emailToken,
    displayName: anonymous ? "mysterious internet person" : trimmedName || "friend",
    anonymous: Boolean(anonymous),
  };
};

const attachFeedbackEmail = async ({ feedbackId, email, emailToken }) => {
  const trimmedEmail = (email || "").trim();
  if (!trimmedEmail) {
    throw new Error("Email is required.");
  }

  const feedbackRef = doc(db, "feedback", feedbackId);
  await updateDoc(feedbackRef, {
    email: trimmedEmail,
    hasEmail: true,
    emailToken: emailToken || "",
    updatedAt: serverTimestamp(),
  });
};

const subscribeToFeedback = (moderationFilter, callback) => {
  const baseQuery = query(feedbackCollection);
  const feedbackQuery =
    moderationFilter && moderationFilter !== "all"
      ? query(
          feedbackCollection,
          where("moderationStatus", "==", moderationFilter),
        )
      : baseQuery;

  return onSnapshot(feedbackQuery, (snapshot) => {
    const feedbackItems = snapshot.docs
      .map((item) => ({
        id: item.id,
        ...item.data(),
      }))
      .sort((a, b) => {
        const aSeconds = a.createdAt?.seconds || 0;
        const bSeconds = b.createdAt?.seconds || 0;
        return bSeconds - aSeconds;
      });
    callback(feedbackItems);
  });
};

const updateModerationStatus = async (feedbackId, moderationStatus) => {
  const feedbackRef = doc(db, "feedback", feedbackId);
  await updateDoc(feedbackRef, {
    moderationStatus,
    updatedAt: serverTimestamp(),
  });
  await syncPublicFeedback(feedbackId, moderationStatus);
};

const replyToFeedback = async (feedbackId, reply) => {
  const feedbackRef = doc(db, "feedback", feedbackId);
  await updateDoc(feedbackRef, {
    reply: (reply || "").trim(),
    replyStatus: "replied",
    updatedAt: serverTimestamp(),
  });
};

const deleteFeedbackById = async (feedbackId) => {
  const feedbackRef = doc(db, "feedback", feedbackId);
  const publicFeedbackRef = doc(db, "public_feedback", feedbackId);
  await Promise.all([deleteDoc(feedbackRef), deleteDoc(publicFeedbackRef)]);
};

const getFeedbackStats = async () => {
  const totalQuery = query(feedbackCollection);
  const pendingQuery = query(
    feedbackCollection,
    where("moderationStatus", "==", "pending"),
  );
  const approvedQuery = query(
    feedbackCollection,
    where("moderationStatus", "==", "approved"),
  );
  const rejectedQuery = query(
    feedbackCollection,
    where("moderationStatus", "==", "rejected"),
  );
  const repliedQuery = query(
    feedbackCollection,
    where("replyStatus", "==", "replied"),
  );

  const [totalSnap, pendingSnap, approvedSnap, rejectedSnap, repliedSnap] =
    await Promise.all([
    getCountFromServer(totalQuery),
    getCountFromServer(pendingQuery),
    getCountFromServer(approvedQuery),
    getCountFromServer(rejectedQuery),
    getCountFromServer(repliedQuery),
  ]);

  return {
    total: totalSnap.data().count,
    pending: pendingSnap.data().count,
    approved: approvedSnap.data().count,
    rejected: rejectedSnap.data().count,
    replied: repliedSnap.data().count,
  };
};

const getApprovedFeedback = async () => {
  const approvedQuery = query(publicFeedbackCollection);
  const snap = await getDocs(approvedQuery);
  return snap.docs
    .map((item) => ({ id: item.id, ...item.data() }))
    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
};

const subscribeToApprovedFeedback = (callback, limitCount = 6) => {
  const approvedQuery = query(publicFeedbackCollection);

  return onSnapshot(approvedQuery, (snapshot) => {
    const approvedItems = snapshot.docs
      .map((item) => ({ id: item.id, ...item.data() }))
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
      .slice(0, limitCount);

    callback(approvedItems);
  });
};

const backfillPublicApprovedFeedback = async () => {
  const approvedQuery = query(
    feedbackCollection,
    where("moderationStatus", "==", "approved"),
  );
  const snap = await getDocs(approvedQuery);

  await Promise.all(
    snap.docs.map(async (item) => {
      const data = item.data();
      const displayName = data.anonymous ? "Anonymous" : data.name || "Anonymous";
      await setDoc(doc(db, "public_feedback", item.id), {
        feedbackId: item.id,
        displayName,
        anonymous: Boolean(data.anonymous),
        message: data.message || "",
        createdAt: data.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }),
  );
};

export {
  attachFeedbackEmail,
  backfillPublicApprovedFeedback,
  createFeedbackEmailToken,
  deleteFeedbackById,
  getApprovedFeedback,
  getFeedbackStats,
  replyToFeedback,
  submitFeedback,
  subscribeToApprovedFeedback,
  subscribeToFeedback,
  updateModerationStatus,
};
