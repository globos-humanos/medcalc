const homa = {
  id: 'homa-ir',
  name: 'HOMA-IR',
  shortName: 'HOMA-IR',
  categoryId: 'endocrinology',
  category: 'Endocrinology',
  description:
    'Homeostasis Model Assessment of insulin resistance using fasting glucose and insulin.',
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

    const value =
      (glucose * insulin) /
      405

    return {
      value,
      displayValue: value.toFixed(2),
      unit: 'HOMA-IR',
      category: 'Calculated insulin-resistance surrogate',
      note:
        'This is conventional HOMA1-IR arithmetic. There is no universally applicable diagnostic cutoff because thresholds vary with population, assay and clinical context.'
    }
  },

  references: [
    'HOMA-IR = fasting glucose (mg/dL) × fasting insulin (µU/mL) / 405.',
    'Equivalent formulation: fasting glucose (mmol/L) × fasting insulin (mU/L) / 22.5.'
  ]
}

export default homa
