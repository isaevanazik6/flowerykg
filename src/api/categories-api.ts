import type { Category } from "@/types/Category";
import {httpGet} from "@/api/https.ts";

const URL = "/api/categories.json";

export async function fetchCategories(): Promise<Category[]> {
  return httpGet<Category[]>(URL);
}
