import { PexelsResponse } from "../types/pexelsTypes";
import { apiClient } from "./apiClient";
import { PEXELS_API_BASE_URL, PEXELS_API_KEY } from "./config";

export async function fetchPhotos(
  query: string = 'people',
  page: number = 1,
  perPage: number = 15
) {
  const url = `${PEXELS_API_BASE_URL}/search?query=${encodeURIComponent(
    query
  )}&page=${page}&per_page=${perPage}`;

  const headers = {
    Authorization: PEXELS_API_KEY,
  };

  return apiClient<PexelsResponse>(url, { headers });
}
