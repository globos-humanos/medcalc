const pelod2 = {
  id: 'pelod-2-pediatric',
  name: 'PELOD-2',
  shortName: 'PELOD-2',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Pediatric Logistic Organ Dysfunction-2 model-output framework.',
  inputs: [
    {
      id: 'score',
      label: 'Validated PELOD-2 score',
      type: 'number',
      min: 0,
      max: 33,
      step: 1
    }
  ],
  calculate(v) {
    const score = Number(v.score)

    if (!Number.isFinite(score)) {
      return { error: 'Enter a validated PELOD-2 score.' }
    }

    return {
      value: score,
      displayValue: `${score} points`,
      unit: 'PELOD-2',
      interpretation: score === 0
        ? 'No PELOD-2 points'
        : 'Organ dysfunction points present',
      note: 'Higher PELOD-2 scores represent greater organ dysfunction. This interface does not convert the score into an invented mortality probability.'
    }
  }
}

export default pelod2

