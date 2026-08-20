"use client";

import { useEffect, useRef, useState } from "react";
import { subscribeToApprovedFeedback } from "../../services/feedbackService";

const ApprovedFeedbackShowcase = () => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeToApprovedFeedback((items) => {
      setFeedbackItems(items);
    }, 6);

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return undefined;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`w-full mb-10 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div className="pb-6">
        <p className="text-4xl font-bold inline border-b-4 border-primary">
          What people are saying
        </p>
        <p className="py-4 text-accent">
          Feedback from visitors and collaborators.
        </p>
      </div>
      {!feedbackItems.length ? (
        <div className="rounded-2xl border border-[#23231f] bg-[#0b0b0b] p-6 text-accent">
          No feedback yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedbackItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-[#23231f] bg-[#0b0b0b] p-4 shadow-md shadow-black/40 hover:border-secondary/60 transition-colors duration-300"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-sm text-accent">{item.displayName || "Anonymous"}</p>
                {item.createdAt?.seconds ? (
                  <p className="text-xs text-accent">
                    {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
                  </p>
                ) : null}
              </div>
              <p className="text-[#FDE7EF] leading-relaxed">{item.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApprovedFeedbackShowcase;
