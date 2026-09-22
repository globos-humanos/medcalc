const maggic = {
  id: 'maggic',
  name: 'MAGGIC Heart Failure Risk Score',
  shortName: 'MAGGIC',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: '13-variable MAGGIC score for mortality risk in heart failure.',
  keywords: ['MAGGIC', 'heart failure', 'mortality', 'prognosis'],

  inputs: [
    {
      id: 'age',
      label: 'Age',
      unit: 'years',
      min: 18,
      max: 120
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
      id: 'nyha',
      label: 'NYHA functional class',
      type: 'choice',
      options: [
        { value: 1, label: 'Class I' },
        { value: 2, label: 'Class II' },
        { value: 3, label: 'Class III' },
        { value: 4, label: 'Class IV' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'creatinine',
      label: 'Serum creatinine',
      unit: 'mg/dL',
      min: 0,
      max: 15,
      step: 0.01
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      unit: 'mmHg',
      min: 50,
      max: 300
    },
    {
      id: 'bmi',
      label: 'Body mass index',
      unit: 'kg/m²',
      min: 10,
      max: 80,
      step: 0.1
    },
    {
      id: 'male',
      label: 'Male sex',
      type: 'boolean'
    },
    {
      id: 'diabetes',
      label: 'Diabetes mellitus',
      type: 'boolean'
    },
    {
      id: 'copd',
      label: 'Chronic obstructive pulmonary disease',
      type: 'boolean'
    },
    {
      id: 'smoker',
      label: 'Current smoker',
      type: 'boolean'
    },
    {
      id: 'hfDuration',
      label: 'Heart failure diagnosed >18 months ago?',
      type: 'boolean'
    },
    {
      id: 'betaBlocker',
      label: 'Currently prescribed a beta-blocker',
      type: 'boolean'
    },
    {
      id: 'aceArb',
      label: 'Currently prescribed an ACE inhibitor / ARB',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const numeric = [
      'age',
      'ef',
      'nyha',
      'creatinine',
      'sbp',
      'bmi'
    ]

    if (
      numeric.some(id => !Number.isFinite(Number(v[id]))) ||
      ['male', 'diabetes', 'copd', 'smoker', 'hfDuration', 'betaBlocker', 'aceArb']
        .some(id => typeof v[id] !== 'boolean')
    ) {
      return {
        error: 'Please complete all MAGGIC variables.'
      }
    }

    const age = Number(v.age)
    const ef = Number(v.ef)
    const nyha = Number(v.nyha)
    const creatinineMg = Number(v.creatinine)
    const sbp = Number(v.sbp)
    const bmi = Number(v.bmi)

    const creatinineUmol = creatinineMg * 88.42

    const efPoints =
      ef < 20 ? 7 :
      ef < 25 ? 6 :
      ef < 30 ? 5 :
      ef < 35 ? 3 :
      ef < 40 ? 2 : 0

    let agePoints = 0

    if (age >= 55) {
      if (ef < 30) {
        agePoints =
          age < 60 ? 1 :
          age < 65 ? 2 :
          age < 70 ? 4 :
          age < 75 ? 6 :
          age < 80 ? 8 : 10
      } else if (ef < 40) {
        agePoints =
          age < 60 ? 2 :
          age < 65 ? 4 :
          age < 70 ? 6 :
          age < 75 ? 8 :
          age < 80 ? 10 : 13
      } else {
        agePoints =
          age < 60 ? 3 :
          age < 65 ? 5 :
          age < 70 ? 7 :
          age < 75 ? 9 :
          age < 80 ? 12 : 15
      }
    }

    let sbpPoints = 0

    if (sbp < 110) {
      sbpPoints = ef < 30 ? 5 : ef < 40 ? 3 : 2
    } else if (sbp < 120) {
      sbpPoints = ef < 30 ? 4 : ef < 40 ? 2 : 1
    } else if (sbp < 130) {
      sbpPoints = ef < 30 ? 3 : 1
    } else if (sbp < 140) {
      sbpPoints = ef < 30 ? 2 : ef < 40 ? 1 : 0
    } else if (sbp < 150) {
      sbpPoints = ef < 30 ? 1 : 0
    }

    const bmiPoints =
      bmi < 15 ? 6 :
      bmi < 20 ? 5 :
      bmi < 25 ? 3 :
      bmi < 30 ? 2 : 0

    const creatininePoints =
      creatinineUmol < 90 ? 0 :
      creatinineUmol < 110 ? 1 :
      creatinineUmol < 130 ? 2 :
      creatinineUmol < 150 ? 3 :
      creatinineUmol < 170 ? 4 :
      creatinineUmol < 210 ? 5 :
      creatinineUmol < 250 ? 6 : 8

    const score =
      efPoints +
      agePoints +
      sbpPoints +
      bmiPoints +
      creatininePoints +
      (nyha === 1 ? 0 :
       nyha === 2 ? 2 :
       nyha === 3 ? 6 : 8) +
      (v.male ? 1 : 0) +
      (v.smoker ? 1 : 0) +
      (v.diabetes ? 3 : 0) +
      (v.copd ? 2 : 0) +
      (v.hfDuration ? 2 : 0) +
      (!v.betaBlocker ? 3 : 0) +
      (!v.aceArb ? 1 : 0)

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category:
        score <= 16 ? 'MAGGIC score 0–16' :
        score <= 20 ? 'MAGGIC score 17–20' :
        score <= 24 ? 'MAGGIC score 21–24' :
        score <= 28 ? 'MAGGIC score 25–28' :
        score <= 32 ? 'MAGGIC score 29–32' :
        'MAGGIC score ≥33',
      note: 'The MAGGIC integer score combines 13 baseline variables. Published risk estimates depend on the score and the population/time horizon being considered.'
    }
  },

  references: [
    'Pocock SJ, et al. Predicting survival in heart failure: a risk score based on 39,372 patients from 30 studies. Eur Heart J. 2013;34:1404–1413.'
  ]
}

export default maggic
