const prism = {
  id: 'prism-iii-pediatric',
  name: 'PRISM III',
  shortName: 'PRISM III',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Pediatric Risk of Mortality III model-output framework.',
  inputs: [
    {
      id: 'score',
      label: 'Validated PRISM III score',
      type: 'number',
      min: 0,
      max: 76,
      step: 1
    }
  ],
  calculate(v) {
    const score = Number(v.score)

    if (!Number.isFinite(score)) {
      return { error: 'Enter a validated PRISM III score.' }
    }

    return {
      value: score,
      displayValue: `${score} points`,
      unit: 'PRISM III',
      interpretation: 'Higher PRISM III scores represent greater physiologic severity.',
      note: 'The complete PRISM III model contains defined physiologic variables and timing rules. This interface does not fabricate a mortality probability from an incomplete model.'
    }
  }
}

export default prism

