export const pickRandomWeight = (weights: Array<number>) => {
  const cumulativeWeights: Array<number> = [];
  for (let i = 0; i < weights.length; i++) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
  }
  const random = Math.random() * cumulativeWeights[cumulativeWeights.length - 1];
  
  for (let i = 0; i < cumulativeWeights.length; i++) {
    if (random < cumulativeWeights[i]) {
      return i;
    }
  }
  
  return weights.length - 1;
}