const bmi = {
  id: 'bmi',
  name: 'BMI Calculator',
  shortName: 'BMI',

  type: 'calculator',

  categoryId: 'general-medicine',
  category: 'General Medicine',

  description: 'Calculates Body Mass Index from weight and height.',

  keywords: [
    'body mass index',
    'weight',
    'height',
    'obesity',
    'overweight',
    'underweight'
  ],

  aliases: [
    'body mass index',
    'body mass',
    'quetelet index'
  ],

  inputs: [
    {
      id: 'weight',
      label: 'Weight',
      type: 'number',
      unit: 'kg',
      min: 0,
      step: 0.1
    },
    {
      id: 'height',
      label: 'Height',
      type: 'number',
      unit: 'cm',
      min: 0,
      step: 0.1
    }
  ],

  calculate(values) {
    const weight = Number(values.weight)
    const heightCm = Number(values.height)

    if (
      !weight ||
      !heightCm ||
      weight <= 0 ||
      heightCm <= 0
    ) {
      return {
        error: 'Please enter a valid weight and height.'
      }
    }

    const heightMeters = heightCm / 100
    const bmi = weight / (heightMeters * heightMeters)

    let category = ''

    if (bmi < 18.5) {
      category = 'Underweight'
    } else if (bmi < 25) {
      category = 'Normal weight'
    } else if (bmi < 30) {
      category = 'Overweight'
    } else {
      category = 'Obesity'
    }

    return {
      value: bmi,
      displayValue: bmi.toFixed(1),
      unit: 'kg/m²',
      category
    }
  },

  references: [
    'WHO BMI classification'
  ]
}

export default bmi