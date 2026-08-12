import express from "express";
import ActivityEvent from "../models/activityEvent.model.js";
import ClimateUpdate from "../models/climateUpdate.model.js";
import { asyncHandler } from "../middleware/errors.js";
import { requireParticipant } from "../utils/participant.js";

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const updates = await ClimateUpdate.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .select("slug category title summary sourceName sourceUrl sourcePublishedAt readTimeMinutes publishedAt")
      .lean();
    res.json({ success: true, data: updates });
  }),
);

router.get(
  "/:slug",
  requireParticipant,
  asyncHandler(async (req, res) => {
    const update = await ClimateUpdate.findOne({ slug: req.params.slug, status: "published" }).lean();
    if (!update) return res.status(404).json({ success: false, message: "Climate update not found" });

    if (req.get("X-Analytics-Consent") === "true") {
      await ActivityEvent.create({ participantId: req.participantId, type: "update_view", entityType: "update", entityId: update._id });
    }
    return res.json({ success: true, data: update });
  }),
);

export default router;
