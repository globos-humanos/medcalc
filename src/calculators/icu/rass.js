const calc = {
  id: 'rass',
  name: 'Richmond Agitation-Sedation Scale',
  shortName: 'RASS',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Standard Richmond Agitation-Sedation Scale for assessing agitation and sedation.',
  type: 'score',

  inputs: [
    {
      id: 'score',
      label: 'Observed state',
      type: 'choice',
      options: [
        { value: 4, label: '+4 — Combative' },
        { value: 3, label: '+3 — Very agitated' },
        { value: 2, label: '+2 — Agitated' },
        { value: 1, label: '+1 — Restless' },
        { value: 0, label: '0 — Alert and calm' },
        { value: -1, label: '-1 — Drowsy' },
        { value: -2, label: '-2 — Light sedation' },
        { value: -3, label: '-3 — Moderate sedation' },
        { value: -4, label: '-4 — Deep sedation' },
        { value: -5, label: '-5 — Unarousable' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    if (v.score === undefined || v.score === '') {
      return {
        error: 'Please select the observed RASS state.'
      }
    }

    const score = Number(v.score)

    const labels = {
      4: 'Combative',
      3: 'Very agitated',
      2: 'Agitated',
      1: 'Restless',
      0: 'Alert and calm',
      '-1': 'Drowsy',
      '-2': 'Light sedation',
      '-3': 'Moderate sedation',
      '-4': 'Deep sedation',
      '-5': 'Unarousable'
    }

    return {
      value: score,
      displayValue: score > 0 ? `+${score}` : String(score),
      unit: 'RASS',
      category: labels[String(score)],
      interpretation:
        score > 0
          ? 'Agitation is present.'
          : score === 0
            ? 'Patient is alert and calm.'
            : 'Sedation / reduced level of consciousness is present.',
      note: 'RASS ranges from +4 (combative) to -5 (unarousable).'
    }
  }
}

export default calc
