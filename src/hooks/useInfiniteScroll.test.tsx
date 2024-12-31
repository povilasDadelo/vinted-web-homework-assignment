import { useRef } from 'react';
import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, Mock, beforeEach, afterEach } from 'vitest';
import { useInfiniteScroll } from './useInfiniteScroll';
import MockIntersectionObserver from '../__mocks__/mockIntersectionObserver';

describe('useInfiniteScroll', () => {
  let loadMoreMock: Mock;
  let observerInstance: MockIntersectionObserver | undefined;

  const TestComponent = ({
    loading,
    hasMore,
  }: {
    loading: boolean;
    hasMore: boolean;
  }) => {
    const sentinelRef = useRef<HTMLDivElement>(null);

    useInfiniteScroll({
      sentinelRef,
      loading,
      hasMore,
      loadMore: loadMoreMock,
    });

    return <div ref={sentinelRef} data-testid="sentinel" />;
  };

  beforeEach(() => {
    loadMoreMock = vi.fn();
    MockIntersectionObserver.instances = [];
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('calls loadMore when sentinel is intersecting, not loading, and hasMore is true', () => {
    render(<TestComponent loading={false} hasMore={true} />);

    observerInstance = MockIntersectionObserver.instances[0];

    expect(observerInstance).toBeDefined();

    const sentinel = document.querySelector('[data-testid="sentinel"]') as Element;

    expect(sentinel).toBeInTheDocument();

    observerInstance.triggerIntersect(true, sentinel);

    expect(loadMoreMock).toHaveBeenCalledTimes(1);
  });

  it('does not call loadMore when hasMore is false', () => {
    render(<TestComponent loading={false} hasMore={false} />);

    observerInstance = MockIntersectionObserver.instances[0];

    expect(observerInstance).toBeUndefined();
    expect(loadMoreMock).not.toHaveBeenCalled();
  });

  it('does not call loadMore when loading is true', () => {
    render(<TestComponent loading={true} hasMore={true} />);

    observerInstance = MockIntersectionObserver.instances[0];

    expect(observerInstance).toBeUndefined();
    expect(loadMoreMock).not.toHaveBeenCalled();
  });

  it('does not call loadMore when sentinelRef is null', () => {
    const NoSentinelComponent = () => {
      const sentinelRef = useRef<HTMLDivElement>(null);

      useInfiniteScroll({
        sentinelRef,
        loading: false,
        hasMore: true,
        loadMore: loadMoreMock,
      });

      return <div data-testid="no-sentinel" />;
    };

    render(<NoSentinelComponent />);

    observerInstance = MockIntersectionObserver.instances[0];

    expect(observerInstance).toBeUndefined();
    expect(loadMoreMock).not.toHaveBeenCalled();
  });

  it('disconnects observer on cleanup', () => {
    const { unmount } = render(<TestComponent loading={false} hasMore={true} />);

    observerInstance = MockIntersectionObserver.instances[0];

    expect(observerInstance).toBeDefined();

    unmount();

    expect(observerInstance?.disconnect).toHaveBeenCalled();
  });
});
