import assert from "node:assert/strict";
import test from "node:test";
import { isValidParticipantId, requireParticipant } from "../utils/participant.js";

test("accepts a version 4 anonymous participant UUID", () => {
  assert.equal(isValidParticipantId("550e8400-e29b-41d4-a716-446655440000"), true);
});

test("rejects missing and malformed participant identifiers", () => {
  assert.equal(isValidParticipantId(undefined), false);
  assert.equal(isValidParticipantId("participant-123"), false);
});

test("participant middleware attaches a normalized identifier", () => {
  const req = { get: () => "550E8400-E29B-41D4-A716-446655440000" };
  const res = { status: () => res, json: () => res };
  let called = false;

  requireParticipant(req, res, () => {
    called = true;
  });

  assert.equal(called, true);
  assert.equal(req.participantId, "550e8400-e29b-41d4-a716-446655440000");
});
