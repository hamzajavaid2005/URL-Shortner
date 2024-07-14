import express from "express";
import { handleCreateNewUrl, handleRedirectUrl, handleAnalytics } from "../controllers/url_controller.js";

const router = express.Router();

router.post("/", handleCreateNewUrl);

router.get("/:shortId", handleRedirectUrl);

router.get("/analytics/:shortId", handleAnalytics);

export default router;
