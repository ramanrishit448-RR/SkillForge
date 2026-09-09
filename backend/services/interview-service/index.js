import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env") })
dotenv.config()

import express from 'express'
import dns from "dns"
import { connectDb } from './configs/db.js'

import interviewRouter from './routes/interview.route.js'
dns.setServers([
      '1.1.1.1',
      '8.8.8.8'
])
const app = express()
app.use(express.json());



const PORT = process.env.INTERVIEW_PORT || 8002;

app.get("/", (req,res)=>{
    return res.send(`hello from interview-server `)


})
app.use("/",interviewRouter)




app.listen(PORT,()=>{
    console.log(`Interview Service Started on ${PORT}`)
    connectDb()
   
})

