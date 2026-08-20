"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  REACTION_OPTIONS,
  getStoredReactionForProject,
  submitProjectReaction,
  subscribeToProjectReactionSummary,
} from "../../services/reactionService";
import {
  PUBLIC_EVENT_TYPES,
  trackPortfolioEvent,
} from "../../services/analyticsService";
import ReactionAnimation from "./ReactionAnimation";
import ReactionButtons from "./ReactionButtons";

const ProjectReactionBar = ({ projectId, projectName, compact = false }) => {
  const [selectedReaction, setSelectedReaction] = useState("");
  const [reactionSummary, setReactionSummary] = useState({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [animations, setAnimations] = useState([]);
  const containerRef = useRef(null);
  const counterRef = useRef(null);

  const reducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    setSelectedReaction(getStoredReactionForProject(projectId));
    const unsubscribe = subscribeToProjectReactionSummary(projectId, (data) => {
      setReactionSummary(data.summary);
      setTotal(data.total);
    });
    return () => unsubscribe();
  }, [projectId]);

  const createAnimation = (reactionId, emoji, buttonNode) => {
    if (reducedMotion || !containerRef.current || !buttonNode) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = buttonNode.getBoundingClientRect();
    const counterRect = counterRef.current?.getBoundingClientRect();

    const x = buttonRect.left - containerRect.left + buttonRect.width / 2;
    const y = buttonRect.top - containerRect.top + buttonRect.height / 2;
    const vx = buttonRect.left + buttonRect.width / 2;
    const vy = buttonRect.top + buttonRect.height / 2;
    const tx = counterRect
      ? counterRect.left - containerRect.left + counterRect.width / 2
      : x + 40;
    const ty = counterRect
      ? counterRect.top - containerRect.top + counterRect.height / 2
      : y - 35;
    const vtx = counterRect
      ? counterRect.left + counterRect.width / 2
      : vx + 40;
    const vty = counterRect
      ? counterRect.top + counterRect.height / 2
      : vy - 35;

    const mode = Math.random() > 0.5 ? "burst" : "fly";
    const paletteByReaction = {
      loved_it: ["#FC458A", "#FDE7EF", "#D1D5DB"],
      impressive: ["#FC458A", "#4599fc", "#FDE7EF"],
      good_project: ["#4599fc", "#D1D5DB", "#FDE7EF"],
      interesting: ["#D1D5DB", "#4599fc", "#FC458A"],
    };
    const symbolsByReaction = {
      loved_it: ["❤", "✦", "✶"],
      impressive: ["🔥", "✦", "•"],
      good_project: ["👍", "✦", "•"],
      interesting: ["💡", "✶", "•"],
    };

    const particles = Array.from({ length: 8 }).map((_, index) => {
      const angle = (Math.PI * 2 * index) / 8;
      const distance = 26 + Math.random() * 24;
      const colors =
        paletteByReaction[reactionId] || paletteByReaction.interesting;
      const symbols =
        symbolsByReaction[reactionId] || symbolsByReaction.interesting;
      return {
        id: `${Date.now()}_${index}`,
        color: colors[index % colors.length],
        symbol: symbols[index % symbols.length],
        size: 9 + Math.random() * 6,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
      };
    });

    const animation = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      type: mode,
      emoji,
      x,
      y,
      vx,
      vy,
      tx,
      ty,
      vtx,
      vty,
      particles,
    };

    setAnimations((prev) => [...prev, animation]);
    setTimeout(
      () => {
        setAnimations((prev) =>
          prev.filter((item) => item.id !== animation.id),
        );
      },
      mode === "burst" ? 1500 : 1700,
    );
  };

  const handleReaction = async (reactionId, emoji, buttonNode) => {
    if (loading) return;
    setLoading(true);

    try {
      createAnimation(reactionId, emoji, buttonNode);
      const nextReaction = await submitProjectReaction({
        projectId,
        reactionId,
      });
      setSelectedReaction(nextReaction);

      await trackPortfolioEvent(PUBLIC_EVENT_TYPES.PROJECT_REACTION, {
        projectId,
        reactionId,
        pagePath: "/",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={
        compact
          ? "mt-3 pt-2 border-t border-white/30 relative"
          : "mt-2 p-3 rounded-md border border-[#23231f] bg-[#000] relative"
      }
    >
      <ReactionAnimation
        animations={animations}
        reducedMotion={reducedMotion}
      />
      {!compact ? (
        <p className="text-sm text-accent mb-2">
          What did you think about{" "}
          <span className="text-[#FDE7EF]">{projectName}</span>?{" "}
          <span ref={counterRef}>({total})</span>
        </p>
      ) : (
        <p className="text-xs text-[#FDE7EF] mb-1">
          What did you think? <span ref={counterRef}>({total})</span>
        </p>
      )}
      <ReactionButtons
        options={REACTION_OPTIONS}
        summary={reactionSummary}
        selectedReaction={selectedReaction}
        compact={compact}
        disabled={loading}
        projectName={projectName}
        onReact={handleReaction}
      />
    </div>
  );
};

export default ProjectReactionBar;
