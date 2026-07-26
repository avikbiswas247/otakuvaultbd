import { getProducts } from "@/app/products/services/product";
import ProductGallery from "./components/ProductGalery";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default async function ProductDetails({
    params,
}: Props) {

    const { id } = await params;

    const products = await getProducts();

    const product = products.find(
        p => p.id === Number(id)
    );

    if (!product) {
        notFound();
    }

    const discounted =
        Number(product.price) *
        (1 - Number(product.discount) / 100);

    return (

        <div className="max-w-7xl mx-auto px-6 py-10 relative top-[10vh]">

            <div className="grid lg:grid-cols-2 gap-12 relative ">

                <ProductGallery
                    images={product.images}
                />

                <div>

                    <h1 className="text-4xl font-bold">
                        {product.name}
                    </h1>

                    <div className="mt-4 flex items-center gap-4">

                        <span className="text-3xl font-bold text-red-600">
                            ${discounted.toFixed(2)}
                        </span>

                        <span className="line-through text-gray-400">
                            ${product.price}
                        </span>

                    </div>

                    <div className="mt-6">

                        ⭐ {product.rating}

                    </div>

                    <div className="mt-6 space-y-2">

                        <p>
                            <b>Series:</b> {product.series}
                        </p>

                        <p>
                            <b>Type:</b> {product.type}
                        </p>

                        <p>
                            <b>Size:</b> {product.size}
                        </p>

                        <p>
                            <b>Stock:</b> {product.stock}
                        </p>

                    </div>

                    <p className="mt-8 leading-8 text-gray-700">
                        {product.description}
                    </p>

                    <div className="mt-10 flex gap-4">

                        <button className="bg-black text-white px-8 py-3 rounded-lg">
                            Add To Cart
                        </button>

                        <button className="border px-8 py-3 rounded-lg">
                            ❤ Wishlist
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}