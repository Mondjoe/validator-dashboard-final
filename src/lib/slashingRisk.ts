export function calculateSlashingRisk({
  doubleSignEvents,
  surroundVoteEvents,
  missedAttestations,
  lowParticipationEpochs,
  syncFailures,
  correctnessRate,
}) {
  // Weighted scoring model
  const weights = {
    doubleSignEvents: 40,
    surroundVoteEvents: 25,
    missedAttestations: 10,
    lowParticipationEpochs: 10,
    syncFailures: 10,
    correctnessRate: 5,
  };

  // Normalize correctness (lower correctness = higher risk)
  const correctnessRisk = (100 - correctnessRate) * (weights.correctnessRate / 100);

  const rawScore =
    doubleSignEvents * weights.doubleSignEvents +
    surroundVoteEvents * weights.surroundVoteEvents +
    missedAttestations * weights.missedAttestations +
    lowParticipationEpochs * weights.lowParticipationEpochs +
    syncFailures * weights.syncFailures +
    correctnessRisk;

  // Normalize to 0–100
  const score = Math.min(100, Math.max(0, rawScore));

  let category = "Low";
  if (score >= 25) category = "Medium";
  if (score >= 50) category = "High";
  if (score >= 75) category = "Critical";

  return { score, category };
}