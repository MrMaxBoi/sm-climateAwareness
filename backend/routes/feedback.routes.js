import express from "express";
import Feedback from "../models/feedback.model.js";
import { asyncHandler } from "../middleware/errors.js";
import { requireParticipant } from "../utils/participant.js";

const router = express.Router();

router.get("/mine", requireParticipant, asyncHandler(async (req, res) => {
  const feedback = await Feedback.findOne({ participantId: req.participantId }).lean();
  res.json({ success: true, data: feedback });
}));

router.put("/mine", requireParticipant, asyncHandler(async (req, res) => {
  const rating = Number(req.body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5 || typeof req.body.learnedSomething !== "boolean") {
    return res.status(400).json({ success: false, message: "Rating and learning response are required" });
  }
  const feedback = await Feedback.findOneAndUpdate(
    { participantId: req.participantId },
    { rating, learnedSomething: req.body.learnedSomething, comment: String(req.body.comment || "").trim(), submittedAt: new Date() },
    { upsert: true, new: true, runValidators: true },
  );
  return res.json({ success: true, data: feedback });
}));

export default router;
