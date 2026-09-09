import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env") })
dotenv.config()

import express from 'express'
import dns from "dns"
import { connectDb } from './configs/db.js'
import resumeRouter from './routes/resume.route.js'
dns.setServers([
      '1.1.1.1',
      '8.8.8.8'
])
const app = express()
app.use(express.json());




const PORT = process.env.RESUME_PORT || 8003;

app.get("/", (req,res)=>{
    return res.send(`hello from resume-server `)

})
app.use("/",resumeRouter)

app.listen(PORT,()=>{
    console.log(`Resume Service Started on ${PORT}`)
    connectDb()
   
})

