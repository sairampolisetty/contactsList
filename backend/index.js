import express from "express"
import cors from "cors"
import * as dotenv from "dotenv"
import connectDB from "./mongodb/connect.js"
import contactRoutes from "./routes/contactRoutes.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use('/contacts',contactRoutes)
dotenv.config()

app.get("/", (req,res) => {
    res.send("Hello world...")
})

const startServer=async()=>{
    try{
        connectDB(process.env.MONGODB_URL)
        app.listen(8080,()=>{
            console.log("server is running on port 8080")
        })
    }catch(err){
        console.log(err)
    }
}
startServer()