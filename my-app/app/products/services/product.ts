import { getBaseUrl } from "@/lib/utils/getBaseURL";
import {
  BackendResponse,
  ProductWithImages,
} from "../types/product";

const PRODUCTS_API = "/api/product";

export async function getProducts(): Promise<ProductWithImages[]> {
  const res = await fetch(`${getBaseUrl()}${PRODUCTS_API}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: BackendResponse = await res.json();

  return data.products.map((product) => ({
    ...product,
    images: data.images.filter(
      (img) => img.product_id === product.id
    ),
  }));
}

export async function getProductById(
  id: number
): Promise<ProductWithImages | null> {
  const res = await fetch(`${getBaseUrl()}/api/product/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return await res.json();
}