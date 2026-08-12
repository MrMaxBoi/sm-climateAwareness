import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, trim: true },
    prompt: { type: String, required: true, trim: true, maxlength: 500 },
    options: {
      type: [{ type: String, required: true, trim: true, maxlength: 300 }],
      validate: {
        validator: (options) => options.length >= 2 && options.length <= 6,
        message: "A question must contain between 2 and 6 options",
      },
    },
    correctOption: { type: Number, required: true, min: 0 },
    explanation: { type: String, required: true, trim: true, maxlength: 1000 },
  },
  { _id: false },
);

const quizSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    type: { type: String, enum: ["daily", "weekly", "assessment"], required: true, index: true },
    assessmentPhase: { type: String, enum: ["pre", "post"], default: undefined },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    questions: {
      type: [questionSchema],
      validate: {
        validator: (questions) => questions.length > 0 && questions.length <= 25,
        message: "A quiz must contain between 1 and 25 questions",
      },
    },
    startsAt: { type: Date, required: true, index: true },
    endsAt: { type: Date, required: true, index: true },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", index: true },
  },
  { timestamps: true },
);

quizSchema.index({ type: 1, status: 1, startsAt: 1, endsAt: 1 });

quizSchema.pre("validate", function validateQuiz() {
  if (this.endsAt <= this.startsAt) this.invalidate("endsAt", "endsAt must be after startsAt");
  if (this.type === "assessment" && !this.assessmentPhase) {
    this.invalidate("assessmentPhase", "Assessment quizzes require an assessmentPhase");
  }
  this.questions.forEach((question, index) => {
    if (question.correctOption >= question.options.length) {
      this.invalidate(`questions.${index}.correctOption`, "Correct option is outside the options list");
    }
  });
});

export default mongoose.model("Quiz", quizSchema);
