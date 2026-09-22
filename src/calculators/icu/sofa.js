const sofa = {
  id: 'sofa',
  name: 'SOFA Score',
  shortName: 'SOFA',
  type: 'score',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Sequential Organ Failure Assessment score across six organ systems.',
  keywords: ['SOFA', 'Sequential Organ Failure Assessment', 'sepsis', 'organ failure'],
  aliases: ['Sequential Organ Failure Assessment'],

  inputs: [
    {
      id: 'pao2',
      label: 'PaO₂',
      unit: 'mmHg',
      min: 0,
      max: 800,
      step: 1
    },
    {
      id: 'fio2',
      label: 'FiO₂',
      unit: '%',
      min: 21,
      max: 100,
      step: 1
    },
    {
      id: 'respSupport',
      label: 'Mechanical ventilation / qualifying respiratory support?',
      type: 'boolean'
    },
    {
      id: 'platelets',
      label: 'Platelets',
      unit: '×10³/µL',
      min: 0,
      max: 1000,
      step: 1
    },
    {
      id: 'bilirubin',
      label: 'Total bilirubin',
      unit: 'mg/dL',
      min: 0,
      max: 50,
      step: 0.1
    },
    {
      id: 'cardiovascular',
      label: 'Cardiovascular status',
      type: 'choice',
      options: [
        { value: '0', label: 'MAP ≥70 mmHg' },
        { value: '1', label: 'MAP <70 mmHg' },
        { value: '2', label: 'Dopamine ≤5 or dobutamine (any dose)' },
        { value: '3', label: 'Dopamine >5 to 15, or epinephrine ≤0.1, or norepinephrine ≤0.1 µg/kg/min' },
        { value: '4', label: 'Dopamine >15, or epinephrine >0.1, or norepinephrine >0.1 µg/kg/min' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'gcs',
      label: 'Glasgow Coma Scale',
      min: 3,
      max: 15,
      step: 1
    },
    {
      id: 'creatinine',
      label: 'Creatinine',
      unit: 'mg/dL',
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      id: 'urineOutput',
      label: 'Urine output over 24 hours',
      unit: 'mL/day',
      min: 0,
      max: 10000,
      step: 1
    }
  ],

  calculate(values) {
    const n = id => Number(values[id])

    const required = [
      'pao2',
      'fio2',
      'platelets',
      'bilirubin',
      'gcs',
      'creatinine',
      'urineOutput'
    ]

    if (
      required.some(id => !Number.isFinite(n(id))) ||
      values.respSupport === undefined ||
      !values.cardiovascular
    ) {
      return {
        error: 'Please complete all SOFA inputs.'
      }
    }

    const pfRatio =
      n('pao2') / (n('fio2') / 100)

    const respiratory =
      pfRatio < 100 && values.respSupport ? 4 :
      pfRatio < 200 && values.respSupport ? 3 :
      pfRatio <= 300 ? 2 :
      pfRatio <= 400 ? 1 : 0

    const coagulation =
      n('platelets') < 20 ? 4 :
      n('platelets') < 50 ? 3 :
      n('platelets') < 100 ? 2 :
      n('platelets') < 150 ? 1 : 0

    const liver =
      n('bilirubin') >= 12 ? 4 :
      n('bilirubin') >= 6 ? 3 :
      n('bilirubin') >= 2 ? 2 :
      n('bilirubin') >= 1.2 ? 1 : 0

    const cardiovascular =
      Number(values.cardiovascular)

    const cns =
      n('gcs') < 6 ? 4 :
      n('gcs') <= 9 ? 3 :
      n('gcs') <= 12 ? 2 :
      n('gcs') <= 14 ? 1 : 0

    const renalByCreatinine =
      n('creatinine') >= 5 ? 4 :
      n('creatinine') >= 3.5 ? 3 :
      n('creatinine') >= 2 ? 2 :
      n('creatinine') >= 1.2 ? 1 : 0

    const renalByUrine =
      n('urineOutput') < 200 ? 4 :
      n('urineOutput') < 500 ? 3 : 0

    const renal =
      Math.max(
        renalByCreatinine,
        renalByUrine
      )

    const total =
      respiratory +
      coagulation +
      liver +
      cardiovascular +
      cns +
      renal

    return {
      value: total,
      displayValue: `${total}/24`,
      unit: 'points',
      category:
        `Resp ${respiratory} • Coag ${coagulation} • Liver ${liver} • CV ${cardiovascular} • CNS ${cns} • Renal ${renal}`,
      note:
        'SOFA quantifies dysfunction across six organ systems. The score itself is not an individual mortality probability.'
    }
  },

  references: [
    'Vincent JL, et al. The SOFA (Sepsis-related Organ Failure Assessment) score. Intensive Care Med. 1996;22:707–710.'
  ]
}

export default sofa
