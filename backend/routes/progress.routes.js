import express from "express";
import ActionCompletion from "../models/actionCompletion.model.js";
import QuizAttempt from "../models/quizAttempt.model.js";
import { asyncHandler } from "../middleware/errors.js";
import { requireParticipant } from "../utils/participant.js";

const router = express.Router();

router.get(
  "/",
  requireParticipant,
  asyncHandler(async (req, res) => {
    const [attempts, actionCount] = await Promise.all([
      QuizAttempt.find({ participantId: req.participantId })
        .sort({ completedAt: -1 })
        .select("quizType assessmentPhase score total percentage completedAt")
        .lean(),
      ActionCompletion.countDocuments({ participantId: req.participantId }),
    ]);
    const regularAttempts = attempts.filter((attempt) => attempt.quizType !== "assessment");
    const averageScore = regularAttempts.length
      ? Math.round(regularAttempts.reduce((sum, attempt) => sum + attempt.percentage, 0) / regularAttempts.length)
      : 0;
    const pre = attempts.find((attempt) => attempt.assessmentPhase === "pre");
    const post = attempts.find((attempt) => attempt.assessmentPhase === "post");

    res.json({
      success: true,
      data: {
        quizzesCompleted: regularAttempts.length,
        averageScore,
        actionsCompleted: actionCount,
        assessment: {
          preScore: pre?.percentage ?? null,
          postScore: post?.percentage ?? null,
          improvement: pre && post ? post.percentage - pre.percentage : null,
        },
        recentAttempts: attempts.slice(0, 10),
      },
    });
  }),
);

export default router;
