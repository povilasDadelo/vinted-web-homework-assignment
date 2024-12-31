import { PexelsPhoto } from "../types/pexelsTypes";

export const mockPhoto: PexelsPhoto = {
  id: 1,
  src: {
    original: 'original.jpg',
    large2x: 'large2x.jpg',
    large: 'large.jpg',
    medium: 'medium.jpg',
    small: 'small.jpg',
    portrait: 'portrait.jpg',
    landscape: 'landscape.jpg',
    tiny: 'tiny.jpg',
  },
  alt: 'Test image',
  photographer: 'John Doe',
  photographer_url: 'http://example.com',
  photographer_id: 123,
  avg_color: '#000000',
  width: 1920,
  height: 1080,
  liked: false,
  url: 'http://example.com/photo',
};
