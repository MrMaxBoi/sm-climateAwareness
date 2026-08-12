import express from "express";
import mongoose from "mongoose";
import ActivityEvent from "../models/activityEvent.model.js";
import Quiz from "../models/quiz.model.js";
import QuizAttempt from "../models/quizAttempt.model.js";
import { asyncHandler } from "../middleware/errors.js";
import { requireParticipant } from "../utils/participant.js";
import { checkQuizAnswer, gradeQuiz, toPublicQuiz } from "../utils/quiz.js";

const router = express.Router();
const quizTypes = new Set(["daily", "weekly", "assessment"]);

router.get(
  "/active",
  requireParticipant,
  asyncHandler(async (req, res) => {
    const { type = "daily", phase } = req.query;
    if (!quizTypes.has(type)) {
      return res.status(400).json({ success: false, message: "Invalid quiz type" });
    }
    if (type === "assessment" && !["pre", "post"].includes(phase)) {
      return res.status(400).json({ success: false, message: "Assessment phase must be pre or post" });
    }

    const now = new Date();
    const query = {
      type,
      status: "published",
      startsAt: mongoose.trusted({ $lte: now }),
      endsAt: mongoose.trusted({ $gte: now }),
      ...(type === "assessment" ? { assessmentPhase: phase } : {}),
    };
    let quiz;
    if (type === "assessment") {
      quiz = await Quiz.findOne(query).sort({ startsAt: -1 });
    } else {
      const activeQuizzes = await Quiz.find(query).sort({ slug: 1 });
      const malaysiaNow = new Date(now.getTime() + 8 * 60 * 60 * 1000);
      const dayNumber = Math.floor(malaysiaNow.getTime() / 86400000);
      const rotationIndex = type === "daily" ? dayNumber : Math.floor(dayNumber / 7);
      quiz = activeQuizzes.length ? activeQuizzes[rotationIndex % activeQuizzes.length] : null;
    }
    if (!quiz) return res.status(404).json({ success: false, message: "No active quiz found" });

    const existingAttempt = await QuizAttempt.exists({ participantId: req.participantId, quiz: quiz._id });
    await ActivityEvent.create({
      participantId: req.participantId,
      type: "quiz_start",
      entityType: "quiz",
      entityId: quiz._id,
    });

    return res.json({
      success: true,
      data: { ...toPublicQuiz(quiz), completed: Boolean(existingAttempt) },
    });
  }),
);

router.post(
  "/:quizId/check",
  requireParticipant,
  asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz || quiz.status !== "published") {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }
    const now = new Date();
    if (now < quiz.startsAt || now > quiz.endsAt) {
      return res.status(409).json({ success: false, message: "This quiz is not currently active" });
    }
    try {
      const feedback = checkQuizAnswer(quiz, req.body.questionKey, req.body.selectedOption);
      return res.json({ success: true, data: feedback });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }),
);

router.post(
  "/:quizId/attempts",
  requireParticipant,
  asyncHandler(async (req, res) => {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz || quiz.status !== "published") {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    const now = new Date();
    if (now < quiz.startsAt || now > quiz.endsAt) {
      return res.status(409).json({ success: false, message: "This quiz is not currently active" });
    }

    let result;
    try {
      result = gradeQuiz(quiz, req.body.answers);
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    const attempt = await QuizAttempt.create({
      participantId: req.participantId,
      quiz: quiz._id,
      quizType: quiz.type,
      assessmentPhase: quiz.assessmentPhase,
      answers: result.answers.map(({ questionKey, selectedOption, isCorrect }) => ({
        questionKey,
        selectedOption,
        isCorrect,
      })),
      score: result.score,
      total: result.total,
      percentage: result.percentage,
    });
    await ActivityEvent.create({
      participantId: req.participantId,
      type: "quiz_complete",
      entityType: "quiz",
      entityId: quiz._id,
    });

    return res.status(201).json({
      success: true,
      data: {
        attemptId: attempt._id,
        score: result.score,
        total: result.total,
        percentage: result.percentage,
        answers: result.answers,
      },
    });
  }),
);

export default router;
