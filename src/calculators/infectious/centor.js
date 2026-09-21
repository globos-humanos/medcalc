const calc = {
  id: 'centor',
  name: 'Centor Score',
  shortName: 'Centor',
  categoryId: 'infectious',
  description: 'Clinical prediction rule for streptococcal pharyngitis in adults.',
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
    }
  ],

  calculate(v) {
    const score =
      (v.fever === true ? 1 : 0) +
      (v.noCough === true ? 1 : 0) +
      (v.nodes === true ? 1 : 0) +
      (v.exudate === true ? 1 : 0)

    return {
      value: score,
      unit: '/4',
      interpretation:
        score <= 1
          ? 'Low likelihood'
          : score === 2
            ? 'Intermediate likelihood'
            : 'Higher likelihood'
    }
  }
}

export default calc