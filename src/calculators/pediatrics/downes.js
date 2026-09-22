const downes = {
  id: 'downes',
  name: 'Downes Score',
  shortName: 'Downes',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Assessment of neonatal respiratory distress.',
  inputs: [
    {
      id: 'respiratoryRate',
      label: 'Respiratory rate',
      type: 'choice',
      options: [
        { value: 0, label: '<60/min' },
        { value: 1, label: '60–80/min' },
        { value: 2, label: '>80/min' }
      ]
    },
    {
      id: 'cyanosis',
      label: 'Cyanosis',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 1, label: 'In room air' },
        { value: 2, label: 'Persistent despite oxygen' }
      ]
    },
    {
      id: 'airEntry',
      label: 'Air entry',
      type: 'choice',
      options: [
        { value: 0, label: 'Normal' },
        { value: 1, label: 'Decreased' },
        { value: 2, label: 'Markedly decreased' }
      ]
    },
    {
      id: 'grunting',
      label: 'Grunting',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Audible with stethoscope' },
        { value: 2, label: 'Audible without stethoscope' }
      ]
    },
    {
      id: 'retractions',
      label: 'Retractions',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Mild' },
        { value: 2, label: 'Marked' }
      ]
    }
  ],
  calculate(v) {
    const score =
      Number(v.respiratoryRate) +
      Number(v.cyanosis) +
      Number(v.airEntry) +
      Number(v.grunting) +
      Number(v.retractions)

    return {
      value: score,
      displayValue: `${score}/10`,
      unit: 'points',
      interpretation:
        score <= 3
          ? 'Mild respiratory distress'
          : score <= 6
            ? 'Moderate respiratory distress'
            : 'Severe respiratory distress',
      note: 'Downes score variants exist. Confirm the version used by your institution.'
    }
  }
}

export default downes
