"use client";

const ReactionButtons = ({
  options,
  summary,
  selectedReaction,
  compact,
  onReact,
  disabled,
  projectName,
}) => {
  return (
    <div className={compact ? "flex flex-wrap justify-center gap-1" : "flex flex-wrap gap-2"}>
      {options.map((option) => {
        const count = summary[option.id] || 0;
        const isActive = selectedReaction === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={(event) => onReact(option.id, option.emoji, event.currentTarget)}
            disabled={disabled}
            className={`rounded-md text-xs border transition focus:outline-none focus:ring-2 focus:ring-primary/80 ${
              isActive
                ? "bg-secondary text-black border-secondary"
                : "bg-black text-[#FDE7EF] border-[#23231f] hover:border-secondary"
            } ${compact ? "px-1.5 py-1" : "px-2 py-1"} ${disabled ? "opacity-70" : ""}`}
            aria-label={`${option.label} reaction for ${projectName}`}
          >
            {option.emoji} {count}
          </button>
        );
      })}
    </div>
  );
};

export default ReactionButtons;
