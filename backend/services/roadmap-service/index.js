import express from 'express'
import dotenv from "dotenv"
dotenv.config()
import dns from "dns"
import { connectDb } from './configs/db.js'
import roadmapRouter from './routes/roadmap.route.js'

dns.setServers([
      '1.1.1.1',
      '8.8.8.8'
])
const app = express()
app.use(express.json());

const PORT = process.env.PORT || 6004



app.use("/",roadmapRouter)


app.listen(PORT,()=>{
    console.log(`Roadmap Service Started on ${PORT}`)
   connectDb()
})

