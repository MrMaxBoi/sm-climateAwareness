export const buildPairedAssessmentMetrics = (attempts) => {
  const participants = new Map();
  attempts.forEach((attempt) => {
    if (!attempt.assessmentPhase) return;
    const result = participants.get(attempt.participantId) || {};
    result[attempt.assessmentPhase] = attempt.percentage;
    participants.set(attempt.participantId, result);
  });
  const paired = [...participants.values()].filter((result) => Number.isFinite(result.pre) && Number.isFinite(result.post));
  const average = (values) => values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
  const preAverage = average(paired.map((result) => result.pre));
  const postAverage = average(paired.map((result) => result.post));
  return {
    pairedParticipants: paired.length,
    preAverage: preAverage === null ? null : Math.round(preAverage),
    postAverage: postAverage === null ? null : Math.round(postAverage),
    averageImprovement: paired.length ? Math.round(average(paired.map((result) => result.post - result.pre))) : null,
    participantsImproved: paired.filter((result) => result.post > result.pre).length,
    improvementRate: paired.length ? Math.round((paired.filter((result) => result.post > result.pre).length / paired.length) * 100) : null,
  };
};
