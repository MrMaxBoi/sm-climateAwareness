import express from "express";
import ActionCompletion from "../models/actionCompletion.model.js";
import ActivityEvent from "../models/activityEvent.model.js";
import ClimateUpdate from "../models/climateUpdate.model.js";
import EcoAction from "../models/ecoAction.model.js";
import Quiz from "../models/quiz.model.js";
import QuizAttempt from "../models/quizAttempt.model.js";
import Feedback from "../models/feedback.model.js";
import { requireAdmin } from "../middleware/admin.js";
import { asyncHandler } from "../middleware/errors.js";
import { buildPairedAssessmentMetrics } from "../utils/analytics.js";

const router = express.Router();
router.use(requireAdmin);

const resources = {
  updates: { Model: ClimateUpdate, sort: { publishedAt: -1 } },
  quizzes: { Model: Quiz, sort: { startsAt: -1 } },
  actions: { Model: EcoAction, sort: { startsAt: -1 } },
};

router.post("/session", (_req, res) => res.json({ success: true, data: { authenticated: true } }));

router.get(
  "/content/:resource",
  asyncHandler(async (req, res) => {
    const config = resources[req.params.resource];
    if (!config) return res.status(404).json({ success: false, message: "Unknown content resource" });
    const items = await config.Model.find({}).sort(config.sort).lean();
    return res.json({ success: true, data: items });
  }),
);

router.post(
  "/content/:resource",
  asyncHandler(async (req, res) => {
    const config = resources[req.params.resource];
    if (!config) return res.status(404).json({ success: false, message: "Unknown content resource" });
    const item = await config.Model.create(req.body);
    return res.status(201).json({ success: true, data: item });
  }),
);

router.put(
  "/content/:resource/:id",
  asyncHandler(async (req, res) => {
    const config = resources[req.params.resource];
    if (!config) return res.status(404).json({ success: false, message: "Unknown content resource" });
    const item = await config.Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: "Content item not found" });
    return res.json({ success: true, data: item });
  }),
);

router.get(
  "/analytics",
  asyncHandler(async (_req, res) => {
    const [visitors, visits, attempts, completions, feedback, updateViews] = await Promise.all([
      ActivityEvent.distinct("participantId", { type: "visit" }),
      ActivityEvent.countDocuments({ type: "visit" }),
      QuizAttempt.find({}).select("participantId quizType assessmentPhase percentage").lean(),
      ActionCompletion.countDocuments(),
      Feedback.find({}).select("rating learnedSomething").lean(),
      ActivityEvent.aggregate([
        { $match: { type: "update_view" } },
        { $group: { _id: "$entityId", views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 5 },
        { $lookup: { from: "climateupdates", localField: "_id", foreignField: "_id", as: "update" } },
        { $unwind: "$update" },
        { $project: { _id: 0, title: "$update.title", slug: "$update.slug", views: 1 } },
      ]),
    ]);
    const regular = attempts.filter((attempt) => attempt.quizType !== "assessment");
    const average = regular.length ? Math.round(regular.reduce((sum, attempt) => sum + attempt.percentage, 0) / regular.length) : 0;
    return res.json({
      success: true,
      data: {
        uniqueVisitors: visitors.length,
        visits,
        quizCompletions: regular.length,
        averageQuizScore: average,
        actionCompletions: completions,
        preAssessments: attempts.filter((attempt) => attempt.assessmentPhase === "pre").length,
        postAssessments: attempts.filter((attempt) => attempt.assessmentPhase === "post").length,
        pairedAssessment: buildPairedAssessmentMetrics(attempts.filter((attempt) => attempt.quizType === "assessment")),
        feedbackResponses: feedback.length,
        averageRating: feedback.length ? Math.round((feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length) * 10) / 10 : null,
        learnedSomethingRate: feedback.length ? Math.round((feedback.filter((item) => item.learnedSomething).length / feedback.length) * 100) : null,
        topUpdates: updateViews,
      },
    });
  }),
);

export default router;
