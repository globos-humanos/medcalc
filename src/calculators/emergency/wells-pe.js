const wellsPe = {
  id: 'wells-pe',
  name: 'Wells Criteria for Pulmonary Embolism',
  shortName: 'Wells PE',
  type: 'score',
  categoryId: 'emergency',
  category: 'Emergency',
  description: 'Estimates pre-test probability of pulmonary embolism using the Wells criteria.',
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

    if (fields.some(field => values[field] === undefined)) {
      return { error: 'Please answer every Wells criterion.' }
    }

    let score = 0

    if (values.dvtSigns) score += 3
    if (values.peLikely) score += 3
    if (values.heartRate) score += 1.5
    if (values.immobilization) score += 1.5
    if (values.previousVte) score += 1.5
    if (values.hemoptysis) score += 1
    if (values.malignancy) score += 1

    const interpretation =
      score > 4
        ? 'PE likely'
        : 'PE unlikely'

    return {
      value: score,
      displayValue: Number.isInteger(score)
        ? String(score)
        : score.toFixed(1),
      unit: 'points',
      category: interpretation
    }
  },
  references: [
    'Wells PS, et al. Ann Intern Med. 2001;135(2):98-107.',
    'MDCalc. Wells Criteria for Pulmonary Embolism.'
  ]
}

export default wellsPe
