import { ChatGPTAPI } from "chatgpt";
import dotenv from "dotenv";
dotenv.config();

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_KEY || "",
});

export default api