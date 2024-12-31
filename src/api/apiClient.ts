export async function apiClient<T = any>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = (await response.json()) as T;

    return data;
  } catch (error) {
    console.error("API Client Error:", error);

    throw error;
  }
}
