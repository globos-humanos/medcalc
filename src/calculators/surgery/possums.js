const calc = {
  id: 'possum',
  name: 'POSSUM',
  shortName: 'POSSUM',
  categoryId: 'surgery',
  description: 'Physiological and Operative Severity Score for the enUmeration of Mortality and morbidity.',
  type: 'score',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'choice',
      options: [
        { value: 1, label: '≤60 years' },
        { value: 2, label: '61–70 years' },
        { value: 4, label: '≥71 years' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'cardiac',
      label: 'Cardiac status',
      type: 'choice',
      options: [
        { value: 1, label: 'No cardiac failure' },
        { value: 2, label: 'Drug therapy for cardiac disease / hypertension' },
        { value: 4, label: 'Peripheral edema / warfarin / borderline cardiomegaly' },
        { value: 8, label: 'Raised JVP / cardiomegaly' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'respiratory',
      label: 'Respiratory status',
      type: 'choice',
      options: [
        { value: 1, label: 'No dyspnea / normal chest radiograph' },
        { value: 2, label: 'Dyspnea on exertion / mild COPD' },
        { value: 4, label: 'Limiting dyspnea / moderate COPD' },
        { value: 8, label: 'Dyspnea at rest / fibrosis / consolidation' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      type: 'number',
      unit: 'mmHg',
      min: 40,
      max: 250,
      step: 1
    },
    {
      id: 'pulse',
      label: 'Pulse',
      type: 'number',
      unit: '/min',
      min: 20,
      max: 250,
      step: 1
    },
    {
      id: 'gcs',
      label: 'Glasgow Coma Scale',
      type: 'number',
      min: 3,
      max: 15,
      step: 1
    },
    {
      id: 'hb',
      label: 'Hemoglobin',
      type: 'number',
      unit: 'g/dL',
      min: 3,
      max: 25,
      step: 0.1
    },
    {
      id: 'wbc',
      label: 'White cell count',
      type: 'number',
      unit: '×10⁹/L',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'urea',
      label: 'Urea',
      type: 'number',
      unit: 'mmol/L',
      min: 0,
      max: 50,
      step: 0.1
    },
    {
      id: 'sodium',
      label: 'Sodium',
      type: 'number',
      unit: 'mmol/L',
      min: 90,
      max: 180,
      step: 1
    },
    {
      id: 'potassium',
      label: 'Potassium',
      type: 'number',
      unit: 'mmol/L',
      min: 1,
      max: 10,
      step: 0.1
    },
    {
      id: 'ecg',
      label: 'ECG',
      type: 'choice',
      options: [
        { value: 1, label: 'Normal' },
        { value: 4, label: 'Atrial fibrillation' },
        { value: 8, label: 'Other significant abnormality / Q waves / ST-T changes / frequent ectopics' }
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
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'bloodLoss',
      label: 'Total blood loss',
      type: 'choice',
      options: [
        { value: 1, label: '≤100 mL' },
        { value: 2, label: '101–500 mL' },
        { value: 4, label: '501–999 mL' },
        { value: 8, label: '≥1000 mL' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'soiling',
      label: 'Peritoneal soiling',
      type: 'choice',
      options: [
        { value: 1, label: 'None' },
        { value: 2, label: 'Minor / serous fluid' },
        { value: 4, label: 'Local pus' },
        { value: 8, label: 'Free bowel content / pus / blood' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'malignancy',
      label: 'Malignancy',
      type: 'choice',
      options: [
        { value: 1, label: 'None' },
        { value: 2, label: 'Primary lesion only' },
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
        { value: 4, label: 'Emergency / operation within 24 hours after admission' },
        { value: 8, label: 'Immediate emergency surgery' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const sbp = Number(v.sbp)
    const pulse = Number(v.pulse)
    const gcs = Number(v.gcs)
    const hb = Number(v.hb)
    const wbc = Number(v.wbc)
    const urea = Number(v.urea)
    const sodium = Number(v.sodium)
    const potassium = Number(v.potassium)

    if (![sbp,pulse,gcs,hb,wbc,urea,sodium,potassium].every(Number.isFinite)) {
      return { error: 'Complete all physiological measurements.' }
    }

    const sbpPts = sbp >= 110 && sbp <= 130 ? 1 : sbp >= 100 && sbp <= 109 || sbp >= 131 && sbp <= 170 ? 2 : sbp >= 90 && sbp <= 99 || sbp >= 171 ? 4 : 8
    const pulsePts = pulse >= 50 && pulse <= 80 ? 1 : pulse >= 40 && pulse <= 49 || pulse >= 81 && pulse <= 100 ? 2 : pulse <= 39 || pulse >= 121 ? 8 : 4
    const gcsPts = gcs === 15 ? 1 : gcs >= 12 ? 2 : gcs >= 9 ? 4 : 8
    const hbPts = hb >= 13 && hb <= 16 ? 1 : (hb >= 11.5 && hb < 13) || (hb > 16 && hb <= 17) ? 2 : (hb >= 10 && hb < 11.5) || (hb > 17 && hb <= 18) ? 4 : 8
    const wbcPts = wbc >= 4 && wbc <= 10 ? 1 : (wbc > 10 && wbc <= 20) || (wbc >= 3 && wbc < 4) ? 2 : 4
    const ureaPts = urea <= 7.5 ? 1 : urea <= 10 ? 2 : urea <= 15 ? 4 : 8
    const sodiumPts = sodium >= 136 ? 1 : sodium >= 131 ? 2 : sodium >= 126 ? 4 : 8
    const potassiumPts =
      potassium >= 3.5 && potassium <= 5 ? 1 :
      (potassium >= 3.2 && potassium < 3.5) || (potassium > 5 && potassium <= 5.3) ? 2 :
      (potassium >= 2.9 && potassium < 3.2) || (potassium > 5.3 && potassium < 6) ? 4 : 8

    const ps =
      Number(v.age || 0) +
      Number(v.cardiac || 0) +
      Number(v.respiratory || 0) +
      sbpPts +
      pulsePts +
      gcsPts +
      hbPts +
      wbcPts +
      ureaPts +
      sodiumPts +
      potassiumPts +
      Number(v.ecg || 0)

    const os =
      Number(v.operativeSeverity || 0) +
      Number(v.procedures || 0) +
      Number(v.bloodLoss || 0) +
      Number(v.soiling || 0) +
      Number(v.malignancy || 0) +
      Number(v.mode || 0)

    const morbidityLogit = -5.91 + (0.16 * ps) + (0.19 * os)
    const mortalityLogit = -7.04 + (0.13 * ps) + (0.16 * os)

    const morbidity = 100 * Math.exp(morbidityLogit) / (1 + Math.exp(morbidityLogit))
    const mortality = 100 * Math.exp(mortalityLogit) / (1 + Math.exp(mortalityLogit))

    return {
      value: ps + os,
      unit: `PS ${ps} + OS ${os}`,
      interpretation: `Predicted morbidity ${morbidity.toFixed(1)}%; predicted mortality ${mortality.toFixed(1)}%`,
      note: 'POSSUM combines a physiological score and operative severity score. Results are model estimates and are affected by surgical population and case mix.'
    }
  }
}

export default calc
