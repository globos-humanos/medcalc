const anionGap = {
  id: 'anion-gap',
  name: 'Anion Gap Calculator',
  shortName: 'AG',
  type: 'calculator',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Calculates the serum anion gap from sodium, chloride, and bicarbonate.',
  keywords: [
    'anion gap',
    'AG',
    'metabolic acidosis',
    'sodium',
    'chloride',
    'bicarbonate',
    'HCO3'
  ],
  aliases: [
    'anion gap',
    'serum anion gap',
    'AG'
  ],
  inputs: [
    {
      id: 'sodium',
      label: 'Serum Sodium',
      type: 'number',
      unit: 'mEq/L',
      min: 0,
      step: 0.1
    },
    {
      id: 'chloride',
      label: 'Serum Chloride',
      type: 'number',
      unit: 'mEq/L',
      min: 0,
      step: 0.1
    },
    {
      id: 'bicarbonate',
      label: 'Serum Bicarbonate',
      type: 'number',
      unit: 'mEq/L',
      min: 0,
      step: 0.1
    }
  ],
  calculate(values) {
    const sodium = Number(values.sodium)
    const chloride = Number(values.chloride)
    const bicarbonate = Number(values.bicarbonate)

    if (
      !sodium || !chloride || !bicarbonate ||
      sodium <= 0 || chloride <= 0 || bicarbonate <= 0
    ) {
      return { error: 'Please enter valid sodium, chloride, and bicarbonate values.' }
    }

    const gap = sodium - chloride - bicarbonate

    return {
      value: gap,
      displayValue: gap.toFixed(1),
      unit: 'mEq/L',
      category: gap > 12 ? 'Elevated anion gap' : 'Anion gap'
    }
  },
  references: [
    'MDCalc. Anion Gap Calculator.'
  ]
}

export default anionGap
