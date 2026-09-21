const heart = {
  id: 'heart',
  name: 'HEART Score for Major Cardiac Events',
  shortName: 'HEART',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Calculates the HEART score for patients presenting with symptoms suggestive of acute coronary syndrome.',
  keywords: ['HEART', 'chest pain', 'ACS', 'acute coronary syndrome', 'MACE', 'troponin'],
  aliases: ['HEART score', 'history ECG age risk factors troponin'],
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
        { value: '2', label: 'Significant ST deviation' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      unit: 'years',
      min: 0,
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
  calculate(values) {
    const age = Number(values.age)
    if (!values.history || !values.ecg || !values.riskFactors || !values.troponin || !Number.isFinite(age)) {
      return { error: 'Please complete all HEART inputs.' }
    }

    const agePoints = age >= 65 ? 2 : age >= 45 ? 1 : 0
    const score =
      Number(values.history) +
      Number(values.ecg) +
      agePoints +
      Number(values.riskFactors) +
      Number(values.troponin)

    return {
      value: score,
      displayValue: String(score),
      unit: '/ 10 points',
      category:
        score <= 3 ? 'Low-risk range' :
        score <= 6 ? 'Intermediate-risk range' :
        'High-risk range'
    }
  },
  references: [
    'Six AJ, et al. A clinical score for assessing the risk of major adverse cardiac events in patients with chest pain. Neth Heart J. 2008;16:191–196.',
    'MDCalc — HEART Score for Major Cardiac Events.'
  ]
}

export default heart
