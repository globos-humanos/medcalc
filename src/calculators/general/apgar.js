const apgar = {
  id: 'apgar',
  name: 'APGAR Score',
  shortName: 'APGAR',
  type: 'score',
  categoryId: 'general-medicine',
  category: 'General Medicine',

  description: 'Scores newborn condition using appearance, pulse, grimace, activity, and respiration.',

  keywords: [
    'Apgar',
    'newborn',
    'neonate',
    'appearance',
    'pulse',
    'grimace',
    'activity',
    'respiration',
    'neonatal assessment'
  ],

  aliases: [
    'Apgar score',
    'APGAR',
    'newborn score'
  ],

  inputs: [
    {
      id: 'appearance',
      label: 'Appearance / Color',
      type: 'choice',
      options: [
        { value: 0, label: '0 — Blue / pale' },
        { value: 1, label: '1 — Body pink, extremities blue' },
        { value: 2, label: '2 — Completely pink' }
      ]
    },
    {
      id: 'pulse',
      label: 'Pulse',
      type: 'choice',
      options: [
        { value: 0, label: '0 — Absent' },
        { value: 1, label: '1 — <100 bpm' },
        { value: 2, label: '2 — ≥100 bpm' }
      ]
    },
    {
      id: 'grimace',
      label: 'Grimace / Reflex Response',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No response' },
        { value: 1, label: '1 — Grimace' },
        { value: 2, label: '2 — Cry / active response' }
      ]
    },
    {
      id: 'activity',
      label: 'Activity / Muscle Tone',
      type: 'choice',
      options: [
        { value: 0, label: '0 — Limp' },
        { value: 1, label: '1 — Some flexion' },
        { value: 2, label: '2 — Active movement' }
      ]
    },
    {
      id: 'respiration',
      label: 'Respiration',
      type: 'choice',
      options: [
        { value: 0, label: '0 — Absent' },
        { value: 1, label: '1 — Slow / irregular' },
        { value: 2, label: '2 — Good cry' }
      ]
    }
  ],

  calculate(values) {
    const fields = [
      values.appearance,
      values.pulse,
      values.grimace,
      values.activity,
      values.respiration
    ]

    if (fields.some(value => value === undefined || value === '')) {
      return {
        error: 'Please score all five APGAR components.'
      }
    }

    const score = fields.reduce(
      (total, value) => total + Number(value),
      0
    )

    let category
    let interpretation

    if (score <= 3) {
      category = 'Low'
      interpretation = 'APGAR 0–3 is a low score.'
    } else if (score <= 6) {
      category = 'Moderately abnormal'
      interpretation = 'APGAR 4–6 is a moderately abnormal score.'
    } else {
      category = 'Reassuring'
      interpretation = 'APGAR 7–10 is generally reassuring.'
    }

    return {
      value: score,
      displayValue: String(score),
      unit: '/10',
      category,
      interpretation,
      note: 'APGAR is used to describe newborn condition and response to resuscitation. It should not be used alone to determine whether initial resuscitation is required.'
    }
  },

  references: [
    'American Academy of Pediatrics. The Apgar Score. Pediatrics. 2015;136(4):819-822.'
  ]
}

export default apgar
