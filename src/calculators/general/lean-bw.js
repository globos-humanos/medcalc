const leanBw = {
  id: 'lean-bw',
  name: 'Lean Body Weight Calculator',
  shortName: 'LBW',
  type: 'calculator',
  categoryId: 'general-medicine',
  category: 'General Medicine',
  description: 'Estimates lean body weight using the Janmahasatian equation.',
  keywords: [
    'lean body weight',
    'LBW',
    'lean body mass',
    'fat free mass',
    'Janmahasatian',
    'BMI'
  ],
  aliases: [
    'lean body weight',
    'lean body mass',
    'LBW',
    'Janmahasatian'
  ],
  inputs: [
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
      id: 'height',
      label: 'Height',
      type: 'number',
      unit: 'cm',
      min: 0,
      step: 0.1
    },
    {
      id: 'weight',
      label: 'Weight',
      type: 'number',
      unit: 'kg',
      min: 0,
      step: 0.1
    }
  ],
  calculate(values) {
    const sex = values.sex
    const height = Number(values.height)
    const weight = Number(values.weight)

    if (!sex || !height || !weight || height <= 0 || weight <= 0) {
      return { error: 'Please select sex and enter valid height and weight.' }
    }

    const heightMeters = height / 100
    const bmi = weight / (heightMeters * heightMeters)

    const lbw = sex === 'male'
      ? (9270 * weight) / (6680 + 216 * bmi)
      : (9270 * weight) / (8780 + 244 * bmi)

    return {
      value: lbw,
      displayValue: lbw.toFixed(1),
      unit: 'kg',
      category: 'Janmahasatian LBW'
    }
  },
  references: [
    'Janmahasatian S, et al. Quantification of lean bodyweight. Clin Pharmacokinet. 2005;44(10):1051-1065.'
  ]
}

export default leanBw
