const calc = {
  id: 'nrs2002',
  name: 'NRS-2002',
  shortName: 'NRS-2002',
  categoryId: 'surgery',
  description: 'Nutritional Risk Screening 2002 for hospitalized adults.',
  type: 'score',

  inputs: [
    {
      id: 'nutrition',
      label: 'Impaired nutritional status',
      type: 'choice',
      options: [
        { value: 0, label: 'Normal nutritional status' },
        { value: 1, label: 'Mild impairment' },
        { value: 2, label: 'Moderate impairment' },
        { value: 3, label: 'Severe impairment' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'severity',
      label: 'Disease severity / increased nutritional requirements',
      type: 'choice',
      options: [
        { value: 0, label: 'Normal nutritional requirements' },
        { value: 1, label: 'Mild increase' },
        { value: 2, label: 'Moderate increase' },
        { value: 3, label: 'Severe increase' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'age70',
      label: 'Age ≥70 years',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const score =
      Number(v.nutrition || 0) +
      Number(v.severity || 0) +
      (v.age70 ? 1 : 0)

    return {
      value: score,
      unit: '/7',
      interpretation: score >= 3 ? 'Nutritional risk present' : 'No significant nutritional risk by NRS-2002 threshold',
      note: 'NRS-2002 requires clinical assessment of nutritional status and disease severity; the score is a screening tool rather than a diagnosis of malnutrition.'
    }
  }
}

export default calc
