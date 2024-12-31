import { useEffect } from 'react';
import { UseInfiniteScrollProps } from '../types/hooks';

export const useInfiniteScroll = ({
  sentinelRef,
  loading,
  hasMore,
  loadMore,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    if (!sentinelRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [firstEntry] = entries;

        if (firstEntry.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: '25px',
      }
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [sentinelRef, loading, hasMore, loadMore]);
};
