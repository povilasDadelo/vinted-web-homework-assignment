import { PexelsPhoto } from "./pexelsTypes";

export type UseInfiniteScrollProps = {
  sentinelRef: React.RefObject<HTMLElement>;
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
}

export type UsePhotoGalleryResult = {
  photos: PexelsPhoto[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  error: string | null;
}
