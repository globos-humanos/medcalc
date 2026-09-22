const mcisaac = {
  id: 'mcisaac',
  name: 'McIsaac Score',
  shortName: 'McIsaac',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'Age-adjusted Centor score for streptococcal pharyngitis.',
  keywords: ['McIsaac', 'Centor', 'strep', 'pharyngitis'],

  inputs: [
    { id: 'fever', label: 'Fever >38°C', type: 'boolean' },
    { id: 'noCough', label: 'Absence of cough', type: 'boolean' },
    { id: 'nodes', label: 'Tender anterior cervical adenopathy', type: 'boolean' },
    { id: 'exudate', label: 'Tonsillar exudate or swelling', type: 'boolean' },
    {
      id: 'age',
      label: 'Age',
      type: 'choice',
      options: [
        { value: 1, label: '3–14 years' },
        { value: 0, label: '15–44 years' },
        { value: -1, label: '≥45 years' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const score =
      Number(v.fever) +
      Number(v.noCough) +
      Number(v.nodes) +
      Number(v.exudate) +
      Number(v.age)

    return {
      value: score,
      displayValue: `${score}/5`,
      category:
        score <= 1
          ? 'Lower likelihood'
          : score <= 3
            ? 'Intermediate likelihood'
            : 'Higher likelihood',
      interpretation: `McIsaac score = ${score}/5.`,
      note:
        'Use the age-adjusted score as a clinical prediction rule; local testing and guideline pathways may differ.'
    }
  },

  references: ['McIsaac clinical prediction rule']
}

export default mcisaac
