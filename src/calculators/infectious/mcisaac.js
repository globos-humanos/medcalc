const calc = {
  id: 'mcisaac',
  name: 'McIsaac Score',
  shortName: 'McIsaac',
  categoryId: 'infectious',
  description: 'Modified Centor clinical prediction rule for streptococcal pharyngitis.',
  type: 'score',

  inputs: [
    {
      id: 'fever',
      label: 'Fever >38°C',
      type: 'boolean'
    },
    {
      id: 'noCough',
      label: 'Absence of cough',
      type: 'boolean'
    },
    {
      id: 'nodes',
      label: 'Tender anterior cervical nodes',
      type: 'boolean'
    },
    {
      id: 'exudate',
      label: 'Tonsillar swelling/exudate',
      type: 'boolean'
    },
    {
      id: 'age',
      label: 'Age adjustment',
      type: 'choice',
      options: [
        {
          value: 1,
          label: '3–14 years'
        },
        {
          value: 0,
          label: '15–44 years'
        },
        {
          value: -1,
          label: '≥45 years'
        }
      ]
    }
  ],

  calculate(v) {
    if (
      v.age === undefined ||
      v.age === null ||
      v.age === ''
    ) {
      return {
        error: 'Please select an age group.'
      }
    }

    const score =
      (v.fever === true ? 1 : 0) +
      (v.noCough === true ? 1 : 0) +
      (v.nodes === true ? 1 : 0) +
      (v.exudate === true ? 1 : 0) +
      Number(v.age)

    return {
      value: score,
      unit: '/5',
      interpretation:
        score <= 1
          ? 'Low likelihood'
          : score <= 3
            ? 'Intermediate likelihood'
            : 'Higher likelihood'
    }
  }
}

export default calc