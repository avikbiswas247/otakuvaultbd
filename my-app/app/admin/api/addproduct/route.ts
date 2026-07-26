import {NextRequest,NextResponse} from "next/server";
import { getProducts } from "@/lib/repositories/product.repository";
import { uploadMultipleImages } from "../../services/uploadtocloudinary";
import { createProductImages } from "../../repositories/productimage.repository";
import {createProduct} from "../../repositories/product.repository"
import type {
    getproduct
} from "@/types/product";
export async function POST(request: NextRequest) {
    
        const formdata=await request.formData();
        const name=formdata.get("name") as string;
        const price=Number(formdata.get("price"));
        const description=formdata.get("description") as string;
        const series=formdata.get('series') as string;
        const rating=Number(formdata.get("rating")) ; 
        const stock=Number(formdata.get("stock"));
        const discount=Number(formdata.get("discount"));
        const size=formdata.get("size") as string;
        const type=formdata.get("type") as string;
        const arrival=formdata.get("arrival") as string;
        const createdproduct=await createProduct(name,description,price,stock,discount,size,series,arrival,rating,type)
        const productID=createdproduct.id;
        const images=formdata.getAll("images") as File[]
        const imagesresponse=await uploadMultipleImages(images);
        const savedimage=await createProductImages(productID,imagesresponse)
            
return NextResponse.json(
{
product:createdproduct,
images:savedimage

}





)
        

}