import mongoose from "mongoose";

const ecoActionSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    durationLabel: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    description: { type: String, required: true, trim: true, maxlength: 700 },
    startsAt: { type: Date, required: true },
    endsAt: { type: Date, required: true },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", index: true },
  },
  { timestamps: true },
);

ecoActionSchema.pre("validate", function validateDates() {
  if (this.endsAt <= this.startsAt) this.invalidate("endsAt", "endsAt must be after startsAt");
});

export default mongoose.model("EcoAction", ecoActionSchema);
