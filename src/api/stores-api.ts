import type { Store } from "@/types/Store";
import { httpGet } from "@/api/https.ts";

const URL = "/api/stores";

export async function fetchStores(): Promise<Store[]> {
  return httpGet<Store[]>(URL);
}
