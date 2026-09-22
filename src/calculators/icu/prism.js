const prism = {
  id: 'prism',
  name: 'PRISM III',
  shortName: 'PRISM III',
  type: 'score',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Pediatric Risk of Mortality III physiologic severity score using the most abnormal values during the scoring period.',
  keywords: ['PRISM', 'PRISM III', 'Pediatric Risk of Mortality', 'PICU'],
  aliases: ['PRISM', 'PRISM 3'],

  inputs: [
    {
      id: 'ageMonths',
      label: 'Age',
      unit: 'months',
      min: 0,
      max: 228
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      unit: 'mmHg',
      min: 0,
      max: 300
    },
    {
      id: 'heartRate',
      label: 'Heart rate',
      unit: '/min',
      min: 0,
      max: 300
    },
    {
      id: 'temperature',
      label: 'Temperature',
      unit: '°C',
      min: 20,
      max: 45,
      step: 0.1
    },
    {
      id: 'gcs',
      label: 'Glasgow Coma Scale',
      min: 3,
      max: 15
    },
    {
      id: 'pupils',
      label: 'Pupillary response',
      type: 'choice',
      options: [
        { value: 'reactive', label: 'Both reactive' },
        { value: 'oneFixed', label: 'One fixed/dilated and one reactive' },
        { value: 'bothFixed', label: 'Both fixed and dilated' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'ph',
      label: 'Arterial pH',
      min: 6.5,
      max: 8,
      step: 0.01
    },
    {
      id: 'totalCO2',
      label: 'Total CO₂',
      unit: 'mEq/L',
      min: 0,
      max: 60,
      step: 0.1
    },
    {
      id: 'pco2',
      label: 'PaCO₂',
      unit: 'mmHg',
      min: 0,
      max: 150,
      step: 1
    },
    {
      id: 'pao2',
      label: 'PaO₂',
      unit: 'mmHg',
      min: 0,
      max: 800,
      step: 1
    },
    {
      id: 'glucose',
      label: 'Glucose',
      unit: 'mg/dL',
      min: 0,
      max: 1000,
      step: 1
    },
    {
      id: 'potassium',
      label: 'Potassium',
      unit: 'mEq/L',
      min: 0,
      max: 15,
      step: 0.1
    },
    {
      id: 'creatinine',
      label: 'Creatinine',
      unit: 'mg/dL',
      min: 0,
      max: 20,
      step: 0.01
    },
    {
      id: 'bun',
      label: 'BUN',
      unit: 'mg/dL',
      min: 0,
      max: 300,
      step: 0.1
    },
    {
      id: 'wbc',
      label: 'WBC',
      unit: 'cells/µL',
      min: 0,
      max: 100000,
      step: 100
    },
    {
      id: 'platelets',
      label: 'Platelets',
      unit: 'cells/µL',
      min: 0,
      max: 1000000,
      step: 1000
    },
    {
      id: 'pt',
      label: 'Prothrombin time',
      unit: 'seconds',
      min: 0,
      max: 120,
      step: 0.1
    },
    {
      id: 'ptt',
      label: 'Partial thromboplastin time',
      unit: 'seconds',
      min: 0,
      max: 180,
      step: 0.1
    }
  ],

  calculate(values) {
    const n = id => Number(values[id])

    const ids = [
      'ageMonths',
      'sbp',
      'heartRate',
      'temperature',
      'gcs',
      'ph',
      'totalCO2',
      'pco2',
      'pao2',
      'glucose',
      'potassium',
      'creatinine',
      'bun',
      'wbc',
      'platelets',
      'pt',
      'ptt'
    ]

    if (
      ids.some(id => !Number.isFinite(n(id))) ||
      !values.pupils
    ) {
      return {
        error: 'Please complete all PRISM III variables.'
      }
    }

    const age = n('ageMonths')

    let cardiovascular = 0

    if (age < 1) {
      cardiovascular +=
        n('sbp') < 40 ? 7 :
        n('sbp') <= 55 ? 3 : 0
    } else if (age < 12) {
      cardiovascular +=
        n('sbp') < 45 ? 7 :
        n('sbp') <= 65 ? 3 : 0
    } else if (age <= 144) {
      cardiovascular +=
        n('sbp') < 55 ? 7 :
        n('sbp') <= 75 ? 3 : 0
    } else {
      cardiovascular +=
        n('sbp') < 65 ? 7 :
        n('sbp') <= 85 ? 3 : 0
    }

    if (age < 12) {
      cardiovascular +=
        n('heartRate') > 225 ? 4 :
        n('heartRate') >= 215 ? 3 : 0
    } else if (age <= 144) {
      cardiovascular +=
        n('heartRate') > 205 ? 4 :
        n('heartRate') >= 185 ? 3 : 0
    } else {
      cardiovascular +=
        n('heartRate') > 155 ? 4 :
        n('heartRate') >= 145 ? 3 : 0
    }

    cardiovascular +=
      n('temperature') < 33 || n('temperature') > 40 ? 3 : 0

    cardiovascular +=
      n('gcs') < 8 ? 5 : 0

    cardiovascular +=
      values.pupils === 'bothFixed' ? 11 :
      values.pupils === 'oneFixed' ? 7 : 0

    let acidBase = 0

    const pH = n('ph')
    const totalCO2 = n('totalCO2')

    acidBase +=
      pH < 7.0 || totalCO2 < 5 ? 6 :
      pH <= 7.28 || totalCO2 < 17 ? 2 : 0

    acidBase +=
      pH > 7.55 ? 3 :
      pH >= 7.48 ? 2 : 0

    acidBase +=
      n('pco2') > 75 ? 3 :
      n('pco2') >= 50 ? 1 : 0

    acidBase +=
      n('totalCO2') > 34 ? 4 : 0

    acidBase +=
      n('pao2') < 42 ? 6 :
      n('pao2') < 50 ? 3 : 0

    let chemistry = 0

    chemistry += n('glucose') > 200 ? 2 : 0
    chemistry += n('potassium') > 6.9 ? 3 : 0

    if (age < 1) {
      chemistry += n('creatinine') > 0.85 ? 2 : 0
      chemistry += n('bun') > 11.9 ? 3 : 0
    } else if (age <= 12) {
      chemistry += n('creatinine') > 0.90 ? 2 : 0
      chemistry += n('bun') > 14.9 ? 3 : 0
    } else if (age <= 144) {
      chemistry += n('creatinine') > 0.90 ? 2 : 0
      chemistry += n('bun') > 14.9 ? 3 : 0
    } else {
      chemistry += n('creatinine') > 1.30 ? 2 : 0
      chemistry += n('bun') > 14.9 ? 3 : 0
    }

    let hematology = 0

    hematology += n('wbc') < 3000 ? 4 : 0

    hematology +=
      n('platelets') < 50000 ? 5 :
      n('platelets') < 100000 ? 4 :
      n('platelets') <= 200000 ? 2 : 0

    const ptAbnormal =
      age < 1
        ? n('pt') > 22 || n('ptt') > 85
        : n('pt') > 22 || n('ptt') > 57

    hematology += ptAbnormal ? 3 : 0

    const total =
      cardiovascular +
      acidBase +
      chemistry +
      hematology

    return {
      value: total,
      displayValue: `${total}/74`,
      unit: 'points',
      category: `CV/Neuro ${cardiovascular} • Acid/Base ${acidBase} • Chemistry ${chemistry} • Hematology ${hematology}`,
      note: 'PRISM III uses the most abnormal physiologic values during the defined scoring period. PRISM III-12 and PRISM III-24 are distinct applications of the score. The score is primarily a population-level severity/risk-adjustment instrument; this implementation does not substitute the full proprietary mortality prediction model.'
    }
  },

  references: [
    'Pollack MM, Patel KM, Ruttimann UE. PRISM III: an updated Pediatric Risk of Mortality score. Crit Care Med. 1996;24:743–752.',
    'Pollack MM, Patel KM, Ruttimann UE. The Pediatric Risk of Mortality III—Acute Physiology Score. J Pediatr. 1997;131:575–581.'
  ]
}

export default prism
