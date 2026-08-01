type Props={

description:string;

}


export default function ProductDescription({

description

}:Props){

return(


<div
className="
"
>



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