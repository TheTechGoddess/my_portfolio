"use client";

const ReplyModal = ({
  isOpen,
  feedback,
  replyDraft,
  setReplyDraft,
  onClose,
  onSaveReply,
  onModerationUpdate,
  onDeleteFeedback,
}) => {
  if (!isOpen || !feedback) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-[720px] rounded-2xl border border-[#23231f] bg-[#0b0b0b] p-5 shadow-xl shadow-black/50">
        <div className="flex items-center justify-between gap-3">
          <p className="text-2xl font-semibold">Feedback Details</p>
          <button
            type="button"
            onClick={onClose}
            className="border border-[#23231f] rounded-lg px-3 py-1 hover:border-secondary"
          >
            Close
          </button>
        </div>

        <div className="mt-4 grid md:grid-cols-2 gap-3">
          <p className="text-sm">
            <span className="text-accent">Name:</span>{" "}
            {feedback.anonymous ? "Anonymous" : feedback.name || "No name"}
          </p>
          <p className="text-sm">
            <span className="text-accent">Email provided:</span>{" "}
            {feedback.hasEmail ? "Yes" : "No"}
          </p>
          {feedback.hasEmail ? (
            <p className="text-sm md:col-span-2 break-all">
              <span className="text-accent">Email:</span> {feedback.email}
            </p>
          ) : null}
          <p className="text-sm">
            <span className="text-accent">Moderation:</span> {feedback.moderationStatus}
          </p>
          <p className="text-sm">
            <span className="text-accent">Reply status:</span> {feedback.replyStatus}
          </p>
        </div>

        <div className="mt-4 p-3 rounded-lg border border-[#23231f] bg-[#111]">
          <p className="text-xs text-accent uppercase mb-2">Message</p>
          <p>{feedback.message}</p>
        </div>

        <textarea
          rows="5"
          className="w-full mt-4 bg-secondary text-black rounded-lg p-3"
          placeholder="Write a reply"
          value={replyDraft}
          onChange={(event) => setReplyDraft(event.target.value)}
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onSaveReply}
            className="px-3 py-2 rounded-lg bg-secondary text-black font-semibold"
          >
            Save reply
          </button>
          <button
            type="button"
            onClick={() => onModerationUpdate("approved")}
            className="px-3 py-2 rounded-lg border border-primary text-primary"
          >
            Approve
          </button>
          <button
            type="button"
            onClick={() => onModerationUpdate("rejected")}
            className="px-3 py-2 rounded-lg border border-red-400 text-red-300"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => onModerationUpdate("pending")}
            className="px-3 py-2 rounded-lg border border-[#23231f]"
          >
            Set pending
          </button>
          <button
            type="button"
            onClick={onDeleteFeedback}
            className="px-3 py-2 rounded-lg border border-red-400 text-red-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
