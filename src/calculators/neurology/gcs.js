const gcs = {
  id: 'gcs',
  name: 'Glasgow Coma Scale',
  shortName: 'GCS',
  type: 'score',
  categoryId: 'neurology',
  category: 'Neurology',
  description: 'Assesses level of consciousness using eye, verbal, and motor responses.',
  keywords: [
    'Glasgow Coma Scale',
    'GCS',
    'coma',
    'consciousness',
    'eye opening',
    'verbal response',
    'motor response',
    'neurological assessment'
  ],
  aliases: [
    'Glasgow Coma Scale',
    'Glasgow Coma Score',
    'GCS',
    'coma scale'
  ],
  inputs: [
    {
      id: 'eye',
      label: 'Eye Opening',
      type: 'choice',
      options: [
        { value: 4, label: '4 — Spontaneous' },
        { value: 3, label: '3 — To voice' },
        { value: 2, label: '2 — To pain' },
        { value: 1, label: '1 — None' }
      ]
    },
    {
      id: 'verbal',
      label: 'Verbal Response',
      type: 'choice',
      options: [
        { value: 5, label: '5 — Oriented' },
        { value: 4, label: '4 — Confused' },
        { value: 3, label: '3 — Inappropriate words' },
        { value: 2, label: '2 — Incomprehensible sounds' },
        { value: 1, label: '1 — None' }
      ]
    },
    {
      id: 'motor',
      label: 'Motor Response',
      type: 'choice',
      options: [
        { value: 6, label: '6 — Obeys commands' },
        { value: 5, label: '5 — Localizes pain' },
        { value: 4, label: '4 — Withdraws' },
        { value: 3, label: '3 — Flexion' },
        { value: 2, label: '2 — Extension' },
        { value: 1, label: '1 — None' }
      ]
    }
  ],
  calculate(values) {
    const fields = [
      values.eye,
      values.verbal,
      values.motor
    ]

    if (fields.some(value => value === undefined || value === '')) {
      return { error: 'Please score all three GCS components.' }
    }

    const score = fields.reduce(
      (total, value) => total + Number(value),
      0
    )

    let interpretation = ''

    if (score === 15) {
      interpretation = 'GCS 15'
    } else if (score >= 13) {
      interpretation = 'Mild impairment'
    } else if (score >= 9) {
      interpretation = 'Moderate impairment'
    } else {
      interpretation = 'Severe impairment'
    }

    return {
      value: score,
      displayValue: String(score),
      unit: '/15',
      category: interpretation
    }
  },
  references: [
    'Teasdale G, Jennett B. Assessment of coma and impaired consciousness. Lancet. 1974.',
    'MDCalc. Glasgow Coma Scale (GCS).'
  ]
}

export default gcs
