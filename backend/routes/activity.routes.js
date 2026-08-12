import express from "express";
import ActivityEvent from "../models/activityEvent.model.js";
import { asyncHandler } from "../middleware/errors.js";
import { requireParticipant } from "../utils/participant.js";

const router = express.Router();

router.post(
  "/visit",
  requireParticipant,
  asyncHandler(async (req, res) => {
    if (req.get("X-Analytics-Consent") !== "true") {
      return res.status(403).json({ success: false, message: "Optional analytics consent is required" });
    }
    const event = await ActivityEvent.create({ participantId: req.participantId, type: "visit" });
    res.status(201).json({ success: true, data: { id: event._id } });
  }),
);

export default router;
