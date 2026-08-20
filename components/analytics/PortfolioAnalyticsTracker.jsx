"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  PUBLIC_EVENT_TYPES,
  trackPortfolioEvent,
} from "../../services/analyticsService";

const PortfolioAnalyticsTracker = () => {
  const pathname = usePathname();
  const lastTrackedPathRef = useRef("");

  useEffect(() => {
    const query =
      typeof window !== "undefined" ? window.location.search.replace("?", "") : "";
    const pathWithQuery = query ? `${pathname}?${query}` : pathname;

    if (lastTrackedPathRef.current === pathWithQuery) return;
    lastTrackedPathRef.current = pathWithQuery;

    trackPortfolioEvent(PUBLIC_EVENT_TYPES.PAGE_VIEW, {
      pagePath: pathWithQuery,
    });
  }, [pathname]);

  return null;
};

export default PortfolioAnalyticsTracker;
