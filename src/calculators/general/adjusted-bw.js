const adjustedBw = {
  id: 'adjusted-bw',
  name: 'Adjusted Body Weight Calculator',
  shortName: 'AdjBW',
  type: 'calculator',
  categoryId: 'general-medicine',
  category: 'General Medicine',
  description: 'Calculates adjusted body weight using Devine IBW and a 0.4 correction factor.',
  keywords: [
    'adjusted body weight',
    'AdjBW',
    'adjusted weight',
    'drug dosing',
    'obesity',
    'IBW'
  ],
  aliases: [
    'adjusted body weight',
    'adjusted weight',
    'AdjBW'
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
      label: 'Actual Body Weight',
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

    const inches = height / 2.54
    const ibw = (sex === 'male' ? 50 : 45.5) +
      2.3 * Math.max(0, inches - 60)

    const adjusted = ibw + 0.4 * (weight - ibw)

    return {
      value: adjusted,
      displayValue: adjusted.toFixed(1),
      unit: 'kg',
      category: 'Adjusted Body Weight'
    }
  },
  references: [
    'Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974.',
    'Adjusted body weight commonly calculated as IBW + 0.4 × (actual body weight − IBW).'
  ]
}

export default adjustedBw
