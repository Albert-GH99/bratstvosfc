import OpenAI from "openai";
import "dotenv/config";

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const MODEL = "gpt-5.4"; // tukar ikut available