const fena = {
  id: 'fena',
  name: 'Fractional Excretion of Sodium',
  shortName: 'FENa',
  type: 'calculator',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Calculates fractional excretion of sodium using paired serum and urine measurements.',
  keywords: [
    'FENa',
    'fractional excretion sodium',
    'fractional excretion of sodium',
    'acute kidney injury',
    'AKI',
    'prerenal',
    'ATN',
    'urine sodium'
  ],
  aliases: [
    'FENa',
    'fractional excretion of sodium',
    'fractional sodium excretion'
  ],
  inputs: [
    {
      id: 'serumSodium',
      label: 'Serum Sodium',
      type: 'number',
      unit: 'mEq/L',
      min: 0,
      step: 0.1
    },
    {
      id: 'serumCreatinine',
      label: 'Serum Creatinine',
      type: 'number',
      unit: 'mg/dL',
      min: 0,
      step: 0.01
    },
    {
      id: 'urineSodium',
      label: 'Urine Sodium',
      type: 'number',
      unit: 'mEq/L',
      min: 0,
      step: 0.1
    },
    {
      id: 'urineCreatinine',
      label: 'Urine Creatinine',
      type: 'number',
      unit: 'mg/dL',
      min: 0,
      step: 0.1
    }
  ],
  calculate(values) {
    const serumSodium = Number(values.serumSodium)
    const serumCreatinine = Number(values.serumCreatinine)
    const urineSodium = Number(values.urineSodium)
    const urineCreatinine = Number(values.urineCreatinine)

    if (
      serumSodium <= 0 ||
      serumCreatinine <= 0 ||
      urineSodium < 0 ||
      urineCreatinine <= 0
    ) {
      return { error: 'Please enter valid serum and urine values.' }
    }

    const result =
      (urineSodium * serumCreatinine) /
      (serumSodium * urineCreatinine) * 100

    let interpretation = ''

    if (result < 1) {
      interpretation = '<1% FENa'
    } else if (result > 2) {
      interpretation = '>2% FENa'
    } else {
      interpretation = '1–2% FENa'
    }

    return {
      value: result,
      displayValue: result.toFixed(2),
      unit: '%',
      category: interpretation
    }
  },
  references: [
    'MDCalc. Fractional Excretion of Sodium (FENa).'
  ]
}

export default fena
