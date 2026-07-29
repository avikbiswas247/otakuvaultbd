// app/checkout/type/checkout.ts
export interface ShippingAddress {
  full_name: string;
  phone: string;
  email?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
}

export interface CheckoutRequest {
  paymentMethod: "COD" | "CARD" | "BKASH" | "NAGAD" | "ROCKET";
  shipping: ShippingAddress;
}

export interface CheckoutResponse {
  success: boolean;
  message: string;
  total: number;
  order: any;
  payment: any;
  shipping: any;
}