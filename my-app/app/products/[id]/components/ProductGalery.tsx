"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductImage } from "@/app/products/types/product";

interface Props {
    images: ProductImage[];
}

export default function ProductGallery({
    images,
}: Props) {

    const [selected, setSelected] = useState(0);

    return (

        <div>

            <div className="relative h-[500px] border rounded-xl overflow-hidden top-[0vh]">

                <Image
                    src={images[selected].image_url}
                    alt=""
                    fill
                    className="object-contain"
                />

            </div>

            <div className="grid grid-cols-4 gap-4 mt-5">

                {images.map((img, index) => (

                    <button
                        key={img.id}
                        onClick={() => setSelected(index)}
                        className={`
                            relative
                            top-[5vh]
                            h-24
                            border
                            rounded-lg
                            overflow-hidden
                            ${
                                selected === index
                                    ? "border-black"
                                    : "border-gray-300"
                            }
                        `}
                    >

                        <Image
                            src={img.image_url}
                            alt=""
                            fill
                            className="object-cover"
                        />

                    </button>

                ))}

            </div>

        </div>

    );
}