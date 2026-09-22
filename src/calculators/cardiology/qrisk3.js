import qrisk from 'sisuwellness-qrisk3'

const qrisk3 = {
  id: 'qrisk3',
  name: 'QRISK3 — 10-Year CVD Risk',
  shortName: 'QRISK3',
  type: 'calculation',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'QRISK3-2017 10-year cardiovascular disease risk prediction model for the UK population.',
  keywords: ['QRISK3', 'CVD risk', 'cardiovascular risk', 'stroke', 'heart attack'],

  inputs: [
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'age',
      label: 'Age',
      unit: 'years',
      min: 25,
      max: 84
    },
    {
      id: 'ethnicity',
      label: 'Ethnic group',
      type: 'choice',
      options: [
        { value: 0, label: 'White / not stated' },
        { value: 1, label: 'White' },
        { value: 2, label: 'Indian' },
        { value: 3, label: 'Pakistani' },
        { value: 4, label: 'Bangladeshi' },
        { value: 5, label: 'Other Asian' },
        { value: 6, label: 'Black Caribbean' },
        { value: 7, label: 'Black African' },
        { value: 8, label: 'Chinese' },
        { value: 9, label: 'Other ethnic group' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'bmi',
      label: 'BMI',
      unit: 'kg/m²',
      min: 10,
      max: 70,
      step: 0.1
    },
    {
      id: 'cholHdl',
      label: 'Total cholesterol / HDL ratio',
      min: 1,
      max: 15,
      step: 0.1
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      unit: 'mmHg',
      min: 70,
      max: 250
    },
    {
      id: 'sbpSd',
      label: 'Standard deviation of repeated systolic BP readings',
      unit: 'mmHg',
      min: 0,
      max: 50,
      step: 0.1
    },
    {
      id: 'townsend',
      label: 'Townsend deprivation score',
      min: -10,
      max: 20,
      step: 0.1
    },
    {
      id: 'smoking',
      label: 'Smoking status',
      type: 'choice',
      options: [
        { value: 0, label: 'Non-smoker' },
        { value: 1, label: 'Ex-smoker' },
        { value: 2, label: 'Light smoker — 1–9 cigarettes/day' },
        { value: 3, label: 'Moderate smoker — 10–19/day' },
        { value: 4, label: 'Heavy smoker — ≥20/day' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'diabetes',
      label: 'Diabetes',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Type 1' },
        { value: 2, label: 'Type 2' }
      ],
      optionsLayout: 'stack'
    },

    { id: 'af', label: 'Atrial fibrillation', type: 'boolean' },
    { id: 'atypicalAntipsychotic', label: 'Atypical antipsychotic use', type: 'boolean' },
    { id: 'steroids', label: 'Regular corticosteroid tablets', type: 'boolean' },
    { id: 'erectileDysfunction', label: 'Erectile dysfunction diagnosis/treatment', type: 'boolean' },
    { id: 'migraine', label: 'Migraine', type: 'boolean' },
    { id: 'ra', label: 'Rheumatoid arthritis', type: 'boolean' },
    { id: 'ckd', label: 'Chronic kidney disease stage 3–5 / major renal disease', type: 'boolean' },
    { id: 'severeMentalIllness', label: 'Severe mental illness', type: 'boolean' },
    { id: 'sle', label: 'Systemic lupus erythematosus', type: 'boolean' },
    { id: 'treatedHypertension', label: 'Treated hypertension', type: 'boolean' },
    { id: 'familyHistory', label: 'First-degree relative with angina/MI before age 60', type: 'boolean' }
  ],

  calculate(v) {
    const numeric = [
      'age',
      'ethnicity',
      'bmi',
      'cholHdl',
      'sbp',
      'sbpSd',
      'townsend',
      'smoking',
      'diabetes'
    ]

    const booleanIds = [
      'af',
      'atypicalAntipsychotic',
      'steroids',
      'erectileDysfunction',
      'migraine',
      'ra',
      'ckd',
      'severeMentalIllness',
      'sle',
      'treatedHypertension',
      'familyHistory'
    ]

    if (
      !numeric.every(id => Number.isFinite(Number(v[id]))) ||
      !booleanIds.every(id => typeof v[id] === 'boolean') ||
      !v.sex
    ) {
      return {
        error: 'Please complete all QRISK3 variables.'
      }
    }

    const qriskInput = {
      sex: v.sex,
      age: Number(v.age),

      atrialFibrillation: v.af,
      onAtypicalAntipsychoticsMedication: v.atypicalAntipsychotic,
      onRegularSteroidTablets: v.steroids,
      diagnosisOrTreatmentOfErectileDisfunction: v.erectileDysfunction,
      migraine: v.migraine,
      rheumatoidArthritis: v.ra,
      chronicKidneyDiseaseStage345: v.ckd,
      severeMentalIllness: v.severeMentalIllness,
      systemicLupusErythematosus: v.sle,
      bloodPressureTreatment: v.treatedHypertension,

      diabetesType1: Number(v.diabetes) === 1,
      diabetesType2: Number(v.diabetes) === 2,

      bmi: Number(v.bmi),
      ethnicity: Number(v.ethnicity),
      familyAnginaOrHeartAttack: v.familyHistory,
      cholesterolHdlRatio: Number(v.cholHdl),
      systolicBloodPressure: Number(v.sbp),
      systolicStandardDeviation: Number(v.sbpSd),
      smokerStatus: Number(v.smoking),
      townsendScore: Number(v.townsend)
    }

    const score = Number(qrisk.calculateScore(qriskInput))

    if (!Number.isFinite(score)) {
      return {
        error: 'QRISK3 could not calculate a valid result from these inputs.'
      }
    }

    return {
      value: score,
      displayValue: `${score.toFixed(1)}%`,
      unit: '10-year CVD risk',
      category: 'QRISK3-2017',
      note: 'QRISK3 estimates 10-year cardiovascular disease risk in the UK population. It is not directly interchangeable with ASCVD or Framingham risk equations.'
    }
  },

  references: [
    'Hippisley-Cox J, et al. Development and validation of QRISK3 risk prediction algorithms. BMJ. 2017;357:j2099.',
    'ClinRisk Ltd. QRISK3-2017 source algorithm.',
    'Sisu Health Group QRISK3 JavaScript implementation.'
  ]
}

export default qrisk3
