"use client";

import Image from "next/image";

import { useState } from "react";


type Props={

images:string[];

}


export default function ProductImages({

images

}:Props){


const [selectedImage,
setSelectedImage]=useState(

images[0]

);



return(


<div>


<Image

src={selectedImage}

alt="Product"

width={600}

height={600}

className="
rounded-xl
w-full
"
/>



<div
className="
mt-5

grid
grid-cols-4
gap-3
"
>


{

images.map((image,index)=>(


<Image

key={index}

src={image}

alt="Image"

width={150}

height={150}

className="
cursor-pointer

rounded-xl
"

onClick={()=>{

setSelectedImage(

image

)

}}

/>


))


}


</div>



</div>


);


}