import { useRef } from 'react';
import { Image } from './Image';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import './Gallery.css';

export const Gallery = () => {
  const { photos, loading, hasMore, loadMore, error } = usePhotoGallery();
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    sentinelRef,
    loading,
    hasMore,
    loadMore,
  });

  return (
    <div className="gallery-container">
      <div className="photos-container">
        {photos.map((photo) => (
          <Image key={photo.id} {...photo} />
        ))}
      </div>
      {loading && <div className="spinner" aria-live="polite" role="status" aria-label="Loading" />}
      {!hasMore && <p>No more photos available.</p>}
      {error && <p className="error-message">{error}</p>}

      <div ref={sentinelRef} className="sentinel" />
    </div>
  );
};
