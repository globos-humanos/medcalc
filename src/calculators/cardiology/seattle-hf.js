const seattleHf = {
  id: 'seattle-hf',
  name: 'Seattle Heart Failure Model',
  shortName: 'Seattle HF',
  type: 'calculation',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Seattle Heart Failure Model for estimated 1-, 2-, and 3-year survival.',
  keywords: ['Seattle Heart Failure Model', 'SHFM', 'heart failure', 'survival'],

  inputs: [
    {
      id: 'age',
      label: 'Age',
      unit: 'years',
      min: 18,
      max: 120
    },
    {
      id: 'male',
      label: 'Male sex',
      type: 'boolean'
    },
    {
      id: 'nyha',
      label: 'NYHA class',
      type: 'choice',
      options: [
        { value: 1, label: 'I' },
        { value: 2, label: 'II' },
        { value: 3, label: 'III' },
        { value: 4, label: 'IV' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'ef',
      label: 'Left ventricular ejection fraction',
      unit: '%',
      min: 1,
      max: 90,
      step: 1
    },
    {
      id: 'ischemic',
      label: 'Ischemic etiology',
      type: 'boolean'
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      unit: 'mmHg',
      min: 50,
      max: 250
    },
    {
      id: 'loopDiuretic',
      label: 'Loop diuretic dose',
      unit: 'mg/day furosemide equivalent',
      min: 0,
      max: 1000,
      step: 1
    },
    {
      id: 'weight',
      label: 'Body weight',
      unit: 'kg',
      min: 20,
      max: 250,
      step: 0.1
    },
    {
      id: 'allopurinol',
      label: 'Allopurinol use',
      type: 'boolean'
    },
    {
      id: 'statin',
      label: 'Statin use',
      type: 'boolean'
    },
    {
      id: 'sodium',
      label: 'Serum sodium',
      unit: 'mEq/L',
      min: 100,
      max: 180,
      step: 0.1
    },
    {
      id: 'cholesterol',
      label: 'Total cholesterol',
      unit: 'mg/dL',
      min: 50,
      max: 500,
      step: 1
    },
    {
      id: 'hemoglobin',
      label: 'Hemoglobin',
      unit: 'g/dL',
      min: 5,
      max: 25,
      step: 0.1
    },
    {
      id: 'lymphocytes',
      label: 'Lymphocytes',
      unit: '%',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'uricAcid',
      label: 'Uric acid',
      unit: 'mg/dL',
      min: 0,
      max: 30,
      step: 0.1
    },

    {
      id: 'acei',
      label: 'ACE inhibitor use',
      type: 'boolean'
    },
    {
      id: 'betaBlocker',
      label: 'Beta-blocker use',
      type: 'boolean'
    },
    {
      id: 'arb',
      label: 'ARB use',
      type: 'boolean'
    },
    {
      id: 'kSparing',
      label: 'Potassium-sparing diuretic use',
      type: 'boolean'
    },

    {
      id: 'device',
      label: 'Device therapy',
      type: 'choice',
      options: [
        { value: 'none', label: 'None' },
        { value: 'icd', label: 'ICD' },
        { value: 'biv', label: 'Biventricular pacemaker' },
        { value: 'bivIcd', label: 'Biventricular ICD' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const numeric = [
      'age',
      'nyha',
      'ef',
      'sbp',
      'loopDiuretic',
      'weight',
      'sodium',
      'cholesterol',
      'hemoglobin',
      'lymphocytes',
      'uricAcid'
    ]

    const booleans = [
      'male',
      'ischemic',
      'allopurinol',
      'statin',
      'acei',
      'betaBlocker',
      'arb',
      'kSparing'
    ]

    if (
      numeric.some(id => !Number.isFinite(Number(v[id]))) ||
      booleans.some(id => typeof v[id] !== 'boolean') ||
      !v.device
    ) {
      return {
        error: 'Please complete all Seattle Heart Failure Model inputs.'
      }
    }

    const age = Number(v.age)
    const nyha = Number(v.nyha)
    const ef = Number(v.ef)
    const sbp = Number(v.sbp)
    const weight = Number(v.weight)
    const loopDose = Number(v.loopDiuretic)
    const sodium = Number(v.sodium)
    const cholesterol = Number(v.cholesterol)
    const hb = Number(v.hemoglobin)
    const lymph = Number(v.lymphocytes)
    const uric = Number(v.uricAcid)

    if (ef <= 0 || cholesterol <= 0 || weight <= 0) {
      return {
        error: 'Ejection fraction, cholesterol and weight must be greater than zero.'
      }
    }

    let score = 0

    score += (age / 10) * Math.log(1.090)

    if (v.male) {
      score += Math.log(1.089)
    }

    score += nyha * Math.log(1.600)

    score += (100 / ef) * Math.log(1.030)

    if (v.ischemic) {
      score += Math.log(1.354)
    }

    score +=
      (Math.min(sbp, 160) / 10) *
      Math.log(0.877)

    const diureticMgKgDay =
      loopDose / weight

    score +=
      diureticMgKgDay *
      Math.log(1.178)

    if (v.allopurinol) {
      score += Math.log(1.571)
    }

    if (sodium < 138) {
      score +=
        (138 - sodium) *
        Math.log(1.050)
    }

    score +=
      (100 / cholesterol) *
      Math.log(2.206)

    if (hb < 16) {
      score +=
        (16 - hb) *
        Math.log(1.124)
    } else if (hb > 16) {
      score +=
        (hb - 16) *
        Math.log(1.336)
    }

    score +=
      (Math.min(lymph, 47) / 5) *
      Math.log(0.897)

    score +=
      Math.max(uric, 3.4) *
      Math.log(1.064)

    if (v.acei) score += Math.log(0.77)
    if (v.betaBlocker) score += Math.log(0.66)
    if (v.arb) score += Math.log(0.85)
    if (v.kSparing) score += Math.log(0.74)
    if (v.statin) score += Math.log(0.63)

    if (v.device === 'icd') {
      score += Math.log(0.73)
    } else if (v.device === 'biv') {
      score += Math.log(1.00)
    } else if (v.device === 'bivIcd') {
      score += Math.log(0.79)
    }

    const survival = years =>
      Math.pow(
        Math.exp(-0.0405 * years),
        Math.exp(score)
      )

    const oneYear = survival(1) * 100
    const twoYear = survival(2) * 100
    const threeYear = survival(3) * 100

    return {
      value: score,
      displayValue: `1-year ${oneYear.toFixed(1)}%`,
      unit: 'estimated survival',
      category:
        `2-year ${twoYear.toFixed(1)}% • 3-year ${threeYear.toFixed(1)}%`,
      note: `SHFM score ${score.toFixed(3)}. The model estimates population-level survival from clinical, laboratory, medication and device variables; it is not an individual guarantee of survival.`
    }
  },

  references: [
    'Levy WC, et al. The Seattle Heart Failure Model: prediction of survival in heart failure. Circulation. 2006;113:1424–1433.',
    'University of Washington Seattle Heart Failure Model.'
  ]
}

export default seattleHf
