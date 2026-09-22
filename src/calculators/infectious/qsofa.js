const qsofa = {
  id: 'qsofa',
  name: 'qSOFA',
  shortName: 'qSOFA',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'Quick Sequential Organ Failure Assessment for patients with suspected infection.',
  keywords: ['qSOFA', 'sepsis', 'SOFA'],

  inputs: [
    {
      id: 'rr',
      label: 'Respiratory rate',
      type: 'number',
      unit: '/min',
      min: 0,
      max: 100
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      type: 'number',
      unit: 'mmHg',
      min: 30,
      max: 300
    },
    {
      id: 'mental',
      label: 'Altered mentation / GCS <15?',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const rr = Number(v.rr)
    const sbp = Number(v.sbp)

    const respiratory = rr >= 22
    const hypotension = sbp <= 100
    const altered = v.mental === true

    const score =
      Number(respiratory) +
      Number(hypotension) +
      Number(altered)

    return {
      value: score,
      displayValue: `${score}/3`,
      category:
        score >= 2
          ? 'qSOFA ≥2'
          : 'qSOFA <2',
      interpretation:
        score >= 2
          ? 'Two or more qSOFA criteria are present.'
          : 'Fewer than two qSOFA criteria are present.',
      note:
        'qSOFA is a bedside risk-assessment tool in adults with suspected infection. It is not a diagnostic definition of sepsis and should not be used in isolation.'
    }
  },

  references: ['Sepsis-3 consensus definition']
}

export default qsofa
