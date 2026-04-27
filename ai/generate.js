import { client, MODEL } from "./config.js";

export async function generate(prompt) {
  const res = await client.responses.create({
    model: MODEL,
    input: prompt,
  });

  return res.output[0].content[0].text;
}