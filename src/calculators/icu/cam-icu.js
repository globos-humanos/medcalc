const calc = {
  id: 'cam-icu',
  name: 'CAM-ICU',
  shortName: 'CAM-ICU',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Confusion Assessment Method for ICU delirium screening.',
  type: 'score',

  inputs: [
    {
      id: 'acute',
      label: 'Acute onset or fluctuating course?',
      type: 'boolean'
    },
    {
      id: 'inattentionErrors',
      label: 'Inattention — number of errors',
      type: 'number',
      min: 0,
      max: 10,
      step: 1
    },
    {
      id: 'rass',
      label: 'Current RASS',
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
    },
    {
      id: 'disorganizedErrors',
      label: 'Disorganized thinking — number of errors',
      type: 'number',
      min: 0,
      max: 5,
      step: 1
    }
  ],

  calculate(v) {
    const inattentionErrors = Number(v.inattentionErrors)
    const rass = Number(v.rass)
    const disorganizedErrors = Number(v.disorganizedErrors)

    if (
      !Number.isFinite(inattentionErrors) ||
      !Number.isFinite(rass) ||
      !Number.isFinite(disorganizedErrors)
    ) {
      return {
        error: 'Please complete all CAM-ICU assessment components.'
      }
    }

    if (rass <= -4) {
      return {
        value: 'Unable to assess',
        displayValue: 'Unable to assess',
        unit: 'CAM-ICU',
        category: 'Deep sedation / unarousable',
        interpretation: 'CAM-ICU assessment is not reliably interpretable at RASS -4 or -5.',
        note: 'Reassess when the patient is sufficiently arousable for valid delirium assessment.'
      }
    }

    const feature1 = Boolean(v.acute)
    const feature2 = inattentionErrors > 2
    const feature3 = rass !== 0
    const feature4 = disorganizedErrors > 1

    const positive = feature1 && feature2 && (feature3 || feature4)

    return {
      value: positive ? 'Positive' : 'Negative',
      displayValue: positive ? 'Positive' : 'Negative',
      unit: 'CAM-ICU',
      category: positive ? 'Delirium screen positive' : 'Delirium screen negative',
      interpretation: positive
        ? 'Features 1 and 2 are present with either feature 3 or feature 4.'
        : 'CAM-ICU criteria for delirium are not met.',
      note: 'CAM-ICU positive requires acute/fluctuating course + inattention + either altered level of consciousness or disorganized thinking.'
    }
  },

  references: [
    'Society of Critical Care Medicine — CAM-ICU Assessment Tool.'
  ]
}

export default calc
