export interface CreateOrderItemRequest {
  bouquetId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  customerName: string;
  customerPhone: string;
  mainPhone: string;
  deliveryDateTime: string;
  deliveryAddress: string;
  comment: string | null;
  items: CreateOrderItemRequest[];
}

export interface OrderItemResponse {
  id: number;
  bouquetId: number;
  bouquetName: string;
  price: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  customerName: string;
  customerPhone: string;
  mainPhone: string;
  deliveryDateTime: string;
  deliveryAddress: string;
  comment: string | null;
  status: "NEW" | "CONFIRMED" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
  createdAt: string;
  items: OrderItemResponse[];
}
