const calc = {
  id: 'clinical-frailty-scale',
  name: 'Clinical Frailty Scale',
  shortName: 'CFS',
  categoryId: 'surgery',
  description: '9-point Clinical Frailty Scale.',
  type: 'score',

  inputs: [
    {
      id: 'score',
      label: 'Clinical Frailty Scale',
      type: 'choice',
      options: [
        { value: 1, label: '1 — Very fit' },
        { value: 2, label: '2 — Well' },
        { value: 3, label: '3 — Managing well' },
        { value: 4, label: '4 — Vulnerable' },
        { value: 5, label: '5 — Mildly frail' },
        { value: 6, label: '6 — Moderately frail' },
        { value: 7, label: '7 — Severely frail' },
        { value: 8, label: '8 — Very severely frail' },
        { value: 9, label: '9 — Terminally ill' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const score = Number(v.score)

    return {
      value: score,
      unit: '/9',
      interpretation:
        score <= 3 ? 'Fit / managing well' :
        score === 4 ? 'Vulnerable' :
        score <= 6 ? 'Frail' :
        score <= 8 ? 'Severely frail' :
        'Terminally ill',
      note: 'CFS is a clinical judgment tool and should be assigned using the validated descriptive framework rather than age alone.'
    }
  }
}

export default calc
