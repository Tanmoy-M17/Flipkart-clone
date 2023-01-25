require("dotenv").config()
const express=require("express");
const cors=require("cors")
const { connection }=require("../Config/db");
const { productsRouter }=require("../Routes/products.routes");
const { userrouter }=require("../Routes/user.routes")
const app=express();

//middlewares
app.use(cors())
app.use(express.json())
app.use("/products",productsRouter);
app.use("/user",userrouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("Server is Connected");
        
    }catch(err){
        console.log(`Err:${err}`);
    }
    console.log(`Server is Running in port ${process.env.PORT}`);
})