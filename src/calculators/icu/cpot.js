const calc = {
  id: 'cpot',
  name: 'Critical-Care Pain Observation Tool',
  shortName: 'CPOT',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Behavioral pain assessment for critically ill adults who cannot reliably self-report pain.',
  type: 'score',

  inputs: [
    {
      id: 'facial',
      label: 'Facial expression',
      type: 'choice',
      options: [
        { value: 0, label: '0 — Relaxed, neutral' },
        { value: 1, label: '1 — Tense' },
        { value: 2, label: '2 — Grimacing' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'movement',
      label: 'Body movements',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No movement' },
        { value: 1, label: '1 — Protection / cautious movement' },
        { value: 2, label: '2 — Restlessness / agitation' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'tension',
      label: 'Muscle tension',
      type: 'choice',
      options: [
        { value: 0, label: '0 — Relaxed' },
        { value: 1, label: '1 — Tense' },
        { value: 2, label: '2 — Very tense / rigid' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'ventilation',
      label: 'Ventilator compliance / vocalization',
      type: 'choice',
      options: [
        { value: 0, label: '0 — Tolerating ventilator / normal vocalization' },
        { value: 1, label: '1 — Coughing but tolerating / sighing or moaning' },
        { value: 2, label: '2 — Fighting ventilator / crying out or sobbing' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const values = [
      v.facial,
      v.movement,
      v.tension,
      v.ventilation
    ]

    if (values.some(value => value === undefined || value === '')) {
      return {
        error: 'Please complete all four CPOT domains.'
      }
    }

    const score = values.reduce(
      (total, value) => total + Number(value),
      0
    )

    const significant = score >= 3

    return {
      value: score,
      displayValue: `${score}/8`,
      unit: 'points',
      category: significant
        ? 'Clinically significant pain may be present'
        : 'No significant pain signal by CPOT threshold',
      interpretation: significant
        ? 'CPOT ≥3 is commonly used as a threshold suggesting significant pain.'
        : 'CPOT is below the commonly used threshold of 3.',
      note: 'CPOT is intended for critically ill adults who cannot reliably self-report pain. Interpret alongside the clinical context.'
    }
  },

  references: [
    'Society of Critical Care Medicine — ICU Liberation resources.'
  ]
}

export default calc
