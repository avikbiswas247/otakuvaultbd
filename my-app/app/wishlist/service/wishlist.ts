export async function addToWishlist(productId: number) {
  const res = await fetch("/api/wishlist", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
export async function getWishlist() {
  const res = await fetch("/api/wishlist", {
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return res.json();
}