export interface Product {
  id: number;
  name: string;
  description: string;
  series: string;
  size: string;
  type: string;
  arrival: string | null;
  price: string;
  rating: string;
  discount: string;
  created_at: string;
  stock: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  public_id: string;
  is_primary: boolean;
}

export interface BackendResponse {
  products: Product[];
  images: ProductImage[];
}

export interface ProductWithImages extends Product {
  images: ProductImage[];
}
export interface CartItem extends ProductWithImages {
  quantity: number;
}