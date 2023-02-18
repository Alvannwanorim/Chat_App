import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import mongoose from "mongoose"
 dotenv.config()

 import userRoute from './routes/userRoute.js'


 //Middleware
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api/users", userRoute)

app.get("",(req, res)=>{
    // console.log(req);
})



const PORT = process.env.port || 4000
app.listen(PORT, ()=> console.log(`App is listening ont port: ${PORT}`))

mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("Database connection established")).catch((error)=> console.log("Database connection error", error.message))