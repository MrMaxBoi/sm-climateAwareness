import assert from "node:assert/strict";
import test from "node:test";
import { buildPairedAssessmentMetrics } from "../utils/analytics.js";

test("paired assessment analytics only compare learners with both results", () => {
  const metrics = buildPairedAssessmentMetrics([
    { participantId: "a", assessmentPhase: "pre", percentage: 50 },
    { participantId: "a", assessmentPhase: "post", percentage: 75 },
    { participantId: "b", assessmentPhase: "pre", percentage: 40 },
    { participantId: "b", assessmentPhase: "post", percentage: 30 },
    { participantId: "unpaired", assessmentPhase: "pre", percentage: 100 },
  ]);
  assert.equal(metrics.pairedParticipants, 2);
  assert.equal(metrics.preAverage, 45);
  assert.equal(metrics.postAverage, 53);
  assert.equal(metrics.averageImprovement, 8);
  assert.equal(metrics.improvementRate, 50);
});
