const calc = {
  id: 'crusade',
  name: 'CRUSADE Bleeding Score',
  shortName: 'CRUSADE',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'CRUSADE in-hospital major bleeding score for NSTE-ACS.',
  type: 'score',

  inputs: [
    {
      id: 'hematocrit',
      label: 'Baseline hematocrit',
      unit: '%',
      min: 5,
      max: 70,
      step: 0.1
    },
    {
      id: 'crcl',
      label: 'Creatinine clearance',
      unit: 'mL/min',
      min: 0,
      max: 250,
      step: 0.1
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
      min: 30,
      max: 300
    },
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'chf',
      label: 'Signs of congestive heart failure at presentation',
      type: 'boolean'
    },
    {
      id: 'vascular',
      label: 'Prior vascular disease',
      type: 'boolean'
    },
    {
      id: 'diabetes',
      label: 'Diabetes mellitus',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const required = [
      'hematocrit',
      'crcl',
      'hr',
      'sbp',
      'sex',
      'chf',
      'vascular',
      'diabetes'
    ]

    if (
      required.some(id => v[id] === undefined) ||
      !Number.isFinite(Number(v.hematocrit)) ||
      !Number.isFinite(Number(v.crcl)) ||
      !Number.isFinite(Number(v.hr)) ||
      !Number.isFinite(Number(v.sbp))
    ) {
      return {
        error: 'Please complete all CRUSADE variables.'
      }
    }

    const hct = Number(v.hematocrit)
    const crcl = Number(v.crcl)
    const hr = Number(v.hr)
    const sbp = Number(v.sbp)

    const hctPoints =
      hct < 31 ? 9 :
      hct < 34 ? 7 :
      hct < 37 ? 3 :
      hct < 40 ? 2 : 0

    const crclPoints =
      crcl <= 15 ? 39 :
      crcl <= 30 ? 35 :
      crcl <= 60 ? 28 :
      crcl <= 90 ? 17 :
      crcl <= 120 ? 7 : 0

    const hrPoints =
      hr <= 70 ? 0 :
      hr <= 80 ? 1 :
      hr <= 90 ? 3 :
      hr <= 100 ? 6 :
      hr <= 110 ? 8 :
      hr <= 120 ? 10 : 11

    const sbpPoints =
      sbp <= 90 ? 10 :
      sbp <= 100 ? 8 :
      sbp <= 120 ? 5 :
      sbp <= 180 ? 1 :
      sbp <= 200 ? 3 : 5

    const score =
      hctPoints +
      crclPoints +
      hrPoints +
      sbpPoints +
      (v.sex === 'female' ? 8 : 0) +
      (v.chf ? 7 : 0) +
      (v.vascular ? 6 : 0) +
      (v.diabetes ? 6 : 0)

    return {
      value: score,
      displayValue: `${score}/100`,
      unit: 'points',
      category:
        score <= 20 ? 'Low score range' :
        score <= 40 ? 'Moderate score range' :
        score <= 60 ? 'High score range' :
        'Very high score range',
      note: 'CRUSADE estimates in-hospital major bleeding risk in patients with NSTE-ACS. The published score uses baseline hematocrit, creatinine clearance, heart rate, systolic BP, sex, CHF, vascular disease, and diabetes.'
    }
  },

  references: [
    'Subherwal S, et al. Baseline Risk of Major Bleeding in Non–ST-Segment Elevation Myocardial Infarction: The CRUSADE Bleeding Score. Circulation. 2009.'
  ]
}

export default calc
