import { httpPost } from "@/api/https";
import type { CreateOrderRequest, OrderResponse } from "@/types/Order";

export function createOrder(request: CreateOrderRequest): Promise<OrderResponse> {
  return httpPost<OrderResponse, CreateOrderRequest>("/api/orders", request);
}
