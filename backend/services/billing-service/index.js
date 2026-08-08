import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import dns from "dns"
import { connectDb } from './configs/db.js'
import paymentRouter from './routes/billing.route.js'


dns.setServers([
      '1.1.1.1',
      '8.8.8.8'
])
const app = express()
app.use(express.json());



const PORT = process.env.PORT || 6005

app.get("/", (req,res)=>{
    return res.send(`hello from Billing-server `)


})
app.use("/",paymentRouter)




app.listen(PORT,()=>{
    console.log(`Billing Service Started on ${PORT}`)
    connectDb()
   
})

