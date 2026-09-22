const pediatricGcs = {
  id: 'pediatric-gcs',
  name: 'Pediatric Glasgow Coma Scale',
  shortName: 'Pediatric GCS',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Age-adapted Glasgow Coma Scale assessment.',
  inputs: [
    {
      id: 'eye',
      label: 'Eye opening',
      type: 'choice',
      options: [
        { value: 4, label: 'Spontaneous' },
        { value: 3, label: 'To voice' },
        { value: 2, label: 'To pain' },
        { value: 1, label: 'None' }
      ]
    },
    {
      id: 'verbal',
      label: 'Verbal response',
      type: 'choice',
      options: [
        { value: 5, label: 'Age-appropriate / oriented' },
        { value: 4, label: 'Confused' },
        { value: 3, label: 'Inappropriate words / cries' },
        { value: 2, label: 'Incomprehensible sounds / moans' },
        { value: 1, label: 'None' }
      ]
    },
    {
      id: 'motor',
      label: 'Motor response',
      type: 'choice',
      options: [
        { value: 6, label: 'Obeys commands / age-appropriate movement' },
        { value: 5, label: 'Localizes pain' },
        { value: 4, label: 'Withdraws from pain' },
        { value: 3, label: 'Abnormal flexion' },
        { value: 2, label: 'Extension' },
        { value: 1, label: 'None' }
      ]
    }
  ],
  calculate(v) {
    const score =
      Number(v.eye) +
      Number(v.verbal) +
      Number(v.motor)

    return {
      value: score,
      displayValue: `${score}/15`,
      unit: 'GCS',
      interpretation:
        score <= 8
          ? 'Severe impairment of consciousness'
          : score <= 12
            ? 'Moderate impairment of consciousness'
            : 'Milder impairment of consciousness',
      note: 'Use age-appropriate verbal and interaction criteria in preverbal children. Document individual components as well as the total.'
    }
  }
}

export default pediatricGcs
