import { useCallback, memo } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { PexelsPhoto } from "../types/pexelsTypes";
import "./Image.css";

export const Image = memo(({ id, src, alt, photographer }: PexelsPhoto) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(id);
  }, [toggleFavorite, id]);

  const isFavoritePhoto = isFavorite(id);

  const srcSet = [
    `${src.medium} 350w`,
    `${src.large} 940w`,
    `${src.large2x} 1800w`
  ].join(", ")

  const sizes = [
    "(max-width: 768px) 100vw",
    "(max-width: 1024px) calc(50vw - 2rem)",
    "calc(34vw - 2rem)"
  ].join(", ")

  return (
    <div className="photo-item">
      {isFavoritePhoto && <div className="favorite">❤️</div>}
      <img
        alt={alt}
        src={src.small}
        loading="lazy"
        srcSet={srcSet}
        sizes={sizes}
      />
      <div className="overlay">
        <div className="overlay-content">
          {/* To handle long texts I would prefer to use a tooltip.
          But due to time constraints, I use CSS ellipsis & title attribute. */}
          <div className="title" title={alt} aria-label='photo-title' tabIndex={0}>{alt}</div>
          <div className="splitter"></div>
          <div className="subtitle" title={photographer} aria-label={photographer}>{photographer}</div>
          <button
            className="favorite-button"
            onClick={handleToggleFavorite}
            aria-pressed={isFavoritePhoto}
            aria-label={isFavoritePhoto ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavoritePhoto ? "Unfavorite" : "Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
});