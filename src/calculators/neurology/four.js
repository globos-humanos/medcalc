const four = {
  id: 'four',
  name: 'FOUR Score',
  shortName: 'FOUR',
  type: 'score',
  categoryId: 'neurology',
  category: 'Neurology',
  description: 'Grades coma severity using eye, motor, brainstem reflex, and respiration responses.',
  keywords: [
    'FOUR score',
    'Full Outline of UnResponsiveness',
    'coma',
    'consciousness',
    'brainstem reflexes',
    'respiration',
    'neurology'
  ],
  aliases: [
    'FOUR',
    'FOUR score',
    'Full Outline of UnResponsiveness'
  ],
  inputs: [
    {
      id: 'eye',
      label: 'Eye Response',
      type: 'choice',
      options: [
        { value: 4, label: '4 — Tracking / blinking to command' },
        { value: 3, label: '3 — Open, not tracking' },
        { value: 2, label: '2 — Opens to loud voice' },
        { value: 1, label: '1 — Opens to pain' },
        { value: 0, label: '0 — Remains closed' }
      ]
    },
    {
      id: 'motor',
      label: 'Motor Response',
      type: 'choice',
      options: [
        { value: 4, label: '4 — Thumbs-up / fist / peace sign' },
        { value: 3, label: '3 — Localizes pain' },
        { value: 2, label: '2 — Flexion to pain' },
        { value: 1, label: '1 — Extension to pain' },
        { value: 0, label: '0 — No response / myoclonus' }
      ]
    },
    {
      id: 'brainstem',
      label: 'Brainstem Reflexes',
      type: 'choice',
      options: [
        { value: 4, label: '4 — Pupil and corneal reflexes present' },
        { value: 3, label: '3 — One pupil wide and fixed' },
        { value: 2, label: '2 — Pupil OR corneal reflex absent' },
        { value: 1, label: '1 — Pupil AND corneal reflexes absent' },
        { value: 0, label: '0 — Pupil, corneal and cough absent' }
      ]
    },
    {
      id: 'respiration',
      label: 'Respiration',
      type: 'choice',
      options: [
        { value: 4, label: '4 — Regular, not intubated' },
        { value: 3, label: '3 — Cheyne-Stokes, not intubated' },
        { value: 2, label: '2 — Irregular, not intubated' },
        { value: 1, label: '1 — Breathes above ventilator rate' },
        { value: 0, label: '0 — At ventilator rate / apnea' }
      ]
    }
  ],
  calculate(values) {
    const fields = [
      values.eye,
      values.motor,
      values.brainstem,
      values.respiration
    ]

    if (fields.some(value => value === undefined || value === '')) {
      return { error: 'Please score all four FOUR components.' }
    }

    const score = fields.reduce(
      (total, value) => total + Number(value),
      0
    )

    return {
      value: score,
      displayValue: String(score),
      unit: '/16',
      category: score <= 4 ? 'Very low score' : 'FOUR Score'
    }
  },
  references: [
    'Wijdicks EFM, et al. Validation of a new coma scale: the FOUR score. Ann Neurol. 2005.',
    'MDCalc. FOUR (Full Outline of UnResponsiveness) Score.'
  ]
}

export default four
