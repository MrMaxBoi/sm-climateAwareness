import mongoose from "mongoose";

const activityEventSchema = new mongoose.Schema(
  {
    participantId: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ["visit", "update_view", "quiz_start", "quiz_complete", "action_complete"],
      required: true,
      index: true,
    },
    entityType: { type: String, enum: ["update", "quiz", "action"], default: undefined },
    entityId: { type: mongoose.Schema.Types.ObjectId, default: undefined },
    occurredAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true },
);

activityEventSchema.index({ participantId: 1, type: 1, occurredAt: -1 });

export default mongoose.model("ActivityEvent", activityEventSchema);
