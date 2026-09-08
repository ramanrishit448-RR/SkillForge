import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env") })
dotenv.config()

import express from 'express'
import dns from "dns"
import { connectDb } from './configs/db.js'
import paymentRouter from './routes/billing.route.js'


dns.setServers([
      '1.1.1.1',
      '8.8.8.8'
])
const app = express()
app.use(express.json());



const PORT = process.env.BILLING_PORT || process.env.PORT || 8005

app.get("/", (req,res)=>{
    return res.send(`hello from Billing-server `)


})
app.use("/",paymentRouter)




app.listen(PORT,()=>{
    console.log(`Billing Service Started on ${PORT}`)
    connectDb()
   
})

