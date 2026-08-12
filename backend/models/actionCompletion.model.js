import mongoose from "mongoose";

const actionCompletionSchema = new mongoose.Schema(
  {
    participantId: { type: String, required: true, index: true },
    action: { type: mongoose.Schema.Types.ObjectId, ref: "EcoAction", required: true, index: true },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

actionCompletionSchema.index({ participantId: 1, action: 1 }, { unique: true });

export default mongoose.model("ActionCompletion", actionCompletionSchema);
