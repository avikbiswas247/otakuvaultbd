type Review={

username:string;

comment:string;

rating:number;

}


type Props={

reviews:Review[];

}


export default function ProductReview({

reviews

}:Props){

return(

<div>

{

reviews.map((review)=>(

<div
key={review.username}
>

<h2>

{review.username}

</h2>


<p>

{review.comment}

</p>

</div>


))

}


</div>


);


}