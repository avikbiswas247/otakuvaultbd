import {
  CheckoutRequest,
  CheckoutResponse,
} from "../type/checkout";

export async function checkout(
  data: CheckoutRequest
): Promise<CheckoutResponse> {
  const response = await fetch("/api/checkout", {
    method: "POST",

    credentials: "include",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Checkout failed"
    );
  }

  return result;
}