"use client";

const FeedbackCard = ({ item, isSelected, onSelect }) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(item.id)}
      className={`w-full text-left p-3 border-b border-[#23231f] rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-primary/70 ${
        isSelected ? "bg-[#131722] border-secondary" : "bg-[#0f0f0f] hover:bg-[#131313]"
      }`}
    >
      <p className="text-xs uppercase text-accent">
        {item.moderationStatus} | {item.replyStatus}
      </p>
      <p className="font-semibold mt-1">{item.anonymous ? "Anonymous" : item.name || "No name"}</p>
      <p className="text-sm text-accent truncate">{item.message}</p>
    </button>
  );
};

export default FeedbackCard;
