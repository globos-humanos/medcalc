const centor = {
  id: 'centor',
  name: 'Centor Score',
  shortName: 'Centor',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'Original Centor clinical prediction score for streptococcal pharyngitis.',
  keywords: ['Centor', 'strep', 'pharyngitis'],

  inputs: [
    { id: 'fever', label: 'Fever >38°C', type: 'boolean' },
    { id: 'noCough', label: 'Absence of cough', type: 'boolean' },
    { id: 'nodes', label: 'Tender anterior cervical adenopathy', type: 'boolean' },
    { id: 'exudate', label: 'Tonsillar exudate or swelling', type: 'boolean' }
  ],

  calculate(v) {
    const score =
      Number(v.fever) +
      Number(v.noCough) +
      Number(v.nodes) +
      Number(v.exudate)

    return {
      value: score,
      displayValue: `${score}/4`,
      category:
        score <= 1
          ? 'Lower likelihood'
          : score <= 3
            ? 'Intermediate likelihood'
            : 'Higher likelihood',
      interpretation: `Centor score = ${score}/4.`,
      note:
        'The Centor score does not include age. The age-adjusted version is the McIsaac score.'
    }
  },

  references: ['Original Centor clinical prediction rule']
}

export default centor
