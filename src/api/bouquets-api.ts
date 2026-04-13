import type { Bouquet } from "@/types/Bouquet";
import { httpGet } from "@/api/https.ts";

const URL = "/api/bouquets";

export async function fetchBouquets(): Promise<Bouquet[]> {
  return httpGet<Bouquet[]>(URL);
}

export async function fetchBouquetById(id: number): Promise<Bouquet> {
  return httpGet<Bouquet>(`${URL}/${id}`);
}
