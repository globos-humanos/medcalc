const wellsPe = {
  id: 'wells-pe',
  name: 'Wells Criteria for Pulmonary Embolism',
  shortName: 'Wells PE',
  type: 'score',
  categoryId: 'emergency',
  category: 'Emergency',
  description:
    'Calculates the Wells clinical score for pretest probability of pulmonary embolism.',
  keywords: [
    'Wells',
    'Wells PE',
    'pulmonary embolism',
    'PE',
    'DVT',
    'hemoptysis',
    'malignancy',
    'tachycardia'
  ],
  aliases: [
    'Wells PE',
    'Wells criteria',
    'Wells score pulmonary embolism'
  ],

  inputs: [
    {
      id: 'dvtSigns',
      label: 'Clinical signs of DVT',
      type: 'boolean'
    },
    {
      id: 'peLikely',
      label: 'PE is the most likely diagnosis or equally likely',
      type: 'boolean'
    },
    {
      id: 'heartRate',
      label: 'Heart rate >100 bpm',
      type: 'boolean'
    },
    {
      id: 'immobilization',
      label: 'Immobilization ≥3 days or surgery in previous 4 weeks',
      type: 'boolean'
    },
    {
      id: 'previousVte',
      label: 'Previous objectively diagnosed PE or DVT',
      type: 'boolean'
    },
    {
      id: 'hemoptysis',
      label: 'Hemoptysis',
      type: 'boolean'
    },
    {
      id: 'malignancy',
      label: 'Malignancy treated within 6 months or palliative',
      type: 'boolean'
    }
  ],

  calculate(values) {
    const fields = [
      'dvtSigns',
      'peLikely',
      'heartRate',
      'immobilization',
      'previousVte',
      'hemoptysis',
      'malignancy'
    ]

    if (fields.some(field => typeof values[field] !== 'boolean')) {
      return {
        error: 'Please answer every Wells PE criterion.'
      }
    }

    const score =
      (values.dvtSigns ? 3 : 0) +
      (values.peLikely ? 3 : 0) +
      (values.heartRate ? 1.5 : 0) +
      (values.immobilization ? 1.5 : 0) +
      (values.previousVte ? 1.5 : 0) +
      (values.hemoptysis ? 1 : 0) +
      (values.malignancy ? 1 : 0)

    return {
      value: score,
      displayValue: Number.isInteger(score)
        ? String(score)
        : score.toFixed(1),
      unit: 'points',
      category:
        score > 4
          ? 'PE likely'
          : 'PE unlikely',
      note:
        'This is the two-tier Wells PE interpretation (≤4 PE unlikely; >4 PE likely). The Wells score estimates pretest probability and should be used within an appropriate diagnostic pathway.'
    }
  },

  references: [
    'Wells PS, et al. Derivation of a simple clinical model to categorize patients probability of pulmonary embolism: increasing the model utility with the SimpliRED D-dimer. Thrombosis and Haemostasis. 2000.',
    'Wells PS, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. New England Journal of Medicine. 2003.',
    'Prospective validation of Wells Criteria in patients with suspected pulmonary embolism.'
  ]
}

export default wellsPe
