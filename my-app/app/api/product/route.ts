import {NextResponse} from "next/server";
import {db} from "@/lib/db/dbconnect";
import {getProducts} from "@/lib/repositories/product.repository";
import type {getproduct} from "@/types/product";
import { getProductsImage } from "@/lib/repositories/getproductimage.repository";
export async function GET(request: Request) {

    try {   

        const products: getproduct[] = await getProducts();
        const images=await getProductsImage()
        return NextResponse.json(
            {
                products:products,
                images:images
            },
            { status: 200 }
        );







    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch products" },
            { status: 500 }
        );
    }


}





