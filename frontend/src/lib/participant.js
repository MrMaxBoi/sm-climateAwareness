const PARTICIPANT_KEY = "ecolearn-participant-id";

const createParticipantId = () => {
  if (typeof crypto?.randomUUID === "function") return crypto.randomUUID();
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (character) =>
    (Number(character) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(character) / 4)))).toString(16),
  );
};

export const getParticipantId = () => {
  const existing = window.localStorage.getItem(PARTICIPANT_KEY);
  if (existing) return existing;

  const participantId = createParticipantId();
  window.localStorage.setItem(PARTICIPANT_KEY, participantId);
  return participantId;
};
