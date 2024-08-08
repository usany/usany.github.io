import "./SwipeableViews.css";
import React, { useCallback, useEffect, useRef } from "react";

export function SwipeableViews({
  className = "",
  index,
  onIndexChange,
  onScroll,
  num,
  ...rootProps
}: {
  index: number;
  num: number;
  onIndexChange: (page: number) => void;
} & React.HTMLProps<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeout = useRef<number>();
  const lastChildrenCount = useRef(0);

  // on every rerender
  useEffect(() => {
    if (!containerRef.current) return;

    // set aria-hidden and inert on all children that aren't current page
    const currentChild = containerRef.current.children[index];
    for (const child of Array.from(containerRef.current.children)) {
      if (!(child instanceof HTMLElement)) continue;
      child.ariaHidden = child !== currentChild ? "true" : null;
      child.inert = child !== currentChild;
    }

    // only if number of children changed
    const childrenCount = containerRef.current.children.length;
    if (childrenCount !== lastChildrenCount.current) {
      lastChildrenCount.current = childrenCount;

      // scroll container to the current page instantly
      console.log(
        "instant scroll to page",
        index,
        containerRef.current?.children[index]
      );
      const pageWidth =
        containerRef.current.scrollWidth / containerRef.current.children.length;
      containerRef.current?.scrollTo({
        behavior: "instant",
        left: index * pageWidth,
        top: 0,
      });
    }
  });

  // on page index change
  useEffect(() => {
    if (!containerRef.current) return;

    // scroll container to the current page smoothly
    console.log(
      "smooth scroll to page",
      index,
      containerRef.current.children[index]
    );
    const pageWidth =
      containerRef.current.scrollWidth / containerRef.current.children.length;
    containerRef.current.scrollTo({
      behavior: "smooth",
      left: index * pageWidth,
      top: 0,
    });
  }, [index]);

  // on user scroll
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      onScroll?.(event);
      const { currentTarget } = event;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = window.setTimeout(() => {
        // update current page index
        const pageWidth =
          currentTarget.scrollWidth / currentTarget.children.length;
        let currentPage
        if (num === 1) {
          currentPage = Math.round(currentTarget.scrollLeft / pageWidth);
          if (currentPage === 1) {
            // currentPage = currentPage+3
          }
        } else {
          currentPage = Math.round(currentTarget.scrollLeft / pageWidth);
          if (currentPage === 1) {
            currentPage = currentPage+3
          }
          if (currentPage === 0) {
            currentPage = currentPage+3
          }
        }
          // const currentPage = Math.round(currentTarget.scrollLeft / pageWidth);
        onIndexChange(currentPage);
      }, 100);
    },
  );

  return (
    <div
      {...rootProps}
      ref={containerRef}
      className={`SwipeableViews ${className}`}
      onScroll={handleScroll}
    />
  );
}
