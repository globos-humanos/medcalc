const ballard = {
  id: 'ballard',
  name: 'Ballard Score',
  shortName: 'Ballard',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'New Ballard examination framework for estimating neonatal gestational age.',
  inputs: [
    {
      id: 'score',
      label: 'New Ballard Score',
      type: 'number',
      min: -10,
      max: 50,
      step: 1
    }
  ],
  calculate(v) {
    const score = Number(v.score)

    if (!Number.isFinite(score)) {
      return { error: 'Enter the completed New Ballard Score.' }
    }

    const gestationalAge = 24 + (0.4 * score)

    return {
      value: score,
      displayValue: `${score} points`,
      unit: 'New Ballard',
      interpretation: `Estimated gestational age approximately ${gestationalAge.toFixed(1)} weeks`,
      note: 'The New Ballard examination estimates gestational age from physical and neuromuscular maturity. Complete the validated examination before entering the total.'
    }
  }
}

export default ballard
