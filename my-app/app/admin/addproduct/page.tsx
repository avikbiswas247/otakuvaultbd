"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


const productSchema = z.object({

    name:z.string().min(3),

    description:z.string().min(10),

    price:z.number().positive(),

    stock:z.number().nonnegative(),

    discount:z.number().nonnegative(),

    size:z.string().min(1),

    series:z.string().min(1),

    arival:z.string().min(1),

    rating:z.number().min(0).max(5),

    type:z.string().min(1),

    images:z
    .array(z.instanceof(File))
    .min(1),

});


type ProductFormData=
z.infer<typeof productSchema>;



export default function ProductForm(){


    const{

        register,

        handleSubmit,

        setValue,

        watch,

        formState:{errors}

    }=useForm<ProductFormData>({

        resolver:
        zodResolver(productSchema),

        defaultValues:{

            name:"",

            description:"",

            price:0,

            stock:0,

            discount:0,

            size:"",

            series:"",

            arival:"",

            rating:0,

            type:"",

            images:[],

        }

    });



    async function onSubmit(
        values:ProductFormData
    ){

        const formData=
        new FormData();


        formData.append(
            "name",
            values.name
        );


        formData.append(
            "description",
            values.description
        );


        formData.append(
            "price",
            String(values.price)
        );


        formData.append(
            "stock",
            String(values.stock)
        );


        formData.append(
            "discount",
            String(values.discount)
        );


        formData.append(
            "size",
            values.size
        );


        formData.append(
            "series",
            values.series
        );


        formData.append(
            "arival",
            values.arival
        );


        formData.append(
            "rating",
            String(values.rating)
        );


        formData.append(
            "type",
            values.type
        );


        values.images.forEach((image)=>{

            formData.append(
                "images",
                image
            );

        });


        await fetch(
            "/admin/api/addproduct",
            {
                method:"POST",
                body:formData,
            }
        );


    }



    return(

        <form

        onSubmit={
            handleSubmit(onSubmit)
        }

        className="
        space-y-6
        max-w-3xl
        mx-auto
        relative
        top-[20vh]
        "

        >


            {/* NAME */}

            <div>

                <Label>
                    Product Name
                </Label>

                <Input
                {...register("name")}
                />

                <p>{errors.name?.message}</p>

            </div>



            {/* DESCRIPTION */}

            <div>

                <Label>
                    Description
                </Label>

                <Textarea
                {...register("description")}
                />

                <p>
                    {
                        errors.description
                        ?.message
                    }
                </p>

            </div>



            {/* PRICE */}

            <div>

                <Label>
                    Price
                </Label>

                <Input
                type="number"
                {...register(
                    "price",
                    {
                        valueAsNumber:true
                    }
                )}
                />

            </div>



            {/* STOCK */}

            <div>

                <Label>
                    Stock
                </Label>

                <Input
                type="number"
                {...register(
                    "stock",
                    {
                        valueAsNumber:true
                    }
                )}
                />

            </div>



            {/* DISCOUNT */}

            <div>

                <Label>
                    Discount
                </Label>

                <Input
                type="number"
                {...register(
                    "discount",
                    {
                        valueAsNumber:true
                    }
                )}
                />

            </div>



            {/* SIZE */}

            <div>

                <Label>
                    Size
                </Label>

                <Input
                {...register("size")}
                />

            </div>



            {/* SERIES */}

            <div>

                <Label>
                    Series
                </Label>

                <Input
                {...register("series")}
                />

            </div>



            {/* ARRIVAL */}

            <div>

                <Label>
                    Arrival
                </Label>

                <Input
                {...register("arival")}
                />

            </div>



            {/* RATING */}

            <div>

                <Label>
                    Rating
                </Label>

                <Input
                type="number"
                step="0.1"
                {...register(
                    "rating",
                    {
                        valueAsNumber:true
                    }
                )}
                />

            </div>



            {/* TYPE */}

            <div>

                <Label>
                    Type
                </Label>

                <Input
                {...register("type")}
                />

            </div>



            {/* IMAGES */}

            <div>

                <Label>
                    Product Images
                </Label>

                <Input

                type="file"

                multiple

                accept="image/*"

                onChange={(e)=>{

                    const files=
                    Array.from(
                        e.target.files || []
                    );


                    setValue(
                        "images",
                        files
                    );

                }}

                />

                <p>

                    Selected :

                    {" "}

                    {
                        watch("images")
                        ?.length
                    }

                    {" "}images

                </p>

            </div>



            <Button
            type="submit"
            >

                Add Product

            </Button>


        </form>

    );


}