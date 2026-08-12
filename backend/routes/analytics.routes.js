import express from "express";
import ActionCompletion from "../models/actionCompletion.model.js";
import ActivityEvent from "../models/activityEvent.model.js";
import QuizAttempt from "../models/quizAttempt.model.js";
import Feedback from "../models/feedback.model.js";
import { asyncHandler } from "../middleware/errors.js";
import { buildPairedAssessmentMetrics } from "../utils/analytics.js";

const router = express.Router();

const requireAnalyticsKey = (req, res, next) => {
  const configuredKey = process.env.ANALYTICS_KEY;
  if (!configuredKey || req.get("X-Analytics-Key") !== configuredKey) {
    return res.status(401).json({ success: false, message: "Analytics access is not authorized" });
  }
  return next();
};

router.get(
  "/summary",
  requireAnalyticsKey,
  asyncHandler(async (_req, res) => {
    const [uniqueVisitors, visits, quizSummary, actionCompletions, assessmentAttempts, feedback] = await Promise.all([
      ActivityEvent.distinct("participantId", { type: "visit" }).then((ids) => ids.length),
      ActivityEvent.countDocuments({ type: "visit" }),
      QuizAttempt.aggregate([
        { $match: { quizType: { $in: ["daily", "weekly"] } } },
        { $group: { _id: null, completions: { $sum: 1 }, averageScore: { $avg: "$percentage" } } },
      ]),
      ActionCompletion.countDocuments(),
      QuizAttempt.find({ quizType: "assessment" }).select("participantId assessmentPhase percentage").lean(),
      Feedback.find({}).select("rating learnedSomething").lean(),
    ]);
    res.json({
      success: true,
      data: {
        uniqueVisitors,
        visits,
        repeatVisits: Math.max(0, visits - uniqueVisitors),
        quizCompletions: quizSummary[0]?.completions ?? 0,
        averageQuizScore: Math.round(quizSummary[0]?.averageScore ?? 0),
        actionCompletions,
        assessment: buildPairedAssessmentMetrics(assessmentAttempts),
        feedback: {
          responses: feedback.length,
          averageRating: feedback.length ? Math.round((feedback.reduce((sum, item) => sum + item.rating, 0) / feedback.length) * 10) / 10 : null,
          learnedSomethingRate: feedback.length ? Math.round((feedback.filter((item) => item.learnedSomething).length / feedback.length) * 100) : null,
        },
      },
    });
  }),
);

export default router;
