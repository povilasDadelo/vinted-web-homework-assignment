import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { usePhotoGallery } from './usePhotoGallery';
import { fetchPhotos } from '../api/pexelsAPI';
import { generateMockPhotos, mockFetchPhotosSuccess, mockRejectedFetchPhotos } from '../__mocks__/pexelsAPI';

vi.mock('../api/pexelsAPI', () => ({
  fetchPhotos: vi.fn(),
}));

describe('usePhotoGallery', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const setup = () => renderHook(() => usePhotoGallery());

  it('initially fetches photos and updates state correctly', async () => {
    mockFetchPhotosSuccess(2);

    const { result } = setup();

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.photos).toEqual(generateMockPhotos(15, 1));
      expect(result.current.photos).toHaveLength(15);
      expect(result.current.loading).toBe(false);
      expect(result.current.hasMore).toBe(true);
    });

    expect(fetchPhotos).toHaveBeenCalledWith('nature', 1, 15);
  });

  it('handles API errors gracefully', async () => {
    mockRejectedFetchPhotos();

    const { result } = setup();

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to load photos. Please try again.');
      expect(result.current.loading).toBe(false);
      expect(result.current.photos).toEqual([]);
      expect(result.current.hasMore).toBe(true);
    });

    expect(fetchPhotos).toHaveBeenCalledWith('nature', 1, 15);
  });

  it('loads more photos when loadMore is triggered', async () => {
    mockFetchPhotosSuccess(2);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.photos).toEqual(generateMockPhotos(15, 1));
    });

    act(() => {
      result.current.loadMore();
    });

    await waitFor(() => {
      expect(result.current.photos).toEqual([
        ...generateMockPhotos(15, 1),
        ...generateMockPhotos(15, 16),
      ]);
      expect(result.current.photos).toHaveLength(30);
      expect(result.current.hasMore).toBe(false);
    });

    expect(fetchPhotos).toHaveBeenCalledTimes(2);
    expect(fetchPhotos).toHaveBeenCalledWith('nature', 1, 15);
    expect(fetchPhotos).toHaveBeenCalledWith('nature', 2, 15);
  });

  it('does not fetch photos when hasMore is false', async () => {
    mockFetchPhotosSuccess(1);

    const { result } = setup();

    await waitFor(() => {
      expect(result.current.photos).toEqual(generateMockPhotos(15, 1));
      expect(result.current.hasMore).toBe(false);
    });

    act(() => {
      result.current.loadMore();
    });

    expect(fetchPhotos).toHaveBeenCalledTimes(1);
  });
});
