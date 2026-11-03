import { API_BASE_URL } from "./config.ts";
export const getCatalog = async <T>(endpoint: string, params: URLSearchParams, signal?: AbortSignal): Promise<T[]> => {
  const items: T[] = [];
  for (let page = 1; ; page++) {
    signal?.throwIfAborted();
    params.set("page", String(page));
    params.set("limit", "100");
    const response = await fetch(API_BASE_URL + "/" + endpoint + "?" + params, { signal });
    if (!response.ok) throw new Error("Не удалось загрузить справочник");
    const result = await response.json() as { data: T[]; total: number };
    if (!Array.isArray(result.data) || !Number.isSafeInteger(result.total) || result.total < 0)
      throw new Error("Некорректный ответ справочника");
    if (!result.data.length && items.length < result.total) throw new Error("Справочник загружен не полностью");
    items.push(...result.data);
    if (items.length >= result.total) return items;
  }
};
