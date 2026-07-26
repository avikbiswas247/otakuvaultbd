import {
  BackendResponse,
  ProductWithImages,
} from "../types/product";

/* ==============================
   GET ALL PRODUCTS
============================== */

const PRODUCTS_API = "/api/product";

export async function getProducts(): Promise<ProductWithImages[]> {
  const res = await fetch(PRODUCTS_API, {
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

/* ==============================
   GET SINGLE PRODUCT
============================== */

export async function getProductById(
  id: number
): Promise<ProductWithImages> {
  const res = await fetch(`/api/product/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return await res.json();
}