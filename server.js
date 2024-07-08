import app from "./app.js";
import cloudinary from "cloudinary";

// Database Connection
import { ConnectDB } from "./config/database.js";
ConnectDB();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
