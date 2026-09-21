const curb65 = {
  id: 'curb-65',
  name: 'CURB-65 Score',
  shortName: 'CURB-65',
  type: 'score',
  categoryId: 'respiratory',
  category: 'Respiratory',
  description: 'Assesses severity and mortality risk in community-acquired pneumonia.',
  keywords: [
    'CURB-65',
    'pneumonia',
    'CAP',
    'confusion',
    'urea',
    'BUN',
    'respiratory rate',
    'blood pressure',
    'age'
  ],
  aliases: [
    'CURB65',
    'CURB 65',
    'pneumonia severity score'
  ],
  inputs: [
    {
      id: 'confusion',
      label: 'Confusion',
      type: 'boolean'
    },
    {
      id: 'bun',
      label: 'BUN >19 mg/dL (>7 mmol/L urea)',
      type: 'boolean'
    },
    {
      id: 'respiratoryRate',
      label: 'Respiratory rate ≥30/min',
      type: 'boolean'
    },
    {
      id: 'bloodPressure',
      label: 'SBP <90 mmHg or DBP ≤60 mmHg',
      type: 'boolean'
    },
    {
      id: 'age',
      label: 'Age ≥65 years',
      type: 'boolean'
    }
  ],
  calculate(values) {
    const fields = [
      'confusion',
      'bun',
      'respiratoryRate',
      'bloodPressure',
      'age'
    ]

    if (fields.some(field => values[field] === undefined)) {
      return { error: 'Please answer every CURB-65 criterion.' }
    }

    const score = fields.reduce(
      (total, field) =>
        total + (values[field] ? 1 : 0),
      0
    )

    let interpretation = ''

    if (score <= 1) {
      interpretation = 'Lower score'
    } else if (score === 2) {
      interpretation = 'Intermediate score'
    } else {
      interpretation = 'High score'
    }

    return {
      value: score,
      displayValue: String(score),
      unit: '/5',
      category: interpretation
    }
  },
  references: [
    'Lim WS, et al. Defining community acquired pneumonia severity on presentation to hospital: an international derivation and validation study. Thorax. 2003;58:377-382.',
    'MDCalc. CURB-65 Score for Pneumonia Severity.'
  ]
}

export default curb65
