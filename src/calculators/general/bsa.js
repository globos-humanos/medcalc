const bsa = {
  id: 'bsa',
  name: 'BSA Calculator',
  shortName: 'BSA',

  type: 'calculator',

  categoryId: 'general-medicine',
  category: 'General Medicine',

  description:
    'Calculates Body Surface Area from height and weight using the Mosteller formula.',

  keywords: [
    'body surface area',
    'surface area',
    'height',
    'weight',
    'BSA',
    'Mosteller'
  ],

  aliases: [
    'body surface area',
    'body surface',
    'mosteller formula'
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
        error:
          'Please enter a valid weight and height.'
      }
    }

    const bsa = Math.sqrt(
      (heightCm * weight) / 3600
    )

    return {
      value: bsa,
      displayValue: bsa.toFixed(2),
      unit: 'm²',
      category: 'Mosteller BSA'
    }
  },

  references: [
    'Mosteller RD. Simplified calculation of body-surface area. N Engl J Med. 1987;317:1098.'
  ]
}

export default bsa