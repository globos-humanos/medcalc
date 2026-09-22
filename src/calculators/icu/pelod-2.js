const pelod2 = {
  id: 'pelod2',
  name: 'PELOD-2',
  shortName: 'PELOD-2',
  type: 'score',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Pediatric Logistic Organ Dysfunction-2 score across five organ systems.',
  keywords: ['PELOD-2', 'PELOD', 'PICU', 'organ dysfunction'],
  aliases: ['PELOD 2'],

  inputs: [
    {
      id: 'ageMonths',
      label: 'Age',
      unit: 'months',
      min: 0,
      max: 228
    },
    {
      id: 'gcs',
      label: 'Glasgow Coma Scale',
      min: 3,
      max: 15
    },
    {
      id: 'pupils',
      label: 'Pupillary reaction',
      type: 'choice',
      options: [
        { value: 'reactive', label: 'Both reactive' },
        { value: 'fixed', label: 'Both fixed' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'lactate',
      label: 'Lactate',
      unit: 'mmol/L',
      min: 0,
      max: 30,
      step: 0.1
    },
    {
      id: 'map',
      label: 'Mean arterial pressure',
      unit: 'mmHg',
      min: 0,
      max: 200,
      step: 1
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
      id: 'paco2',
      label: 'PaCO₂',
      unit: 'mmHg',
      min: 0,
      max: 150,
      step: 1
    },
    {
      id: 'invasiveVent',
      label: 'Invasive mechanical ventilation?',
      type: 'boolean'
    },
    {
      id: 'wbc',
      label: 'WBC',
      unit: '×10⁹/L',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'platelets',
      label: 'Platelets',
      unit: '×10⁹/L',
      min: 0,
      max: 1000,
      step: 1
    }
  ],

  calculate(values) {
    const n = id => Number(values[id])

    const required = [
      'ageMonths',
      'gcs',
      'lactate',
      'map',
      'creatinine',
      'pao2',
      'fio2',
      'paco2',
      'wbc',
      'platelets'
    ]

    if (
      required.some(id => !Number.isFinite(n(id))) ||
      !values.pupils ||
      values.invasiveVent === undefined
    ) {
      return {
        error: 'Please complete all PELOD-2 variables.'
      }
    }

    const age = n('ageMonths')

    // Neurologic: take the highest score of GCS or pupils.
    const neurologicGcs =
      n('gcs') <= 4 ? 4 :
      n('gcs') <= 10 ? 1 : 0

    const neurologicPupils =
      values.pupils === 'fixed' ? 5 : 0

    const neurologic =
      Math.max(neurologicGcs, neurologicPupils)

    // Cardiovascular: take the highest score of lactate or MAP.
    const lactateScore =
      n('lactate') >= 11 ? 4 :
      n('lactate') >= 5 ? 1 : 0

    let mapScore = 0

    if (age < 1) {
      mapScore =
        n('map') <= 16 ? 6 :
        n('map') <= 30 ? 3 :
        n('map') <= 45 ? 2 : 0
    } else if (age < 12) {
      mapScore =
        n('map') <= 24 ? 6 :
        n('map') <= 38 ? 3 :
        n('map') <= 54 ? 2 : 0
    } else if (age < 24) {
      mapScore =
        n('map') <= 30 ? 6 :
        n('map') <= 43 ? 3 :
        n('map') <= 59 ? 2 : 0
    } else if (age < 60) {
      mapScore =
        n('map') <= 31 ? 6 :
        n('map') <= 44 ? 3 :
        n('map') <= 61 ? 2 : 0
    } else if (age < 144) {
      mapScore =
        n('map') <= 35 ? 6 :
        n('map') <= 48 ? 3 :
        n('map') <= 64 ? 2 : 0
    } else {
      mapScore =
        n('map') <= 37 ? 6 :
        n('map') <= 51 ? 3 :
        n('map') <= 66 ? 2 : 0
    }

    const cardiovascular =
      Math.max(lactateScore, mapScore)

    // Renal.
    let creatinineThreshold = 0

    if (age < 1) creatinineThreshold = 69 / 88.42
    else if (age < 12) creatinineThreshold = 22 / 88.42
    else if (age < 24) creatinineThreshold = 34 / 88.42
    else if (age < 60) creatinineThreshold = 50 / 88.42
    else if (age < 144) creatinineThreshold = 58 / 88.42
    else creatinineThreshold = 92 / 88.42

    const renal =
      n('creatinine') >= creatinineThreshold ? 2 : 0

    // Respiratory: highest score of PaO2/FiO2, PaCO2 or invasive ventilation.
    const pfRatio =
      n('pao2') / (n('fio2') / 100)

    const oxygenScore =
      pfRatio <= 60 ? 2 : 0

    const co2Score =
      n('paco2') >= 95 ? 3 :
      n('paco2') >= 59 ? 1 : 0

    const ventilationScore =
      values.invasiveVent ? 3 : 0

    const respiratory =
      Math.max(
        oxygenScore,
        co2Score,
        ventilationScore
      )

    // Hematologic: highest score of WBC or platelets.
    const wbcScore =
      n('wbc') <= 2 ? 2 : 0

    const plateletScore =
      n('platelets') <= 76 ? 2 :
      n('platelets') <= 141 ? 1 : 0

    const hematologic =
      Math.max(wbcScore, plateletScore)

    const total =
      neurologic +
      cardiovascular +
      renal +
      respiratory +
      hematologic

    const logit =
      -6.61 + (0.47 * total)

    const probability =
      1 / (1 + Math.exp(-logit))

    return {
      value: total,
      displayValue: `${total}/33`,
      unit: 'points',
      category:
        `Neuro ${neurologic} • CV ${cardiovascular} • Renal ${renal} • Resp ${respiratory} • Heme ${hematologic}`,
      note:
        `Model-estimated mortality: ${(probability * 100).toFixed(1)}%. PELOD-2 takes the highest component score within each organ system before summing the five organ-system scores.`
    }
  },

  references: [
    'Leteurtre S, et al. PELOD-2: an update of the PEdiatric Logistic Organ Dysfunction score. Crit Care Med. 2013.',
    'PELOD-2 published scoring table and logistic mortality equation.'
  ]
}

export default pelod2
