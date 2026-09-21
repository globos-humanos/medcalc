const cha2ds2Vasc = {
  id: 'cha2ds2-vasc',
  name: 'CHA₂DS₂-VASc Score',
  shortName: 'CHA₂DS₂-VASc',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Estimates thromboembolic stroke risk in patients with atrial fibrillation.',
  keywords: [
    'CHA2DS2-VASc',
    'CHA₂DS₂-VASc',
    'atrial fibrillation',
    'AF',
    'stroke risk',
    'thromboembolism',
    'heart failure',
    'hypertension',
    'diabetes',
    'vascular disease'
  ],
  aliases: [
    'CHA2DS2VASc',
    'CHA2DS2-VASc',
    'CHA₂DS₂-VASc',
    'AF stroke score'
  ],
  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'choice',
      options: [
        { value: 0, label: '<65 years — 0' },
        { value: 1, label: '65–74 years — 1' },
        { value: 2, label: '≥75 years — 2' }
      ]
    },
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        { value: 0, label: 'Male — 0' },
        { value: 1, label: 'Female — 1' }
      ]
    },
    {
      id: 'chf',
      label: 'Congestive heart failure / LV dysfunction',
      type: 'boolean'
    },
    {
      id: 'hypertension',
      label: 'Hypertension',
      type: 'boolean'
    },
    {
      id: 'stroke',
      label: 'Prior stroke, TIA, or thromboembolism',
      type: 'boolean'
    },
    {
      id: 'vascular',
      label: 'Vascular disease (prior MI, PAD, or aortic plaque)',
      type: 'boolean'
    },
    {
      id: 'diabetes',
      label: 'Diabetes mellitus',
      type: 'boolean'
    }
  ],
  calculate(values) {
    const required = [
      'age',
      'sex',
      'chf',
      'hypertension',
      'stroke',
      'vascular',
      'diabetes'
    ]

    if (
      required.some(field =>
        values[field] === undefined
      )
    ) {
      return { error: 'Please complete every CHA₂DS₂-VASc criterion.' }
    }

    const score =
      Number(values.age) +
      Number(values.sex) +
      (values.chf ? 1 : 0) +
      (values.hypertension ? 1 : 0) +
      (values.stroke ? 2 : 0) +
      (values.vascular ? 1 : 0) +
      (values.diabetes ? 1 : 0)

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category: `CHA₂DS₂-VASc score ${score}`
    }
  },
  references: [
    'Lip GYH, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in atrial fibrillation using a novel risk factor-based approach. Chest. 2010.',
    'MDCalc. CHA₂DS₂-VASc Score for Atrial Fibrillation Stroke Risk.'
  ]
}

export default cha2ds2Vasc
