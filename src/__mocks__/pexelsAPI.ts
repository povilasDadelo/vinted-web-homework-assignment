import { MockedFunction } from 'vitest';
import { PexelsPhoto, PexelsResponse } from '../../src/types/pexelsTypes';
import { mockPhoto } from './mockPhoto';
import { fetchPhotos } from '../api/pexelsAPI';

export const generateMockPhotos = (count: number, startId: number = 1): PexelsPhoto[] => {
  return Array.from({ length: count }, (_, index) => ({
    ...mockPhoto,
    id: startId + index,
    alt: `Test Image ${startId + index}`,
    url: `http://example.com/photo${startId + index}`,
    photographer: `Photographer ${startId + index}`,
  }));
};

export const mockFetchPhotosSuccess = (totalPages: number = 2) => {
  const mockedFetchPhotos = fetchPhotos as MockedFunction<typeof fetchPhotos>;

  mockedFetchPhotos.mockImplementation((_query?: string, page?: number, perPage?: number): Promise<PexelsResponse> => {
    const actualPerPage = perPage ?? 15;
    const currentPage = page ?? 1;
    const hasNextPage = currentPage < totalPages;

    const mockPhotos = generateMockPhotos(actualPerPage, (currentPage - 1) * actualPerPage + 1);

    return Promise.resolve({
      photos: mockPhotos,
      next_page: hasNextPage ? 'next_page_url' : undefined,
      total_results: totalPages * actualPerPage,
      page: currentPage,
      per_page: actualPerPage,
    });
  });
};

export const mockRejectedFetchPhotos = () => {
  const mockedFetchPhotos = fetchPhotos as MockedFunction<typeof fetchPhotos>;

  mockedFetchPhotos.mockRejectedValue(new Error('API Error'));
}
