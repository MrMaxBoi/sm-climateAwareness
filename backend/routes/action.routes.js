import express from "express";
import mongoose from "mongoose";
import ActionCompletion from "../models/actionCompletion.model.js";
import ActivityEvent from "../models/activityEvent.model.js";
import EcoAction from "../models/ecoAction.model.js";
import { asyncHandler } from "../middleware/errors.js";
import { requireParticipant } from "../utils/participant.js";

const router = express.Router();

router.get(
  "/active",
  requireParticipant,
  asyncHandler(async (req, res) => {
    const now = new Date();
    const actions = await EcoAction.find({
      status: "published",
      startsAt: mongoose.trusted({ $lte: now }),
      endsAt: mongoose.trusted({ $gte: now }),
    })
      .sort({ startsAt: -1, title: 1 })
      .lean();
    const completed = await ActionCompletion.find({
      participantId: req.participantId,
      action: mongoose.trusted({ $in: actions.map((action) => action._id) }),
    }).distinct("action");
    const completedIds = new Set(completed.map(String));

    res.json({
      success: true,
      data: actions.map((action) => ({ ...action, completed: completedIds.has(String(action._id)) })),
    });
  }),
);

router.put(
  "/:actionId/completion",
  requireParticipant,
  asyncHandler(async (req, res) => {
    const action = await EcoAction.findOne({ _id: req.params.actionId, status: "published" });
    if (!action) return res.status(404).json({ success: false, message: "Eco action not found" });

    const completion = await ActionCompletion.findOneAndUpdate(
      { participantId: req.participantId, action: action._id },
      { $setOnInsert: { completedAt: new Date() } },
      { upsert: true, new: true },
    );
    await ActivityEvent.create({
      participantId: req.participantId,
      type: "action_complete",
      entityType: "action",
      entityId: action._id,
    });
    return res.json({ success: true, data: { actionId: action._id, completed: true, completedAt: completion.completedAt } });
  }),
);

router.delete(
  "/:actionId/completion",
  requireParticipant,
  asyncHandler(async (req, res) => {
    await ActionCompletion.deleteOne({ participantId: req.participantId, action: req.params.actionId });
    res.json({ success: true, data: { actionId: req.params.actionId, completed: false } });
  }),
);

export default router;
