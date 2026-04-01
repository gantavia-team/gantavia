
import dotenv from "dotenv";
dotenv.config();

async function list() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.VITE_GEMINI_API_KEY}`);
    const data = await res.json();
    if (data.models) {
      console.log("SUPPORTED MODELS:");
      data.models.forEach(m => console.log(m.name, "-", m.supportedGenerationMethods.join(", ")));
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error("Networking Error:", error.message);
  }
}
list();
