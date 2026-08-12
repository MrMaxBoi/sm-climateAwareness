import "dotenv/config";
import express from "express";
import path from "path";
import helmet from "helmet";
import { connectDB } from "./config/db.js";
import actionRoutes from "./routes/action.routes.js";
import activityRoutes from "./routes/activity.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import updateRoutes from "./routes/update.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import { errorHandler, notFound } from "./middleware/errors.js";
import { adminLimiter, apiLimiter, submissionLimiter } from "./middleware/security.js";
import { campaignConfig } from "./config/campaign.js";

export const app = express();
const PORT = process.env.PORT || 5050;
const __dirname = path.resolve();

app.set("trust proxy", 1);
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(express.json({ limit: "100kb" }));
app.use("/api", apiLimiter);

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "EcoLearn API",
  });
});
app.get("/api/config", (_req, res) => res.json({ success: true, data: campaignConfig }));

app.use("/api/updates", updateRoutes);
app.use("/api/quizzes", submissionLimiter, quizRoutes);
app.use("/api/actions", submissionLimiter, actionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/feedback", submissionLimiter, feedbackRoutes);
app.use("/api/admin", adminLimiter, adminRoutes);

app.use("/api/{*any}", notFound);

if (process.env.NODE_ENV === "production") {
  const frontendDirectory = process.env.VERCEL
    ? path.join(__dirname, "public")
    : path.join(__dirname, "frontend", "dist");
  app.use(express.static(frontendDirectory));
  app.get("/{*any}", (_req, res) => {
    res.sendFile(path.join(frontendDirectory, "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
};

if (process.env.NODE_ENV !== "test" && !process.env.VERCEL) {
  startServer().catch((error) => {
    console.error(`Unable to start EcoLearn: ${error.message}`);
    process.exit(1);
  });
}
