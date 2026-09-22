const mascc = {
  id: 'mascc',
  name: 'MASCC Febrile Neutropenia Score',
  shortName: 'MASCC',
  categoryId: 'hematology',
  description:
    'Multinational Association for Supportive Care of Cancer risk-index score for febrile neutropenia.',
  type: 'score',

  inputs: [
    {
      id: 'burden',
      label: 'Burden of illness',
      type: 'choice',
      options: [
        { value: 5, label: 'No or mild symptoms' },
        { value: 3, label: 'Moderate symptoms' },
        { value: 0, label: 'Severe symptoms' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'hypotension',
      label: 'Hypotension — systolic BP <90 mmHg?',
      type: 'boolean'
    },
    {
      id: 'copd',
      label: 'Chronic obstructive pulmonary disease?',
      type: 'boolean'
    },
    {
      id: 'tumor',
      label: 'Solid tumor or no previous fungal infection in hematologic malignancy?',
      type: 'boolean'
    },
    {
      id: 'outpatient',
      label: 'Febrile neutropenia episode began as an outpatient?',
      type: 'boolean'
    },
    {
      id: 'dehydration',
      label: 'Dehydration requiring IV fluids?',
      type: 'boolean'
    },
    {
      id: 'age',
      label: 'Age <60 years?',
      type: 'boolean'
    }
  ],

  calculate(v) {
    if (
      v.burden === undefined ||
      typeof v.hypotension !== 'boolean' ||
      typeof v.copd !== 'boolean' ||
      typeof v.tumor !== 'boolean' ||
      typeof v.outpatient !== 'boolean' ||
      typeof v.dehydration !== 'boolean' ||
      typeof v.age !== 'boolean'
    ) {
      return {
        error: 'Please complete all MASCC criteria.'
      }
    }

    const score =
      Number(v.burden) +
      (v.hypotension ? 0 : 5) +
      (v.copd ? 0 : 4) +
      (v.tumor ? 4 : 0) +
      (v.outpatient ? 3 : 0) +
      (v.dehydration ? 0 : 3) +
      (v.age ? 2 : 0)

    return {
      value: score,
      displayValue: `${score}/26`,
      unit: 'points',
      category:
        score >= 21
          ? 'MASCC ≥21 — low-risk group'
          : 'MASCC <21 — high-risk group',
      interpretation:
        score >= 21
          ? 'The score is in the validated MASCC low-risk range.'
          : 'The score is below the validated MASCC low-risk threshold.',
      note:
        'The original MASCC risk index includes burden of illness, hypotension, COPD, tumor type/history of fungal infection, outpatient onset, dehydration and age. A score ≥21 identifies the validated low-risk group.'
    }
  },

  references: [
    'Klastersky J, et al. The Multinational Association for Supportive Care in Cancer risk index. J Clin Oncol. 2000.',
    'MASCC risk-index score: ≥21 identifies the low-risk group.'
  ]
}

export default mascc
