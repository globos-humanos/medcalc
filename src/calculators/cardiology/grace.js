const calc = {
  id: 'grace',
  name: 'GRACE Score for ACS',
  shortName: 'GRACE',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'GRACE hospital-mortality score for patients with acute coronary syndrome.',
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
      id: 'hr',
      label: 'Heart rate',
      unit: '/min',
      min: 20,
      max: 250
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      unit: 'mmHg',
      min: 40,
      max: 300
    },
    {
      id: 'creatinine',
      label: 'Creatinine',
      unit: 'mg/dL',
      min: 0,
      max: 15,
      step: 0.01
    },
    {
      id: 'killip',
      label: 'Killip class',
      type: 'choice',
      options: [
        { value: 1, label: 'I — No heart failure' },
        { value: 2, label: 'II — Mild/moderate heart failure' },
        { value: 3, label: 'III — Pulmonary edema' },
        { value: 4, label: 'IV — Cardiogenic shock' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'arrest',
      label: 'Cardiac arrest at admission',
      type: 'boolean'
    },
    {
      id: 'st',
      label: 'ST-segment deviation',
      type: 'boolean'
    },
    {
      id: 'enzymes',
      label: 'Elevated cardiac enzymes/markers',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const age = Number(v.age)
    const hr = Number(v.hr)
    const sbp = Number(v.sbp)
    const creatinine = Number(v.creatinine)
    const killip = Number(v.killip)

    if (
      !Number.isFinite(age) ||
      !Number.isFinite(hr) ||
      !Number.isFinite(sbp) ||
      !Number.isFinite(creatinine) ||
      !Number.isFinite(killip) ||
      v.arrest === undefined ||
      v.st === undefined ||
      v.enzymes === undefined
    ) {
      return {
        error: 'Please complete all GRACE variables.'
      }
    }

    const agePoints =
      age < 40 ? 0 :
      age < 50 ? 18 :
      age < 60 ? 36 :
      age < 70 ? 55 :
      age < 80 ? 73 : 91

    const hrPoints =
      hr < 70 ? 0 :
      hr < 90 ? 7 :
      hr < 110 ? 13 :
      hr < 150 ? 23 :
      hr < 200 ? 36 : 46

    const sbpPoints =
      sbp < 80 ? 63 :
      sbp < 100 ? 58 :
      sbp < 120 ? 47 :
      sbp < 140 ? 37 :
      sbp < 160 ? 26 :
      sbp < 200 ? 11 : 0

    const creatininePoints =
      creatinine < 0.4 ? 2 :
      creatinine < 0.8 ? 5 :
      creatinine < 1.2 ? 8 :
      creatinine < 1.6 ? 11 :
      creatinine < 2.0 ? 14 :
      creatinine < 4.0 ? 23 : 31

    const killipPoints =
      killip === 1 ? 0 :
      killip === 2 ? 20 :
      killip === 3 ? 39 : 59

    const score =
      agePoints +
      hrPoints +
      sbpPoints +
      creatininePoints +
      killipPoints +
      (v.arrest ? 39 : 0) +
      (v.st ? 28 : 0) +
      (v.enzymes ? 14 : 0)

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category:
        score <= 108 ? 'Low score range' :
        score <= 140 ? 'Intermediate score range' :
        'High score range',
      note: 'This implementation uses the GRACE hospital-mortality point table. The score is a population-derived ACS risk model and should not be interpreted independently of the clinical context.'
    }
  },

  references: [
    'Granger CB, et al. Predictors of hospital mortality in the Global Registry of Acute Coronary Events. Arch Intern Med. 2003.',
    'AHA/ACC NSTE-ACS guidance describing the GRACE risk model.'
  ]
}

export default calc
