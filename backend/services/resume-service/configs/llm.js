import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(import.meta.dirname, "../../../.env") })
dotenv.config()
import { ChatGroq } from "@langchain/groq";

const llm = new ChatGroq({
    model: "openai/gpt-oss-120b",
      temperature: 0.2,
  maxTokens: 2500,
  maxRetries: 2,
})

export default llm
