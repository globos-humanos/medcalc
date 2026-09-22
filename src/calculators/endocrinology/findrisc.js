const findrisc = {
  id: 'findrisc',
  name: 'FINDRISC',
  shortName: 'FINDRISC',
  categoryId: 'endocrinology',
  category: 'Endocrinology',
  description:
    'Finnish Diabetes Risk Score for estimating future type 2 diabetes risk.',
  type: 'score',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'choice',
      options: [
        { value: 0, label: '<45 years' },
        { value: 2, label: '45–54 years' },
        { value: 3, label: '55–64 years' },
        { value: 4, label: '≥65 years' }
      ]
    },
    {
      id: 'bmi',
      label: 'BMI',
      type: 'choice',
      options: [
        { value: 0, label: '<25 kg/m²' },
        { value: 1, label: '25–30 kg/m²' },
        { value: 3, label: '>30 kg/m²' }
      ]
    },
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]
    },
    {
      id: 'waist',
      label: 'Waist circumference',
      unit: 'cm',
      min: 40,
      max: 250,
      step: 1
    },
    {
      id: 'activity',
      label: 'Physical activity ≥30 minutes/day?',
      type: 'boolean'
    },
    {
      id: 'diet',
      label: 'Daily consumption of vegetables, fruit or berries?',
      type: 'boolean'
    },
    {
      id: 'bp',
      label: 'History of antihypertensive treatment?',
      type: 'boolean'
    },
    {
      id: 'glucose',
      label: 'History of high blood glucose?',
      type: 'boolean'
    },
    {
      id: 'family',
      label: 'Family history of diabetes',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 3, label: 'Second-degree relative' },
        { value: 5, label: 'First-degree relative' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const waist = Number(v.waist)

    if (
      !Number.isFinite(waist) ||
      !['male', 'female'].includes(v.sex)
    ) {
      return {
        error: 'Please complete all FINDRISC variables.'
      }
    }

    const waistScore =
      v.sex === 'male'
        ? waist < 94
          ? 0
          : waist <= 102
            ? 3
            : 4
        : waist < 80
          ? 0
          : waist <= 88
            ? 3
            : 4

    const score =
      Number(v.age) +
      Number(v.bmi) +
      waistScore +
      (v.activity ? 0 : 2) +
      (v.diet ? 0 : 1) +
      (v.bp ? 2 : 0) +
      (v.glucose ? 5 : 0) +
      Number(v.family)

    return {
      value: score,
      displayValue: String(score),
      unit: '/26',
      category:
        score < 7
          ? 'Low risk'
          : score < 12
            ? 'Slightly elevated risk'
            : score < 15
              ? 'Moderate risk'
              : score < 21
                ? 'High risk'
                : 'Very high risk',
      note:
        'FINDRISC is a screening tool for future type 2 diabetes risk. It is intended for people without an established diabetes diagnosis and does not diagnose diabetes.'
    }
  },

  references: [
    'Lindström J, Tuomilehto J. The Diabetes Risk Score: a practical tool to predict type 2 diabetes risk. Diabetes Care. 2003;26:725–731.',
    'Finnish Diabetes Risk Score (FINDRISC) 8-variable model.'
  ]
}

export default findrisc
