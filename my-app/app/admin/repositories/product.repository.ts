import {db} from "@/lib/db/dbconnect"
import {getproduct} from "@/types/product"

export async function createProduct(name:string,description:string,price:number,stock:number,discount:number,size:string,series:string,arival:string,rating:number,type:string):Promise<getproduct>{
 const product=await db.query(
`
        INSERT INTO  Products(name, description, price,stock,discount,size,series,ARRIVAL,rating,type)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
        `,
        [name, description, price, stock,discount,size,series,arival,rating,type]
    




    )   
return product.rows[0]
}