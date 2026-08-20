"use client";

import FeedbackCard from "./FeedbackCard";

const FeedbackList = ({ items, selectedFeedbackId, onSelect }) => {
  return (
    <div className="rounded-2xl border border-[#23231f] bg-[#0b0b0b] p-4 max-h-[620px] overflow-auto shadow-lg shadow-black/40">
      {items.map((item) => (
        <FeedbackCard
          key={item.id}
          item={item}
          isSelected={selectedFeedbackId === item.id}
          onSelect={onSelect}
        />
      ))}
      {!items.length ? <p className="p-3 text-accent">No feedback for this filter.</p> : null}
    </div>
  );
};

export default FeedbackList;
