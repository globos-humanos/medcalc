const dubowitz = {
  id: 'dubowitz',
  name: 'Dubowitz Score',
  shortName: 'Dubowitz',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Dubowitz gestational-age assessment framework.',
  inputs: [
    {
      id: 'score',
      label: 'Dubowitz Score',
      type: 'number',
      min: 0,
      max: 70,
      step: 1
    }
  ],
  calculate(v) {
    const score = Number(v.score)

    if (!Number.isFinite(score)) {
      return { error: 'Enter the completed Dubowitz Score.' }
    }

    return {
      value: score,
      displayValue: `${score} points`,
      unit: 'points',
      interpretation: 'Use the validated Dubowitz score-to-gestational-age conversion.',
      note: 'The complete Dubowitz examination contains multiple physical and neurologic maturity items. This calculator accepts the completed validated total.'
    }
  }
}

export default dubowitz
