const ibw = {
  id: 'ibw',
  name: 'Ideal Body Weight Calculator',
  shortName: 'IBW',

  type: 'calculator',

  categoryId: 'general-medicine',
  category: 'General Medicine',

  description:
    'Estimates ideal body weight using the Devine formula based on sex and height.',

  keywords: [
    'ideal body weight',
    'IBW',
    'Devine',
    'body weight',
    'height',
    'drug dosing',
    'reference weight'
  ],

  aliases: [
    'ideal weight',
    'ideal body weight',
    'Devine formula',
    'Devine IBW'
  ],

  inputs: [
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        {
          value: 'male',
          label: 'Male'
        },
        {
          value: 'female',
          label: 'Female'
        }
      ]
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
    const sex = values.sex
    const heightCm = Number(values.height)

    if (
      !sex ||
      !heightCm ||
      heightCm <= 0
    ) {
      return {
        error:
          'Please select sex and enter a valid height.'
      }
    }

    const heightInches =
      heightCm / 2.54

    const inchesOverFiveFeet =
      Math.max(0, heightInches - 60)

    const baseWeight =
      sex === 'male'
        ? 50
        : 45.5

    const idealBodyWeight =
      baseWeight +
      (2.3 * inchesOverFiveFeet)

    return {
      value: idealBodyWeight,
      displayValue: idealBodyWeight.toFixed(1),
      unit: 'kg',
      category: 'Devine IBW'
    }
  },

  references: [
    'Devine BJ. Gentamicin therapy. Drug Intell Clin Pharm. 1974.',
    'UAE Ministry of Health and Prevention. Ideal Body Weight Calculator.'
  ]
}

export default ibw