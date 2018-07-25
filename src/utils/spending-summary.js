const spendingSummary = (pcntSpent) => {
  if (pcntSpent < 0.6) {
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
