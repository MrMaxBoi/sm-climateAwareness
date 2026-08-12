import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionKey: { type: String, required: true },
    selectedOption: { type: Number, required: true, min: 0 },
    isCorrect: { type: Boolean, required: true },
  },
  { _id: false },
);

const quizAttemptSchema = new mongoose.Schema(
  {
    participantId: { type: String, required: true, index: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true, index: true },
    quizType: { type: String, enum: ["daily", "weekly", "assessment"], required: true },
    assessmentPhase: { type: String, enum: ["pre", "post"], default: undefined },
    answers: { type: [answerSchema], required: true },
    score: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 1 },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

quizAttemptSchema.index({ participantId: 1, quiz: 1 }, { unique: true });

export default mongoose.model("QuizAttempt", quizAttemptSchema);
