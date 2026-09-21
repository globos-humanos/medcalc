const correctedCalcium = {
  id: 'corrected-calcium',
  name: 'Corrected Calcium Calculator',
  shortName: 'Corrected Ca',
  type: 'calculator',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Corrects total serum calcium for serum albumin.',
  keywords: [
    'corrected calcium',
    'albumin corrected calcium',
    'calcium',
    'hypocalcemia',
    'hypercalcemia',
    'albumin'
  ],
  aliases: [
    'corrected calcium',
    'calcium correction',
    'albumin corrected calcium'
  ],
  inputs: [
    {
      id: 'calcium',
      label: 'Total Calcium',
      type: 'number',
      unit: 'mg/dL',
      min: 0,
      step: 0.1
    },
    {
      id: 'albumin',
      label: 'Albumin',
      type: 'number',
      unit: 'g/dL',
      min: 0,
      step: 0.1
    }
  ],
  calculate(values) {
    const calcium = Number(values.calcium)
    const albumin = Number(values.albumin)

    if (
      !calcium || !albumin ||
      calcium <= 0 || albumin <= 0
    ) {
      return { error: 'Please enter valid calcium and albumin values.' }
    }

    const corrected = calcium + 0.8 * (4 - albumin)

    return {
      value: corrected,
      displayValue: corrected.toFixed(1),
      unit: 'mg/dL',
      category: 'Albumin-corrected calcium'
    }
  },
  references: [
    'Common clinical correction: corrected calcium = measured calcium + 0.8 × (4.0 − albumin).'
  ]
}

export default correctedCalcium
