import fs from "fs";
import { generate } from "../generate.js";

const master = fs.readFileSync("./context/MASTER_CONTEXT.md", "utf-8");
const task = fs.readFileSync("./context/CURRENT_TASK.md", "utf-8");
const navbar = fs.readFileSync("../src/components/Navbar.jsx", "utf-8");

const prompt = `
You are a senior React engineer.

${master}

${task}

FILE:
${navbar}

OUTPUT:
- return full updated file
- no explanation
`;

const run = async () => {
  const result = await generate(prompt);

  fs.writeFileSync("../src/components/Navbar.jsx", result);
  console.log("✅ Navbar updated");
};

run();