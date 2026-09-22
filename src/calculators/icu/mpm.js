const calc = {
  id: 'mpm',
  name: 'MPM₀-III Recalibrated',
  shortName: 'MPM',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Published recalibrated MPM₀-III admission mortality model.',
  type: 'score',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      unit: 'years',
      min: 18,
      max: 120
    },
    {
      id: 'hr150',
      label: 'Heart rate ≥150/min?',
      type: 'boolean'
    },
    {
      id: 'sbp90',
      label: 'Systolic BP ≤90 mmHg?',
      type: 'boolean'
    },
    {
      id: 'ckd',
      label: 'Chronic kidney disease?',
      type: 'boolean'
    },
    {
      id: 'cirrhosis',
      label: 'Cirrhosis?',
      type: 'boolean'
    },
    {
      id: 'coma',
      label: 'Coma?',
      type: 'boolean'
    },
    {
      id: 'metastatic',
      label: 'Metastatic disease?',
      type: 'boolean'
    },
    {
      id: 'acuteRenal',
      label: 'Acute renal failure?',
      type: 'boolean'
    },
    {
      id: 'arrhythmia',
      label: 'Cardiac arrhythmia?',
      type: 'boolean'
    },
    {
      id: 'cva',
      label: 'Cerebrovascular accident?',
      type: 'boolean'
    },
    {
      id: 'giBleed',
      label: 'Gastrointestinal bleeding?',
      type: 'boolean'
    },
    {
      id: 'massEffect',
      label: 'Intracranial mass effect?',
      type: 'boolean'
    },
    {
      id: 'cpr',
      label: 'CPR before / at ICU admission?',
      type: 'boolean'
    },
    {
      id: 'mechanicalVent',
      label: 'Mechanical ventilation on admission?',
      type: 'boolean'
    },
    {
      id: 'unscheduledSurgery',
      label: 'Unscheduled surgical admission?',
      type: 'boolean'
    },
    {
      id: 'fullCode',
      label: 'Full-code resuscitation status on admission?',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const age = Number(v.age)

    if (!Number.isFinite(age)) {
      return {
        error: 'Please enter age.'
      }
    }

    const flags = [
      'hr150',
      'sbp90',
      'ckd',
      'cirrhosis',
      'coma',
      'metastatic',
      'acuteRenal',
      'arrhythmia',
      'cva',
      'giBleed',
      'massEffect',
      'cpr',
      'mechanicalVent',
      'unscheduledSurgery',
      'fullCode'
    ]

    if (flags.some(id => v[id] === undefined)) {
      return {
        error: 'Please complete all MPM admission variables.'
      }
    }

    const factors = flags.some(id => v[id] === true) ? 1 : 0

    let logit = -1.8634

    if (v.hr150) logit += 0.6763
    if (v.sbp90) logit += 1.5334
    if (v.ckd) logit += 0.8373
    if (v.cirrhosis) logit += 2.3597
    if (v.coma) logit += 0.6474
    if (v.metastatic) logit += 2.0330
    if (v.acuteRenal) logit += 0.8292
    if (v.arrhythmia) logit -= 0.3288
    if (v.cva) logit += 0.5764
    if (v.giBleed) logit -= 0.3337
    if (v.massEffect) logit += 0.5495
    if (v.cpr) logit += 1.9340
    if (v.mechanicalVent) logit += 0.7626
    if (v.unscheduledSurgery) logit += 1.0217
    if (v.fullCode) logit -= 1.1100

    logit += 0.3372 * age

    if (v.coma) logit += 0.1117 * age
    if (v.sbp90) logit -= 0.0740 * age
    if (v.cirrhosis) logit -= 0.1531 * age
    if (v.metastatic) logit -= 0.1454 * age
    if (v.arrhythmia) logit -= 0.0218 * age
    if (v.massEffect) logit -= 0.0044 * age
    if (v.cpr) logit -= 0.1040 * age

    if (!factors) {
      logit -= 0.0123
    }

    const probability =
      100 * Math.exp(logit) / (1 + Math.exp(logit))

    return {
      value: probability,
      displayValue: `${probability.toFixed(1)}%`,
      unit: 'hospital mortality probability',
      category: 'MPM₀-III recalibrated estimate',
      interpretation: `Model-estimated hospital mortality: ${probability.toFixed(1)}%.`,
      note: 'This is the published recalibrated MPM₀-III model. It is a population-derived prognostic model and should not be interpreted as an individual clinical prediction.'
    }
  },

  references: [
    'Higgins TL, et al. Crit Care Med. 2007;35:827–835.',
    'Vasilevskis EE, et al. Med Care. 2009;47:711–718.'
  ]
}

export default calc
