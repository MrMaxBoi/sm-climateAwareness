export const PARTICIPANT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const isValidParticipantId = (value) =>
  typeof value === "string" && PARTICIPANT_ID_PATTERN.test(value);

export const requireParticipant = (req, res, next) => {
  const participantId = req.get("X-Participant-ID");

  if (!isValidParticipantId(participantId)) {
    return res.status(400).json({
      success: false,
      message: "A valid anonymous X-Participant-ID is required",
    });
  }

  req.participantId = participantId.toLowerCase();
  return next();
};
