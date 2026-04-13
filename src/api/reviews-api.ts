import type { Review } from "@/types/Review";
import { httpGet } from "@/api/https.ts";

const URL = "/api/reviews";

export async function fetchReviews(): Promise<Review[]> {
  return httpGet<Review[]>(URL);
}
