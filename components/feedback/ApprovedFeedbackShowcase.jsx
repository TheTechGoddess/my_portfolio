"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { subscribeToApprovedFeedback } from "../../services/feedbackService";

const ITEMS_PER_PAGE = 6;
const AUTO_PLAY_MS = 7000;
const SLIDE_MS = 1600;

const FeedbackCard = ({ item }) => (
  <article className="rounded-2xl border border-[#23231f] bg-[#0b0b0b] p-4 shadow-md shadow-black/40 hover:border-secondary/60 transition-colors duration-300 h-full">
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
);

const ApprovedFeedbackShowcase = () => {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeToApprovedFeedback((items) => {
      setFeedbackItems(items);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  const pages = useMemo(() => {
    const grouped = [];
    for (let index = 0; index < feedbackItems.length; index += ITEMS_PER_PAGE) {
      grouped.push(feedbackItems.slice(index, index + ITEMS_PER_PAGE));
    }
    return grouped;
  }, [feedbackItems]);

  const totalPages = pages.length;
  const hasCarousel = totalPages > 1;

  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(Math.max(totalPages - 1, 0));
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return undefined;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (!hasCarousel || !isVisible || prefersReducedMotion || isPaused) {
      return undefined;
    }

    const timer = window.setInterval(goToNextPage, AUTO_PLAY_MS);
    return () => window.clearInterval(timer);
  }, [
    hasCarousel,
    isVisible,
    prefersReducedMotion,
    isPaused,
    goToNextPage,
  ]);

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
        <div>
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsPaused(false);
              }
            }}
          >
            <div
              className={`flex ${
                prefersReducedMotion
                  ? ""
                  : "transition-transform ease-in-out"
              }`}
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
                transitionDuration: prefersReducedMotion ? "0ms" : `${SLIDE_MS}ms`,
              }}
              aria-live="polite"
              aria-label={`Feedback page ${currentPage + 1} of ${totalPages}`}
            >
              {pages.map((pageItems, pageIndex) => (
                <div
                  key={`feedback-page-${pageIndex}`}
                  className="w-full flex-shrink-0"
                >
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pageItems.map((item) => (
                      <FeedbackCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {hasCarousel ? (
            <div className="mt-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={goToPreviousPage}
                  aria-label="Previous feedback"
                  className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-black transition-colors duration-300"
                >
                  <HiChevronLeft size={22} />
                </button>

                <p className="text-sm text-accent min-w-[88px] text-center">
                  {currentPage + 1} / {totalPages}
                </p>

                <button
                  type="button"
                  onClick={goToNextPage}
                  aria-label="Next feedback"
                  className="w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-black transition-colors duration-300"
                >
                  <HiChevronRight size={22} />
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                {pages.map((_, index) => (
                  <button
                    key={`feedback-dot-${index}`}
                    type="button"
                    onClick={() => setCurrentPage(index)}
                    aria-label={`Go to feedback page ${index + 1}`}
                    aria-current={currentPage === index ? "true" : undefined}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentPage === index
                        ? "w-7 bg-primary"
                        : "w-2.5 bg-[#23231f] hover:bg-secondary/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ApprovedFeedbackShowcase;
