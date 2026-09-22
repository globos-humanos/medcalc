const calc = {
  id: 'homa-beta',
  name: 'HOMA-β',
  shortName: 'HOMA-β',
  categoryId: 'endocrinology',
  category: 'Endocrinology',
  description:
    'Homeostatic estimate of pancreatic beta-cell function using fasting glucose and insulin.',
  type: 'calculation',

  inputs: [
    {
      id: 'glucose',
      label: 'Fasting glucose',
      unit: 'mg/dL',
      min: 20,
      max: 1000,
      step: 0.1
    },
    {
      id: 'insulin',
      label: 'Fasting insulin',
      unit: 'µU/mL',
      min: 0,
      max: 500,
      step: 0.1
    }
  ],

  calculate(v) {
    const glucose = Number(v.glucose)
    const insulin = Number(v.insulin)

    if (
      !Number.isFinite(glucose) ||
      !Number.isFinite(insulin) ||
      glucose <= 0 ||
      insulin < 0
    ) {
      return {
        error: 'Please enter valid fasting glucose and insulin values.'
      }
    }

    if (glucose === 63) {
      return {
        error: 'HOMA-β is mathematically undefined when fasting glucose is 63 mg/dL.'
      }
    }

    const value =
      (360 * insulin) /
      (glucose - 63)

    return {
      value,
      displayValue: value.toFixed(1),
      unit: '% HOMA-β',
      category: 'Calculated beta-cell function estimate',
      note:
        'HOMA-β is a surrogate index derived from fasting glucose and insulin. It is not a direct measurement of beta-cell function, and interpretation depends on the model and clinical context.'
    }
  },

  references: [
    'Homeostasis Model Assessment formula: HOMA-β = 360 × fasting insulin / (fasting glucose − 63), with glucose in mg/dL.',
    'HOMA model-derived surrogate index of beta-cell function.'
  ]
}

export default calc
