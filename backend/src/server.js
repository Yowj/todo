import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./lib/db.js";
import userRoutes from "./routes/user.route.js";
import todoRoutes from "./routes/todo.route.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port  http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
