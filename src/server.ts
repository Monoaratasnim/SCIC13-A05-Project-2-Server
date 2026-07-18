import dotenv from "dotenv";

// Load environment variables FIRST
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
  console.log("Groq Key Loaded:", !!process.env.GROQ_API_KEY);
};

startServer();