import { useRef, useEffect } from "react";
import { useIntersection } from "react-use";

const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: any) => {
  const observerRef = useRef(null);

  const trigger = (entry: any) => {
    if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const intersection = useIntersection(observerRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  useEffect(() => {
    if (intersection && intersection.intersectionRatio < 1000) {
      trigger(intersection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  return {
    observerRef,
  };
};

export default useInfiniteScroll;
