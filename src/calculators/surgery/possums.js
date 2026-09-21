const calc = {
  id: 'possums',
  name: 'POSSUM',
  shortName: 'POSSUM',
  categoryId: 'surgery',
  description: 'Physiological and Operative Severity Score for the Enumeration of Mortality and Morbidity.',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      unit: 'years',
      min: 0,
      max: 120,
      step: 1
    },
    {
      id: 'cardiac',
      label: 'Cardiac status',
      type: 'choice',
      options: [
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Cardiac drugs / steroids' },
        { value: 4, label: 'Peripheral edema / warfarin' },
        { value: 8, label: 'Raised JVP / cardiomegaly' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'respiratory',
      label: 'Respiratory status',
      type: 'choice',
      options: [
        { value: 1, label: 'Normal' },
        { value: 2, label: 'Dyspnea on exertion / mild COPD' },
        { value: 4, label: 'Limiting dyspnea / moderate COPD' },
        { value: 8, label: 'Dyspnea at rest / fibrosis or consolidation' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'sbp',
      label: 'Systolic BP',
      type: 'number',
      unit: 'mmHg',
      step: 1
    },
    {
      id: 'pulse',
      label: 'Pulse',
      type: 'number',
      unit: 'beats/min',
      step: 1
    },
    {
      id: 'gcs',
      label: 'GCS',
      type: 'number',
      min: 3,
      max: 15,
      step: 1
    },
    {
      id: 'hemoglobin',
      label: 'Hemoglobin',
      type: 'number',
      unit: 'g/dL',
      step: 0.1
    },
    {
      id: 'wbc',
      label: 'White cell count',
      type: 'number',
      unit: '×10³/µL',
      step: 0.1
    },
    {
      id: 'urea',
      label: 'Urea',
      type: 'number',
      unit: 'mmol/L',
      step: 0.1
    },
    {
      id: 'sodium',
      label: 'Sodium',
      type: 'number',
      unit: 'mmol/L',
      step: 1
    },
    {
      id: 'potassium',
      label: 'Potassium',
      type: 'number',
      unit: 'mmol/L',
      step: 0.1
    },
    {
      id: 'ecg',
      label: 'ECG',
      type: 'choice',
      options: [
        { value: 1, label: 'Normal' },
        { value: 4, label: 'Atrial fibrillation (60–90/min)' },
        { value: 8, label: 'Other abnormality / ectopics / Q waves / ST-T changes' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'operativeSeverity',
      label: 'Operative severity',
      type: 'choice',
      options: [
        { value: 1, label: 'Minor' },
        { value: 2, label: 'Moderate' },
        { value: 4, label: 'Major' },
        { value: 8, label: 'Major+' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'procedures',
      label: 'Number of procedures',
      type: 'choice',
      options: [
        { value: 1, label: '1' },
        { value: 4, label: '2' },
        { value: 8, label: '>2' }
      ]
    },
    {
      id: 'bloodLoss',
      label: 'Total blood loss',
      type: 'number',
      unit: 'mL',
      min: 0,
      step: 1
    },
    {
      id: 'soiling',
      label: 'Peritoneal soiling',
      type: 'choice',
      options: [
        { value: 1, label: 'None' },
        { value: 2, label: 'Minor / serous fluid' },
        { value: 4, label: 'Local pus' },
        { value: 8, label: 'Free bowel content, pus or blood' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'malignancy',
      label: 'Malignancy',
      type: 'choice',
      options: [
        { value: 1, label: 'None' },
        { value: 2, label: 'Primary only' },
        { value: 4, label: 'Nodal metastases' },
        { value: 8, label: 'Distant metastases' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'mode',
      label: 'Mode of surgery',
      type: 'choice',
      options: [
        { value: 1, label: 'Elective' },
        { value: 4, label: 'Emergency; >2 h resuscitation possible, surgery <24 h' },
        { value: 8, label: 'Emergency; immediate surgery <2 h required' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const age = Number(v.age)
    const sbp = Number(v.sbp)
    const pulse = Number(v.pulse)
    const gcs = Number(v.gcs)
    const hb = Number(v.hemoglobin)
    const wbc = Number(v.wbc)
    const urea = Number(v.urea)
    const sodium = Number(v.sodium)
    const potassium = Number(v.potassium)
    const bloodLoss = Number(v.bloodLoss)

    if (
      !Number.isFinite(age) ||
      !Number.isFinite(sbp) ||
      !Number.isFinite(pulse) ||
      !Number.isFinite(gcs) ||
      !Number.isFinite(hb) ||
      !Number.isFinite(wbc) ||
      !Number.isFinite(urea) ||
      !Number.isFinite(sodium) ||
      !Number.isFinite(potassium) ||
      !Number.isFinite(bloodLoss) ||
      v.cardiac === undefined ||
      v.respiratory === undefined ||
      v.ecg === undefined ||
      v.operativeSeverity === undefined ||
      v.procedures === undefined ||
      v.soiling === undefined ||
      v.malignancy === undefined ||
      v.mode === undefined
    ) {
      return {
        error: 'Please complete all POSSUM inputs.'
      }
    }

    let ps = 0

    if (age <= 60) ps += 1
    else if (age <= 70) ps += 2
    else ps += 4

    ps += Number(v.cardiac)
    ps += Number(v.respiratory)

    if (sbp >= 110 && sbp <= 130) ps += 1
    else if ((sbp >= 100 && sbp <= 109) || (sbp >= 131 && sbp <= 170)) ps += 2
    else if ((sbp >= 90 && sbp <= 99) || sbp >= 171) ps += 4
    else if (sbp < 90) ps += 8

    if (pulse >= 50 && pulse <= 80) ps += 1
    else if ((pulse >= 40 && pulse <= 49) || (pulse >= 81 && pulse <= 100)) ps += 2
    else if (pulse >= 101 && pulse <= 120) ps += 4
    else ps += 8

    if (gcs === 15) ps += 1
    else if (gcs >= 12) ps += 2
    else if (gcs >= 9) ps += 4
    else ps += 8

    if (hb >= 13 && hb <= 16) ps += 1
    else if ((hb >= 11.5 && hb < 13) || (hb > 16 && hb <= 17)) ps += 2
    else if ((hb >= 10 && hb < 11.5) || (hb > 17 && hb <= 18)) ps += 4
    else ps += 8

    if (wbc >= 4 && wbc <= 10) ps += 1
    else if ((wbc > 10 && wbc <= 20) || (wbc >= 3.1 && wbc < 4)) ps += 2
    else ps += 4

    if (urea <= 7.5) ps += 1
    else if (urea <= 10) ps += 2
    else if (urea <= 15) ps += 4
    else ps += 8

    if (sodium >= 136) ps += 1
    else if (sodium >= 131) ps += 2
    else if (sodium >= 126) ps += 4
    else ps += 8

    if (potassium >= 3.5 && potassium <= 5) ps += 1
    else if ((potassium >= 3.2 && potassium < 3.5) || (potassium > 5 && potassium <= 5.3)) ps += 2
    else if ((potassium >= 2.9 && potassium < 3.2) || (potassium > 5.3 && potassium < 6)) ps += 4
    else ps += 8

    ps += Number(v.ecg)

    let os = Number(v.operativeSeverity)
    os += Number(v.procedures)

    if (bloodLoss <= 100) os += 1
    else if (bloodLoss <= 500) os += 2
    else if (bloodLoss <= 999) os += 4
    else os += 8

    os += Number(v.soiling)
    os += Number(v.malignancy)
    os += Number(v.mode)

    const morbidityLogit =
      -5.91 +
      (0.16 * ps) +
      (0.19 * os)

    const mortalityLogit =
      -7.04 +
      (0.13 * ps) +
      (0.16 * os)

    const morbidity =
      100 *
      Math.exp(morbidityLogit) /
      (1 + Math.exp(morbidityLogit))

    const mortality =
      100 *
      Math.exp(mortalityLogit) /
      (1 + Math.exp(mortalityLogit))

    return {
      value: `Morbidity ${morbidity.toFixed(1)}% | Mortality ${mortality.toFixed(1)}%`,
      unit: `PS ${ps} / OS ${os}`,
      interpretation: 'POSSUM predicted risk',
      note: 'POSSUM uses 12 physiological and 6 operative variables. Predicted risks are estimates derived from the original logistic equations.'
    }
  },

  references: [
    'Copeland GP et al. POSSUM: a scoring system for surgical audit. Br J Surg. 1991.',
    'Prytherch DR et al. POSSUM and Portsmouth POSSUM for predicting mortality. Br J Surg. 1998.'
  ]
}

export default calc