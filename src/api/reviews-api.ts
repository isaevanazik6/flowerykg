import type { Review } from "@/types/Review";
import {httpGet} from "@/api/https.ts";

const URL = "/api/reviews.json";

export async function fetchReviews(): Promise<Review[]> {
  return httpGet<Review[]>(URL);
}
