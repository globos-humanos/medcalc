const calc = {
  id: 'apache-ii',
  name: 'APACHE II',
  shortName: 'APACHE II',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Acute Physiology and Chronic Health Evaluation II.',
  type: 'score',

  inputs: [
    { id: 'temp', label: 'Temperature', unit: '°C', min: 25, max: 45, step: 0.1 },
    { id: 'map', label: 'Mean arterial pressure', unit: 'mmHg', min: 20, max: 300 },
    { id: 'hr', label: 'Heart rate', unit: '/min', min: 20, max: 250 },
    { id: 'rr', label: 'Respiratory rate', unit: '/min', min: 0, max: 80 },

    {
      id: 'oxygenMode',
      label: 'Oxygenation assessment',
      type: 'choice',
      options: [
        { value: 'low', label: 'FiO₂ <0.50 — use PaO₂' },
        { value: 'high', label: 'FiO₂ ≥0.50 — use A–aDO₂' }
      ],
      optionsLayout: 'stack'
    },

    { id: 'pao2', label: 'PaO₂', unit: 'mmHg', min: 20, max: 800 },
    { id: 'aado2', label: 'A–aDO₂', unit: 'mmHg', min: 0, max: 700 },
    { id: 'arterialPh', label: 'Arterial pH', min: 6.5, max: 8, step: 0.01 },
    { id: 'na', label: 'Sodium', unit: 'mmol/L', min: 80, max: 220 },
    { id: 'k', label: 'Potassium', unit: 'mmol/L', min: 1, max: 15, step: 0.1 },
    { id: 'creatinine', label: 'Creatinine', unit: 'mg/dL', min: 0.1, max: 20, step: 0.1 },
    { id: 'acuteRenal', label: 'Acute renal failure?', type: 'boolean' },
    { id: 'hct', label: 'Hematocrit', unit: '%', min: 5, max: 70, step: 0.1 },
    { id: 'wbc', label: 'WBC', unit: '×10⁹/L', min: 0, max: 100, step: 0.1 },
    { id: 'gcs', label: 'GCS', min: 3, max: 15 },
    { id: 'age', label: 'Age', unit: 'years', min: 18, max: 120 }
  ],

  calculate(v) {
    const temp = Number(v.temp)
    const map = Number(v.map)
    const hr = Number(v.hr)
    const rr = Number(v.rr)
    const pao2 = Number(v.pao2)
    const aado2 = Number(v.aado2)
    const ph = Number(v.arterialPh)
    const na = Number(v.na)
    const k = Number(v.k)
    const cr = Number(v.creatinine)
    const hct = Number(v.hct)
    const wbc = Number(v.wbc)
    const gcs = Number(v.gcs)
    const age = Number(v.age)

    if (gcs < 3 || gcs > 15 || age < 0) {
      return { error: 'Please enter valid GCS and age values.' }
    }

    const required = [
      temp, map, hr, rr, ph, na, k,
      cr, hct, wbc, gcs, age
    ]

    if (
      required.some(value => !Number.isFinite(value)) ||
      !v.oxygenMode
    ) {
      return {
        error: 'Please complete all APACHE II inputs.'
      }
    }

    if (
      v.oxygenMode === 'low' &&
      !Number.isFinite(pao2)
    ) {
      return {
        error: 'Please enter PaO₂ for FiO₂ <0.50.'
      }
    }

    if (
      v.oxygenMode === 'high' &&
      !Number.isFinite(aado2)
    ) {
      return {
        error: 'Please enter A–aDO₂ for FiO₂ ≥0.50.'
      }
    }

    const temperatureScore =
      temp >= 41 ? 4 :
      temp >= 39 ? 3 :
      temp >= 38.5 ? 1 :
      temp >= 36 ? 0 :
      temp >= 34 ? 1 :
      temp >= 32 ? 2 :
      temp >= 30 ? 3 : 4

    const mapScore =
      map >= 160 ? 4 :
      map >= 130 ? 3 :
      map >= 110 ? 2 :
      map >= 70 ? 0 :
      map >= 50 ? 2 : 4

    const heartRateScore =
      hr >= 180 ? 4 :
      hr >= 140 ? 3 :
      hr >= 110 ? 2 :
      hr >= 70 ? 0 :
      hr >= 55 ? 2 :
      hr >= 40 ? 3 : 4

    const respiratoryScore =
      rr >= 50 ? 4 :
      rr >= 35 ? 3 :
      rr >= 25 ? 1 :
      rr >= 12 ? 0 :
      rr >= 10 ? 1 :
      rr >= 6 ? 2 : 4

    const oxygenationScore =
      v.oxygenMode === 'high'
        ? (
            aado2 >= 500 ? 3 :
            aado2 >= 350 ? 2 :
            aado2 >= 200 ? 1 : 0
          )
        : (
            pao2 > 70 ? 0 :
            pao2 >= 61 ? 1 :
            pao2 >= 55 ? 3 : 4
          )

    const phScore =
      ph >= 7.7 ? 4 :
      ph >= 7.6 ? 3 :
      ph >= 7.5 ? 1 :
      ph >= 7.33 ? 0 :
      ph >= 7.25 ? 2 :
      ph >= 7.15 ? 3 : 4

    const sodiumScore =
      na >= 180 ? 4 :
      na >= 160 ? 3 :
      na >= 155 ? 1 :
      na >= 150 ? 1 :
      na >= 130 ? 0 :
      na >= 120 ? 2 :
      na >= 111 ? 3 : 4

    const potassiumScore =
      k >= 7 ? 4 :
      k >= 6 ? 3 :
      k >= 5.5 ? 1 :
      k >= 3.5 ? 0 :
      k >= 3 ? 1 :
      k >= 2.5 ? 2 : 4

    let creatinineScore =
      cr >= 3.5 ? 4 :
      cr >= 2 ? 3 :
      cr >= 1.5 ? 2 :
      cr >= 0.6 ? 0 : 2

    if (v.acuteRenal) {
      creatinineScore *= 2
    }

    const hematocritScore =
      hct >= 60 ? 4 :
      hct >= 50 ? 2 :
      hct >= 46 ? 1 :
      hct >= 30 ? 0 :
      hct >= 20 ? 2 : 4

    const wbcScore =
      wbc >= 40 ? 4 :
      wbc >= 20 ? 1 :
      wbc >= 15 ? 1 :
      wbc >= 3 ? 0 :
      wbc >= 1 ? 2 : 4

    const neurologicScore = 15 - gcs

    const ageScore =
      age >= 75 ? 6 :
      age >= 65 ? 5 :
      age >= 55 ? 3 :
      age >= 45 ? 2 : 0

    const total =
      temperatureScore +
      mapScore +
      heartRateScore +
      respiratoryScore +
      oxygenationScore +
      phScore +
      sodiumScore +
      potassiumScore +
      creatinineScore +
      hematocritScore +
      wbcScore +
      neurologicScore +
      ageScore

    let category

    if (total < 10) {
      category = 'Lower APACHE II score'
    } else if (total < 20) {
      category = 'Moderate APACHE II score'
    } else if (total < 30) {
      category = 'High APACHE II score'
    } else {
      category = 'Very high APACHE II score'
    }

    return {
      value: total,
      displayValue: `${total}/71`,
      unit: 'points',
      category,
      interpretation: 'Higher APACHE II scores are associated with greater severity of illness.',
      note: 'Use the worst values recorded during the defined scoring period. APACHE II is a severity/mortality prediction model and should not be used alone to direct individual patient management.'
    }
  }
}

export default calc

