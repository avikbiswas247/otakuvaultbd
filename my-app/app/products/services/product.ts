import { BackendResponse, ProductWithImages } from "../types/product";

const API_URL = "/api/product";
// change to your backend url

export async function getProducts(): Promise<ProductWithImages[]> {
  const res = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: BackendResponse = await res.json();

  const merged = data.products.map((product) => ({
    ...product,
    images: data.images.filter(
      (img) => img.product_id === product.id
    ),
  }));

  return merged;
}