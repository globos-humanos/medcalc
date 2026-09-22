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

    if (!Number.isFinite(weight) || !Number.isFinite(heightCm) || weight <= 0 || heightCm <= 0) {
      return {
        error: 'Please enter a valid weight and height.'
      }
    }

    const heightMeters = heightCm / 100
    const bmi = weight / (heightMeters * heightMeters)

    let category
    let interpretation

    if (bmi < 18.5) {
      category = 'Underweight'
      interpretation = 'BMI below 18.5 kg/m2 is classified as underweight in adults.'
    } else if (bmi < 25) {
      category = 'Normal weight'
      interpretation = 'BMI 18.5–24.9 kg/m2 is within the normal adult range.'
    } else if (bmi < 30) {
      category = 'Overweight'
      interpretation = 'BMI 25.0–29.9 kg/m2 is classified as overweight in adults.'
    } else if (bmi < 35) {
      category = 'Obesity — Class I'
      interpretation = 'BMI 30.0–34.9 kg/m2 is classified as obesity class I.'
    } else if (bmi < 40) {
      category = 'Obesity — Class II'
      interpretation = 'BMI 35.0–39.9 kg/m2 is classified as obesity class II.'
    } else {
      category = 'Obesity — Class III'
      interpretation = 'BMI 40 kg/m2 or higher is classified as obesity class III.'
    }

    return {
      value: bmi,
      displayValue: bmi.toFixed(1),
      unit: 'kg/m2',
      category,
      interpretation,
      note: 'BMI is a screening measure and should be interpreted alongside clinical assessment and other risk factors.'
    }
  },

  references: [
    'WHO BMI classification'
  ]
}

export default bmi
