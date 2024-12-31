import { useState, useEffect, useRef } from 'react';
import { fetchPhotos } from '../api/pexelsAPI';
import { PexelsPhoto } from '../types/pexelsTypes';
import { UsePhotoGalleryResult } from '../types/hooks';

export const usePhotoGallery = (): UsePhotoGalleryResult => {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const effectRan = useRef(false);

  useEffect(() => {
    if (!hasMore) return;

    // Prevent double-fetch in React 18 Strict Mode for the initial page load
    if (page === 1) {
      if (effectRan.current) return;

      effectRan.current = true;
    }

    const loadPhotos = async () => {
      setLoading(true);

      try {
        const data = await fetchPhotos('nature', page, 15);

        setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);

        if (!data.next_page) {
          setHasMore(false);
        }
      } catch (error) {
        setError('Failed to load photos. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, [page, hasMore]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { photos, loading, hasMore, loadMore, error };
};
