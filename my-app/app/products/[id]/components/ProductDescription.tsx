type Props={

description:string;

}


export default function ProductDescription({

description

}:Props){

return(


<div
className="
mt-20
"
>

<h1
className="
text-3xl
font-bold
"
>

Description

</h1>


<p
className="
mt-5
"
>

{description}

</p>


</div>


);


}