const cha2ds2Vasc = {
  id: 'cha2ds2-vasc',
  name: 'CHA₂DS₂-VASc Score',
  shortName: 'CHA₂DS₂-VASc',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Estimates thromboembolic risk in patients with atrial fibrillation.',
  keywords: ['CHA2DS2-VASc', 'atrial fibrillation', 'AF', 'stroke risk'],
  aliases: ['CHA2DS2VASc', 'AF stroke score'],

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'choice',
      options: [
        { value: 0, label: '<65 years' },
        { value: 1, label: '65–74 years' },
        { value: 2, label: '≥75 years' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        { value: 0, label: 'Male' },
        { value: 1, label: 'Female' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'chf',
      label: 'Congestive heart failure / LV dysfunction',
      type: 'boolean'
    },
    {
      id: 'hypertension',
      label: 'Hypertension',
      type: 'boolean'
    },
    {
      id: 'stroke',
      label: 'Prior stroke, TIA, or thromboembolism',
      type: 'boolean'
    },
    {
      id: 'vascular',
      label: 'Vascular disease',
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
      'age',
      'sex',
      'chf',
      'hypertension',
      'stroke',
      'vascular',
      'diabetes'
    ]

    if (required.some(id => v[id] === undefined)) {
      return {
        error: 'Please complete every CHA₂DS₂-VASc criterion.'
      }
    }

    const score =
      Number(v.age) +
      Number(v.sex) +
      (v.chf ? 1 : 0) +
      (v.hypertension ? 1 : 0) +
      (v.stroke ? 2 : 0) +
      (v.vascular ? 1 : 0) +
      (v.diabetes ? 1 : 0)

    return {
      value: score,
      displayValue: `${score}/9`,
      unit: 'points',
      category: 'CHA₂DS₂-VASc',
      note: 'The score assigns points for heart failure/LV dysfunction, hypertension, age, diabetes, prior stroke/TIA/thromboembolism, vascular disease, and sex category.'
    }
  },

  references: [
    'Lip GYH, et al. Chest. 2010.',
    '2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation.'
  ]
}

export default cha2ds2Vasc
