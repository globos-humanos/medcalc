const caCr = {
  id: 'ca-cr-clearance-ratio',
  name: 'Calcium / Creatinine Clearance Ratio',
  shortName: 'Ca/Cr Clearance Ratio',
  type: 'formula',
  categoryId: 'endocrinology',
  category: 'Endocrinology',
  description:
    'Calculates the calcium-to-creatinine clearance ratio used in the evaluation of PTH-dependent hypercalcemia.',

  inputs: [
    {
      id: 'urineCalcium',
      label: '24-hour urine calcium',
      unit: 'mg/24 h',
      min: 0,
      step: 0.01
    },
    {
      id: 'serumCreatinine',
      label: 'Serum creatinine',
      unit: 'mg/dL',
      min: 0,
      step: 0.01
    },
    {
      id: 'urineCreatinine',
      label: '24-hour urine creatinine',
      unit: 'mg/24 h',
      min: 0,
      step: 0.01
    },
    {
      id: 'serumCalcium',
      label: 'Serum calcium',
      unit: 'mg/dL',
      min: 0,
      step: 0.01
    }
  ],

  calculate(v) {
    const urineCalcium = Number(v.urineCalcium)
    const serumCreatinine = Number(v.serumCreatinine)
    const urineCreatinine = Number(v.urineCreatinine)
    const serumCalcium = Number(v.serumCalcium)

    if (
      !Number.isFinite(urineCalcium) ||
      !Number.isFinite(serumCreatinine) ||
      !Number.isFinite(urineCreatinine) ||
      !Number.isFinite(serumCalcium) ||
      urineCalcium < 0 ||
      serumCreatinine <= 0 ||
      urineCreatinine <= 0 ||
      serumCalcium <= 0
    ) {
      return {
        error: 'Please enter valid calcium and creatinine values.'
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
      note:
        ratio < 0.01
          ? 'A ratio below 0.01 can support consideration of familial hypocalciuric hypercalcemia in the appropriate clinical setting.'
          : ratio <= 0.02
            ? 'Values from 0.01–0.02 can overlap between familial hypocalciuric hypercalcemia and primary hyperparathyroidism.'
            : 'A ratio above 0.02 is more compatible with primary hyperparathyroidism than familial hypocalciuric hypercalcemia, although clinical context is required.'
    }
  },

  references: [
    'Calcium/creatinine clearance ratio = (24-h urine calcium × serum creatinine) / (24-h urine creatinine × serum calcium).',
    'Evaluation of PTH-dependent hypercalcemia and familial hypocalciuric hypercalcemia.'
  ]
}

export default caCr
