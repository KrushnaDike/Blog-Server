import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import ErrorMiddleware from "./middlewares/Error.js";

import { config } from "dotenv";
config({
  path: "./config/config.env",
});

// importing routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import pagesRoutes from "./routes/pagesRoutes.js";
import quicklinksRoutes from "./routes/quicklinksRoutes.js";

const app = express();

// using middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is working...");
});

// using routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/page", pagesRoutes);
app.use("/api/v1/quicklink", quicklinksRoutes);

export default app;

// CUSTOM ERROR HANDLER
app.use(ErrorMiddleware);
