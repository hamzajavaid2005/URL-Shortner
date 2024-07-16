import shortId from "shortid";
import URL from "../models/url_schema.js";

async function handleCreateNewUrl(req, res) {
   const body = req.body;
   if (!body.url) {
      return res.status(400).json({
         message: "URL is required",
      });
   }

   const shortID = shortId.generate();
   await URL.create({
      shortId: shortID,
      redirectUrl: body.url,
      visitHistory: [],
      createdBy: req.user._id,
   });

   return res.render("home", {
      id: shortID,
   });
}

async function handleRedirectUrl(req, res) {
   try {
      const { shortId } = req.params;
      console.log(shortId);
      const entry = await URL.findOneAndUpdate(
         { shortId },
         {
            $push: {
               visitHistory: { timestamp: Date.now() },
            },
         }
      );

      if (!entry) {
         res.status(404).json({
            message: "URL not found",
         });
      }

      console.log(entry);

      res.redirect(entry.redirectUrl);
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
}

async function handleAnalytics(req, res) {
   const shortId = req.params.shortId;
   const result = await URL.findOne({ shortId });
   return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
   });
}

export { handleCreateNewUrl, handleRedirectUrl, handleAnalytics };
