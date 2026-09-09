import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(import.meta.dirname, "../../.env") })
dotenv.config()

import express from 'express'
import dns from "dns"
import { connectDb } from './configs/db.js'
import roadmapRouter from './routes/roadmap.route.js'

dns.setServers([
      '1.1.1.1',
      '8.8.8.8'
])
const app = express()
app.use(express.json());

const PORT = process.env.ROADMAP_PORT || 8004;



app.use("/",roadmapRouter)


app.listen(PORT,()=>{
    console.log(`Roadmap Service Started on ${PORT}`)
   connectDb()
})

