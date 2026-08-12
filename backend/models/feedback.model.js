import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    participantId: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    learnedSomething: { type: Boolean, required: true },
    comment: { type: String, trim: true, maxlength: 1000, default: "" },
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

feedbackSchema.index({ participantId: 1 }, { unique: true });

export default mongoose.model("Feedback", feedbackSchema);
