import mongoose from "mongoose";

const climateUpdateSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true, maxlength: 180 },
    summary: { type: String, required: true, trim: true, maxlength: 700 },
    body: { type: String, required: true, trim: true, maxlength: 10000 },
    sourceName: { type: String, required: true, trim: true },
    sourceUrl: { type: String, required: true, trim: true },
    sourcePublishedAt: { type: Date, required: true },
    readTimeMinutes: { type: Number, min: 1, max: 30, default: 3 },
    status: { type: String, enum: ["draft", "published", "archived"], default: "draft", index: true },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

climateUpdateSchema.index({ status: 1, publishedAt: -1 });

export default mongoose.model("ClimateUpdate", climateUpdateSchema);
