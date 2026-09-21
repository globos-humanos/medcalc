const caCr = {
  id: 'ca-cr-clearance-ratio',
  name: 'Calcium / Creatinine Clearance Ratio',
  shortName: 'Ca/Cr Clearance Ratio',
  type: 'formula',
  categoryId: 'endocrinology',
  category: 'Endocrinology',
  description: 'Calculates the calcium-to-creatinine clearance ratio using 24-hour urine calcium and creatinine together with serum calcium and creatinine. It is commonly used when evaluating PTH-dependent hypercalcemia, including differentiation of familial hypocalciuric hypercalcemia from primary hyperparathyroidism.',
  keywords: [
    'calcium creatinine clearance ratio',
    'Ca Cr clearance ratio',
    'CCCR',
    'FHH',
    'familial hypocalciuric hypercalcemia',
    'hypercalcemia',
    'urine calcium'
  ],
  aliases: [
    'CCCR',
    'Calcium Creatinine Clearance Ratio',
    'Ca/Cr Clearance Ratio'
  ],
  inputs: [
    {
      id: 'urineCalcium',
      label: '24-hour urine calcium',
      type: 'number',
      unit: 'mg/24 h',
      min: 0,
      step: 0.01
    },
    {
      id: 'serumCreatinine',
      label: 'Serum creatinine',
      type: 'number',
      unit: 'mg/dL',
      min: 0,
      step: 0.01
    },
    {
      id: 'urineCreatinine',
      label: '24-hour urine creatinine',
      type: 'number',
      unit: 'mg/24 h',
      min: 0,
      step: 0.01
    },
    {
      id: 'serumCalcium',
      label: 'Serum calcium',
      type: 'number',
      unit: 'mg/dL',
      min: 0,
      step: 0.01
    }
  ],
  calculate(values) {
    const urineCalcium = Number(values.urineCalcium)
    const serumCreatinine = Number(values.serumCreatinine)
    const urineCreatinine = Number(values.urineCreatinine)
    const serumCalcium = Number(values.serumCalcium)

    if (
      !Number.isFinite(urineCalcium) ||
      !Number.isFinite(serumCreatinine) ||
      !Number.isFinite(urineCreatinine) ||
      !Number.isFinite(serumCalcium)
    ) {
      return { error: 'Please enter all calcium and creatinine values.' }
    }

    if (
      urineCreatinine <= 0 ||
      serumCalcium <= 0
    ) {
      return {
        error: 'Urine creatinine and serum calcium must be greater than zero.'
      }
    }

    const ratio =
      (urineCalcium * serumCreatinine) /
      (urineCreatinine * serumCalcium)

    return {
      value: ratio,
      displayValue: ratio.toFixed(4),
      unit: 'clearance ratio',
      category:
        ratio < 0.01
          ? 'Low / hypocalciuric range'
          : ratio <= 0.02
            ? 'Indeterminate range'
            : 'Higher range',
      interpretation:
        ratio < 0.01
          ? 'A ratio <0.01 can support consideration of familial hypocalciuric hypercalcemia in the appropriate clinical setting.'
          : ratio <= 0.02
            ? 'Intermediate values may overlap between familial hypocalciuric hypercalcemia and primary hyperparathyroidism.'
            : 'A higher ratio is more compatible with primary hyperparathyroidism than familial hypocalciuric hypercalcemia, although clinical context is required.'
    }
  },
  references: [
    'Marx SJ. Familial hypocalciuric hypercalcemia. UpToDate/Endotext literature.',
    'Clinical calculation: Calcium/creatinine clearance ratio = (24-h urine calcium × serum creatinine) / (24-h urine creatinine × serum calcium).'
  ]
}

export default caCr
