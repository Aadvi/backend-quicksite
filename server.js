import express from "express";
import dotenv from "dotenv";
import pageRoutes from "./routes/pageRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api", pageRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
