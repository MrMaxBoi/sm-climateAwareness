import assert from "node:assert/strict";
import test from "node:test";
import EcoAction from "../models/ecoAction.model.js";
import Quiz from "../models/quiz.model.js";

test("quiz validation catches an answer index outside its options", async () => {
  const quiz = new Quiz({
    slug: "invalid-answer-index",
    type: "daily",
    title: "Invalid quiz",
    description: "A quiz used to verify schema validation.",
    startsAt: new Date("2026-01-01T00:00:00.000Z"),
    endsAt: new Date("2027-01-01T00:00:00.000Z"),
    questions: [{ key: "q1", prompt: "Test?", options: ["A", "B"], correctOption: 3, explanation: "Test" }],
  });

  await assert.rejects(quiz.validate(), /Correct option is outside/);
});

test("eco-action validation requires a valid scheduling window", async () => {
  const action = new EcoAction({
    slug: "invalid-window",
    durationLabel: "Today",
    title: "Invalid action",
    description: "An action used to verify schema validation.",
    startsAt: new Date("2027-01-01T00:00:00.000Z"),
    endsAt: new Date("2026-01-01T00:00:00.000Z"),
  });

  await assert.rejects(action.validate(), /endsAt must be after startsAt/);
});
