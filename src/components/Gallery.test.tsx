import { vi, MockedFunction } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('../../src/hooks/usePhotoGallery', () => ({
  usePhotoGallery: vi.fn(),
}));

vi.mock('../../src/hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: vi.fn(),
}));

import { Gallery } from './Gallery';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import { mockPhoto } from '../__mocks__/mockPhoto';
import { UsePhotoGalleryResult } from '../types/hooks';

describe('Gallery Component', () => {
  const renderGallery = (mockReturn: UsePhotoGalleryResult) => {
    const mockedUsePhotoGallery = usePhotoGallery as MockedFunction<typeof usePhotoGallery>;
    const mockedUseInfiniteScroll = useInfiniteScroll as MockedFunction<typeof useInfiniteScroll>;

    mockedUsePhotoGallery.mockReturnValue(mockReturn);
    mockedUseInfiniteScroll.mockImplementation(({ loadMore, loading, hasMore }) => {
      if (!loading && hasMore) {
        loadMore();
      }
    });

    render(
      <FavoritesProvider>
        <Gallery />
      </FavoritesProvider>
    );
  };

  test('renders photos correctly', () => {
    renderGallery({
      photos: [mockPhoto],
      loading: false,
      hasMore: true,
      loadMore: vi.fn(),
      error: null,
    });

    expect(screen.getByAltText('Test image')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  test('shows loading spinner when loading', () => {
    renderGallery({
      photos: [],
      loading: true,
      hasMore: true,
      loadMore: vi.fn(),
      error: null,
    });

    const spinner = screen.getByRole('status');

    expect(spinner).toBeInTheDocument();
  });

  test('shows "No more photos available" when hasMore is false', () => {
    renderGallery({
      photos: [mockPhoto],
      loading: false,
      hasMore: false,
      loadMore: vi.fn(),
      error: null,
    });

    expect(screen.getByText(/No more photos available./i)).toBeInTheDocument();
  });

  test('shows error message when there is an error', () => {
    renderGallery({
      photos: [],
      loading: false,
      hasMore: true,
      loadMore: vi.fn(),
      error: 'Failed to load photos.',
    });

    expect(screen.getByText(/Failed to load photos./i)).toBeInTheDocument();
  });

  describe('Infinite Scroll Functionality', () => {
    test('calls loadMore when hasMore is true and not loading', () => {
      const loadMoreMock = vi.fn();

      renderGallery({
        photos: [mockPhoto],
        loading: false,
        hasMore: true,
        loadMore: loadMoreMock,
        error: null,
      });

      expect(loadMoreMock).toHaveBeenCalledTimes(1);
    });

    test('does not call loadMore when hasMore is false', () => {
      const loadMoreMock = vi.fn();

      renderGallery({
        photos: [mockPhoto],
        loading: false,
        hasMore: false,
        loadMore: loadMoreMock,
        error: null,
      });

      expect(loadMoreMock).not.toHaveBeenCalled();
    });

    test('does not call loadMore when loading is true', () => {
      const loadMoreMock = vi.fn();

      renderGallery({
        photos: [mockPhoto],
        loading: true,
        hasMore: true,
        loadMore: loadMoreMock,
        error: null,
      });

      expect(loadMoreMock).not.toHaveBeenCalled();
    });
  });
});
