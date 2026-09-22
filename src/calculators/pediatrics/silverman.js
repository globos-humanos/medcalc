const silverman = {
  id: 'silverman-andersen',
  name: 'Silverman-Andersen Score',
  shortName: 'Silverman-Andersen',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Clinical assessment of neonatal respiratory distress.',
  inputs: [
    {
      id: 'upperChest',
      label: 'Upper chest movement',
      type: 'choice',
      options: [
        { value: 0, label: 'Synchronous with abdomen' },
        { value: 1, label: 'Lagging' },
        { value: 2, label: 'See-saw movement' }
      ]
    },
    {
      id: 'lowerChest',
      label: 'Lower chest retraction',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Mild' },
        { value: 2, label: 'Marked' }
      ]
    },
    {
      id: 'xiphoid',
      label: 'Xiphoid retraction',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Mild' },
        { value: 2, label: 'Marked' }
      ]
    },
    {
      id: 'nasalFlaring',
      label: 'Nasal flaring',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Mild' },
        { value: 2, label: 'Marked' }
      ]
    },
    {
      id: 'grunting',
      label: 'Expiratory grunt',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Audible with stethoscope' },
        { value: 2, label: 'Audible without stethoscope' }
      ]
    }
  ],
  calculate(v) {
    const score =
      Number(v.upperChest) +
      Number(v.lowerChest) +
      Number(v.xiphoid) +
      Number(v.nasalFlaring) +
      Number(v.grunting)

    return {
      value: score,
      displayValue: `${score}/10`,
      unit: 'points',
      interpretation:
        score === 0
          ? 'No respiratory distress by this score'
          : score <= 3
            ? 'Mild respiratory distress'
            : score <= 6
              ? 'Moderate respiratory distress'
              : 'Severe respiratory distress',
      note: 'Higher scores indicate greater neonatal respiratory distress.'
    }
  }
}

export default silverman
