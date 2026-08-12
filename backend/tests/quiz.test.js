import assert from "node:assert/strict";
import test from "node:test";
import { checkQuizAnswer, gradeQuiz, toPublicQuiz } from "../utils/quiz.js";

const quiz = {
  _id: { toString: () => "quiz-id" },
  slug: "test-quiz",
  type: "daily",
  title: "Test quiz",
  description: "Test description",
  startsAt: new Date("2026-01-01T00:00:00.000Z"),
  endsAt: new Date("2027-01-01T00:00:00.000Z"),
  questions: [
    {
      key: "q1",
      prompt: "Question one?",
      options: ["Wrong", "Correct"],
      correctOption: 1,
      explanation: "Option two is correct.",
    },
    {
      key: "q2",
      prompt: "Question two?",
      options: ["Correct", "Wrong"],
      correctOption: 0,
      explanation: "Option one is correct.",
    },
  ],
};

test("public quiz payload never includes answers or explanations", () => {
  const publicQuiz = toPublicQuiz(quiz);
  assert.equal(publicQuiz.questions[0].correctOption, undefined);
  assert.equal(publicQuiz.questions[0].explanation, undefined);
  assert.deepEqual(publicQuiz.questions[0].options, ["Wrong", "Correct"]);
});

test("grades a complete quiz submission and returns feedback", () => {
  const result = gradeQuiz(quiz, [
    { questionKey: "q1", selectedOption: 1 },
    { questionKey: "q2", selectedOption: 1 },
  ]);

  assert.equal(result.score, 1);
  assert.equal(result.total, 2);
  assert.equal(result.percentage, 50);
  assert.equal(result.answers[0].isCorrect, true);
  assert.equal(result.answers[1].correctOption, 0);
});

test("rejects incomplete and duplicate submissions", () => {
  assert.throws(
    () => gradeQuiz(quiz, [{ questionKey: "q1", selectedOption: 1 }]),
    /Every quiz question/,
  );
  assert.throws(
    () =>
      gradeQuiz(quiz, [
        { questionKey: "q1", selectedOption: 1 },
        { questionKey: "q1", selectedOption: 0 },
      ]),
    /more than once/,
  );
});

test("returns immediate feedback only after a learning-quiz answer", () => {
  const feedback = checkQuizAnswer(quiz, "q1", 1);
  assert.equal(feedback.isCorrect, true);
  assert.equal(feedback.correctOption, 1);
  assert.match(feedback.explanation, /correct/);
});

test("does not reveal immediate feedback for an assessment", () => {
  assert.throws(() => checkQuizAnswer({ ...quiz, type: "assessment" }, "q1", 1), /only after submission/);
});
