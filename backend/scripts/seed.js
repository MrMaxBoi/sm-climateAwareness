import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import ClimateUpdate from "../models/climateUpdate.model.js";
import EcoAction from "../models/ecoAction.model.js";
import Quiz from "../models/quiz.model.js";
import { climateUpdateSeeds, ecoActionSeeds, quizSeeds } from "../data/seedData.js";

const upsertBySlug = (Model, items) =>
  Promise.all(items.map((item) => Model.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, new: true, runValidators: true })));

try {
  await connectDB();
  const [updates, quizzes, actions] = await Promise.all([
    upsertBySlug(ClimateUpdate, climateUpdateSeeds),
    upsertBySlug(Quiz, quizSeeds),
    upsertBySlug(EcoAction, ecoActionSeeds),
  ]);
  console.log(`Seeded ${updates.length} update, ${quizzes.length} quizzes, and ${actions.length} eco actions.`);
} catch (error) {
  console.error(`Unable to seed EcoLearn: ${error.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
