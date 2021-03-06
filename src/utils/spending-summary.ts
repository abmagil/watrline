export type SpendingSummary = "veryLow" | "onTrack" | "tight" | "over"
const spendingSummary = (pcntSpent: number): SpendingSummary => {
  if (pcntSpent < 0) { // indicates that there is negative available cash
    return 'over';
  } else if (pcntSpent < 0.6) {
    return 'veryLow';
  } else if (pcntSpent < 0.95) {
    return 'onTrack';
  } else if (pcntSpent <= 1) {
    return 'tight';
  } else {
    return 'over';
  }
};

export default spendingSummary;
