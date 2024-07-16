import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import cookieParser from "cookie-parser";

import urlRoutes from "./routes/url_route.js";
import staticRoute from "./routes/static_route.js";
import userRoute from "./routes/user_route.js";

import { restrictToLoggedInUserOnly, checkAuth } from "./middlewares/auth_middleware.js";

dotenv.config();

const PORT = 8000;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoutes);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

connectDB()
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Server is running on port ${PORT}`);
      });
   })
   .catch((e) => console.log("Error while connecting MongoDB ::", e));
