const heart = {
  id: 'heart',
  name: 'HEART Score for Major Cardiac Events',
  shortName: 'HEART',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'HEART score for patients presenting with symptoms suggestive of acute coronary syndrome.',
  keywords: ['HEART', 'chest pain', 'ACS', 'acute coronary syndrome', 'MACE'],
  aliases: ['HEART score'],

  inputs: [
    {
      id: 'history',
      label: 'History',
      type: 'choice',
      options: [
        { value: '0', label: 'Slightly suspicious' },
        { value: '1', label: 'Moderately suspicious' },
        { value: '2', label: 'Highly suspicious' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'ecg',
      label: 'ECG',
      type: 'choice',
      options: [
        { value: '0', label: 'Normal' },
        { value: '1', label: 'Non-specific repolarization disturbance' },
        { value: '2', label: 'Significant ST-segment deviation' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      unit: 'years',
      min: 0,
      max: 120,
      step: 1
    },
    {
      id: 'riskFactors',
      label: 'Risk factors / known atherosclerotic disease',
      type: 'choice',
      options: [
        { value: '0', label: 'No known risk factors' },
        { value: '1', label: '1–2 risk factors' },
        { value: '2', label: '≥3 risk factors or known atherosclerotic disease' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'troponin',
      label: 'Initial troponin',
      type: 'choice',
      options: [
        { value: '0', label: '≤ normal limit' },
        { value: '1', label: '1–3× normal limit' },
        { value: '2', label: '>3× normal limit' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const age = Number(v.age)

    if (
      !valuesPresent(v.history) ||
      !valuesPresent(v.ecg) ||
      !valuesPresent(v.riskFactors) ||
      !valuesPresent(v.troponin) ||
      !Number.isFinite(age)
    ) {
      return {
        error: 'Please complete all HEART inputs.'
      }
    }

    const agePoints =
      age >= 65 ? 2 :
      age >= 45 ? 1 : 0

    const score =
      Number(v.history) +
      Number(v.ecg) +
      agePoints +
      Number(v.riskFactors) +
      Number(v.troponin)

    return {
      value: score,
      displayValue: `${score}/10`,
      unit: 'points',
      category:
        score <= 3 ? 'Low-risk range' :
        score <= 6 ? 'Intermediate-risk range' :
        'High-risk range',
      note: 'HEART consists of History, ECG, Age, Risk factors, and Troponin, each contributing 0–2 points. Exact risk estimates depend on the validated population and HEART version used.'
    }
  },

  references: [
    'Six AJ, et al. Neth Heart J. 2008;16:191–196.',
    'HEART score review and validation literature.'
  ]
}

function valuesPresent(value) {
  return value !== undefined && value !== null && value !== ''
}

export default heart
