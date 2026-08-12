import { getParticipantId } from "./participant";

const request = async (path, options = {}) => {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-Participant-ID": getParticipantId(),
      "X-Analytics-Consent": window.localStorage.getItem("ecolearn-analytics-consent") === "granted" ? "true" : "false",
      ...options.headers,
    },
  });
  const payload = await response.json().catch(() => ({ success: false, message: "Invalid server response" }));
  if (!response.ok) {
    const error = new Error(payload.message || "Unable to complete the request");
    error.status = response.status;
    throw error;
  }
  return payload.data;
};

export const api = {
  getConfig: () => request("/api/config"),
  getUpdates: () => request("/api/updates"),
  getUpdate: (slug) => request(`/api/updates/${encodeURIComponent(slug)}`),
  getActiveQuiz: (type, phase) =>
    request(`/api/quizzes/active?type=${encodeURIComponent(type)}${phase ? `&phase=${encodeURIComponent(phase)}` : ""}`),
  checkQuizAnswer: (quizId, answer) =>
    request(`/api/quizzes/${quizId}/check`, { method: "POST", body: JSON.stringify(answer) }),
  submitQuiz: (quizId, answers) =>
    request(`/api/quizzes/${quizId}/attempts`, { method: "POST", body: JSON.stringify({ answers }) }),
  getActions: () => request("/api/actions/active"),
  completeAction: (actionId) => request(`/api/actions/${actionId}/completion`, { method: "PUT" }),
  undoAction: (actionId) => request(`/api/actions/${actionId}/completion`, { method: "DELETE" }),
  getProgress: () => request("/api/progress"),
  recordVisit: () => request("/api/activity/visit", { method: "POST" }),
  getFeedback: () => request("/api/feedback/mine"),
  saveFeedback: (feedback) => request("/api/feedback/mine", { method: "PUT", body: JSON.stringify(feedback) }),
};

const adminRequest = async (path, adminKey, options = {}) => {
  const response = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", "X-Admin-Key": adminKey, ...options.headers },
  });
  const payload = await response.json().catch(() => ({ message: "Invalid server response" }));
  if (!response.ok) throw new Error(payload.message || "Admin request failed");
  return payload.data;
};

export const adminApi = {
  authenticate: (key) => adminRequest("/api/admin/session", key, { method: "POST" }),
  getAnalytics: (key) => adminRequest("/api/admin/analytics", key),
  getContent: (key, resource) => adminRequest(`/api/admin/content/${resource}`, key),
  createContent: (key, resource, data) =>
    adminRequest(`/api/admin/content/${resource}`, key, { method: "POST", body: JSON.stringify(data) }),
  updateContent: (key, resource, id, data) =>
    adminRequest(`/api/admin/content/${resource}/${id}`, key, { method: "PUT", body: JSON.stringify(data) }),
};
