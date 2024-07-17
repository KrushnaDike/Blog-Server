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
import sliderRoutes from "./routes/sliderRoutes.js";
import popupRoutes from "./routes/popupRoutes.js";
import adsRoutes from "./routes/adsRoutes.js";

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
app.use("/api/v1/slider", sliderRoutes);
app.use("/api/v1/popup", popupRoutes);
app.use("/api/v1/ad", adsRoutes);

export default app;

// CUSTOM ERROR HANDLER
app.use(ErrorMiddleware);
