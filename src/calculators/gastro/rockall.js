const rockall = {
  id: 'rockall',
  name: 'Rockall Score',
  shortName: 'Rockall',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description:
    'Complete Rockall score for acute upper gastrointestinal haemorrhage, including endoscopic findings.',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'choice',
      options: [
        { value: 0, label: '<60 years' },
        { value: 1, label: '60–79 years' },
        { value: 2, label: '≥80 years' }
      ]
    },
    {
      id: 'hr',
      label: 'Heart rate',
      unit: '/min',
      min: 20,
      max: 250,
      step: 1
    },
    {
      id: 'sbp',
      label: 'Systolic BP',
      unit: 'mmHg',
      min: 40,
      max: 250,
      step: 1
    },
    {
      id: 'comorbidity',
      label: 'Comorbidity',
      type: 'choice',
      options: [
        { value: 0, label: 'No major comorbidity' },
        { value: 2, label: 'Cardiac failure, ischemic heart disease or other major comorbidity' },
        { value: 3, label: 'Renal failure, liver failure or disseminated malignancy' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'diagnosis',
      label: 'Endoscopic diagnosis',
      type: 'choice',
      options: [
        { value: 0, label: 'Mallory-Weiss tear or no lesion' },
        { value: 1, label: 'All other diagnoses' },
        { value: 2, label: 'Upper GI malignancy' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'stigmata',
      label: 'Major stigmata of recent haemorrhage',
      type: 'choice',
      options: [
        { value: 0, label: 'None or dark spot only' },
        { value: 2, label: 'Blood, adherent clot, visible/spurting vessel' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const age = Number(v.age)
    const hr = Number(v.hr)
    const sbp = Number(v.sbp)
    const comorbidity = Number(v.comorbidity)
    const diagnosis = Number(v.diagnosis)
    const stigmata = Number(v.stigmata)

    if (
      !Number.isFinite(age) ||
      !Number.isFinite(hr) ||
      !Number.isFinite(sbp) ||
      !Number.isFinite(comorbidity) ||
      !Number.isFinite(diagnosis) ||
      !Number.isFinite(stigmata)
    ) {
      return { error: 'Please complete all Rockall variables.' }
    }

    const shock =
      sbp < 100
        ? 2
        : hr >= 100
          ? 1
          : 0

    const clinicalScore = age + shock + comorbidity
    const total = clinicalScore + diagnosis + stigmata

    return {
      value: total,
      displayValue: String(total),
      unit: '/11',
      category:
        total <= 2
          ? 'Lower-risk range'
          : total >= 8
            ? 'High-risk range'
            : 'Intermediate-risk range',
      note:
        `Complete post-endoscopy Rockall score. Pre-endoscopy clinical component: ${clinicalScore}/7. The complete score adds endoscopic diagnosis and stigmata of recent haemorrhage.`
    }
  },

  references: [
    'Rockall TA, et al. Risk assessment after acute upper gastrointestinal haemorrhage. Gut. 1996;38:316–321.'
  ]
}

export default rockall
