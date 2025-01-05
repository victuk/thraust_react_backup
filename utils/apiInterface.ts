import { ProductWithQuantity } from "../store/cartStore";

export interface ApiResponseInterface {
  isLoading?: boolean;
  successful: boolean;
  data: any;
  error: any;
}

export interface AdvertsInterface {
  picture: string;
  _id: string;
  shopId?: string;
  writeup: string;
  title: string;
  advertType: string;
  url: string;
}

// export interface OrderInterface {
//   shopId: string;
//   products: Products[];
//   totalCost: number;
//   hungryFee: number;
//   country: string;
//   state: string;
//   city: string;
//   address: string;
// }


export type OrderStatusType = "pending" | "shipping-fee-updated" | "paid" | "payment-failed" | "cancelled" | "timed-out" | "completed";

export interface OrderInterface {
  _id?: string;
  shopId: any;
  products: ProductWithQuantity[];
  customerQrCode?: string;
  riderQrCode?: string;
  orderStatus?: OrderStatusType;
  shippingFee?: number;
  hungryFee: number;
  totalCost: number;
  state: string;
  country: string;
  city: string;
  address: string;
}