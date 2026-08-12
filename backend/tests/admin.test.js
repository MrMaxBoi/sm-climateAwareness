import assert from "node:assert/strict";
import test from "node:test";
import { requireAdmin } from "../middleware/admin.js";

test("admin middleware rejects a missing secret", () => {
  process.env.ADMIN_KEY = "a-secure-test-key";
  const req = { get: () => undefined };
  let statusCode;
  const res = { status: (code) => { statusCode = code; return res; }, json: () => res };
  let called = false;
  requireAdmin(req, res, () => { called = true; });
  assert.equal(statusCode, 401);
  assert.equal(called, false);
});

test("admin middleware accepts only the configured secret", () => {
  process.env.ADMIN_KEY = "a-secure-test-key";
  const req = { get: () => "a-secure-test-key" };
  const res = {};
  let called = false;
  requireAdmin(req, res, () => { called = true; });
  assert.equal(called, true);
});
