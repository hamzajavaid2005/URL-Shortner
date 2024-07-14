import express from "express";
import path from "path";
import dotenv from "dotenv";
import urlRoutes from "./routes/url_route.js";
import connectDB from "./db/connect.js";
import staticRoute from "./routes/static_route.js";

dotenv.config();

const PORT = 8000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoutes);
app.use("/", staticRoute);

connectDB()
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   })
   .catch((e) => console.log("Error while connecting MongoDB ::", e));
