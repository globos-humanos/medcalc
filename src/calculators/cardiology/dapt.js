const calc = {
  id: 'dapt',
  name: 'DAPT Score',
  shortName: 'DAPT',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'DAPT score for assessing the balance of ischemic and bleeding risk when considering prolonged dual antiplatelet therapy after PCI.',
  type: 'score',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'choice',
      options: [
        { value: -2, label: '≥75 years' },
        { value: -1, label: '65–74 years' },
        { value: 0, label: '<65 years' }
      ],
      optionsLayout: 'stack'
    },
    { id: 'smoker', label: 'Current smoker', type: 'boolean' },
    { id: 'diabetes', label: 'Diabetes mellitus', type: 'boolean' },
    { id: 'mi', label: 'Myocardial infarction at presentation', type: 'boolean' },
    { id: 'priorMi', label: 'Prior MI or PCI', type: 'boolean' },
    { id: 'stent', label: 'Stent diameter <3 mm', type: 'boolean' },
    { id: 'paclitaxel', label: 'Paclitaxel-eluting stent', type: 'boolean' },
    { id: 'chf', label: 'CHF or LVEF <30%', type: 'boolean' },
    { id: 'vein', label: 'Vein-graft PCI', type: 'boolean' }
  ],

  calculate(v) {
    const required = [
      'age',
      'smoker',
      'diabetes',
      'mi',
      'priorMi',
      'stent',
      'paclitaxel',
      'chf',
      'vein'
    ]

    if (required.some(id => v[id] === undefined)) {
      return {
        error: 'Please complete all DAPT score variables.'
      }
    }

    const score =
      Number(v.age) +
      (v.smoker ? 1 : 0) +
      (v.diabetes ? 1 : 0) +
      (v.mi ? 1 : 0) +
      (v.priorMi ? 1 : 0) +
      (v.stent ? 1 : 0) +
      (v.paclitaxel ? 1 : 0) +
      (v.chf ? 2 : 0) +
      (v.vein ? 2 : 0)

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category: score >= 2 ? 'DAPT score ≥2' : 'DAPT score <2',
      note: 'The DAPT score was developed for patients who completed an initial period of DAPT after coronary stenting without major ischemic or bleeding events.'
    }
  },

  references: [
    'Yeh RW, et al. Development and Validation of a Prediction Rule for Benefit and Harm of Dual Antiplatelet Therapy Beyond One Year After Percutaneous Coronary Intervention. JAMA. 2016.'
  ]
}

export default calc
