"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteFeedbackById,
  replyToFeedback,
  subscribeToFeedback,
  updateModerationStatus,
} from "../../services/feedbackService";
import FeedbackList from "./FeedbackList";
import ReplyModal from "./ReplyModal";

const moderationFilters = ["all", "pending", "approved", "rejected"];

const FeedbackManagement = ({ onDataChanged }) => {
  const [moderationFilter, setModerationFilter] = useState("all");
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyDraft, setReplyDraft] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToFeedback(moderationFilter, (items) => {
      setFeedbackItems(items);
      if (!selectedFeedbackId && items.length) {
        setSelectedFeedbackId(items[0].id);
      }
    });

    return () => unsubscribe();
  }, [moderationFilter, selectedFeedbackId]);

  const selectedFeedback = useMemo(
    () => feedbackItems.find((item) => item.id === selectedFeedbackId),
    [feedbackItems, selectedFeedbackId],
  );

  useEffect(() => {
    setReplyDraft(selectedFeedback?.reply || "");
  }, [selectedFeedback]);

  const clearMessages = () => {
    setNotice("");
    setError("");
  };

  const onModerationUpdate = async (nextStatus) => {
    if (!selectedFeedback) return;
    clearMessages();
    try {
      await updateModerationStatus(selectedFeedback.id, nextStatus);
      setNotice(`Feedback marked as ${nextStatus}.`);
      onDataChanged?.();
    } catch (actionError) {
      setError(actionError.message || "Unable to update moderation status.");
    }
  };

  const onDeleteFeedback = async () => {
    if (!selectedFeedback) return;
    clearMessages();
    try {
      await deleteFeedbackById(selectedFeedback.id);
      setSelectedFeedbackId("");
      setIsModalOpen(false);
      setNotice("Feedback deleted.");
      onDataChanged?.();
    } catch (actionError) {
      setError(actionError.message || "Unable to delete feedback.");
    }
  };

  const onSaveReply = async () => {
    if (!selectedFeedback) return;
    clearMessages();
    try {
      await replyToFeedback(selectedFeedback.id, replyDraft);
      setNotice("Reply saved. Reply status is now replied.");
      onDataChanged?.();
    } catch (actionError) {
      setError(actionError.message || "Unable to save reply.");
    }
  };

  return (
    <section>
      <p className="text-2xl font-semibold mb-4">Feedback Management</p>
      {notice ? <p className="mb-3 text-green-300">{notice}</p> : null}
      {error ? <p className="mb-3 text-red-300">{error}</p> : null}

      <div className="flex flex-wrap gap-2 mb-4">
        {moderationFilters.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setModerationFilter(option)}
            className={`px-3 py-2 rounded-lg border ${
              moderationFilter === option
                ? "bg-secondary text-black border-secondary"
                : "border-[#23231f] hover:border-secondary"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <FeedbackList
        items={feedbackItems}
        selectedFeedbackId={selectedFeedbackId}
        onSelect={(id) => {
          setSelectedFeedbackId(id);
          setIsModalOpen(true);
        }}
      />

      <ReplyModal
        isOpen={isModalOpen}
        feedback={selectedFeedback}
        replyDraft={replyDraft}
        setReplyDraft={setReplyDraft}
        onClose={() => setIsModalOpen(false)}
        onSaveReply={onSaveReply}
        onModerationUpdate={onModerationUpdate}
        onDeleteFeedback={onDeleteFeedback}
      />
    </section>
  );
};

export default FeedbackManagement;
