import mongoose from "mongoose";

export const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "BlogProject" })
    .then(() => {
      console.log("MongoDB Connected!");
    })
    .catch((err) => {
      console.log(err);
    });
};
