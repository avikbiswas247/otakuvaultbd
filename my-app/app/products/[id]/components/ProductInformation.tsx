"use client";

import { Heart, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";



type Product={

id:number;

name:string;

price:number;

rating:number;

category:string;

stock:number;

}


type Props={

product:Product;

handleAddToCart:(
id:number
)=>void;


handleWishlist:(
id:number
)=>void;

}



export default function ProductInformation({

product,

handleAddToCart,

handleWishlist

}:Props){


return(

<div>


<h1
className="
text-4xl
font-bold
"
>

{product.name}

</h1>



<p
className="
mt-3
text-xl
"
>

★★★★★

{" "}

({product.rating})

</p>



<h2
className="
mt-5
text-4xl
font-bold
"
>

${product.price}

</h2>



<p
className="
mt-5
text-lg
"
>

{product.category}

</p>



<p
className="
mt-5
font-semibold
"
>

{

product.stock>0

?

"In Stock"

:

"Out Of Stock"

}

</p>




<Button

className="
mt-8
w-full
"

onClick={()=>{

handleAddToCart(

product.id

)

}}

>

<ShoppingCart
className="
mr-2
h-5
w-5
"
/>

Add To Cart

</Button>




<Button

variant="outline"

className="
mt-3
w-full
"

onClick={()=>{

handleWishlist(

product.id

)

}}

>


<Heart
className="
mr-2
h-5
w-5
"
/>

Wishlist


</Button>


</div>


);


}