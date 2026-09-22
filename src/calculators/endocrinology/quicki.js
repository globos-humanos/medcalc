const quicki = {
  id: 'quicki',
  name: 'QUICKI',
  shortName: 'QUICKI',
  categoryId: 'endocrinology',
  category: 'Endocrinology',
  description:
    'Quantitative Insulin Sensitivity Check Index derived from fasting glucose and insulin.',
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
      min: 0.1,
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
      insulin <= 0
    ) {
      return {
        error: 'Please enter positive fasting glucose and insulin values.'
      }
    }

    const value =
      1 /
      (Math.log10(glucose) + Math.log10(insulin))

    return {
      value,
      displayValue: value.toFixed(3),
      unit: 'QUICKI',
      category: 'Calculated insulin-sensitivity surrogate',
      note:
        'QUICKI is a surrogate index of insulin sensitivity. Higher values generally correspond to greater insulin sensitivity, but universal diagnostic cutoffs should not be assumed.'
    }
  },

  references: [
    'Katz A, et al. Quantitative insulin sensitivity check index: a simple, accurate method for assessing insulin sensitivity in humans. Journal of Clinical Endocrinology & Metabolism. 2000.',
    'QUICKI = 1 / [log fasting insulin (µU/mL) + log fasting glucose (mg/dL)].'
  ]
}

export default quicki
