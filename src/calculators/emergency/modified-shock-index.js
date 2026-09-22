const msi = {
  id: 'modified-shock-index',
  name: 'Modified Shock Index',
  shortName: 'MSI',
  categoryId: 'emergency',
  category: 'Emergency / Trauma',
  description:
    'Heart rate divided by mean arterial pressure.',
  type: 'calculation',

  inputs: [
    {
      id: 'hr',
      label: 'Heart rate',
      unit: '/min',
      min: 20,
      max: 250,
      step: 1
    },
    {
      id: 'map',
      label: 'Mean arterial pressure',
      unit: 'mmHg',
      min: 20,
      max: 250,
      step: 1
    }
  ],

  calculate(v) {
    const hr = Number(v.hr)
    const map = Number(v.map)

    if (
      !Number.isFinite(hr) ||
      !Number.isFinite(map) ||
      map <= 0
    ) {
      return {
        error: 'Please enter valid heart rate and mean arterial pressure values.'
      }
    }

    const score = hr / map

    let category

    if (score < 0.7) {
      category = 'Lower MSI range'
    } else if (score <= 1.3) {
      category = 'Intermediate MSI range'
    } else {
      category = 'Higher MSI range'
    }

    return {
      value: score,
      displayValue: score.toFixed(2),
      unit: 'ratio',
      category,
      note:
        'MSI is HR/MAP. Published thresholds vary by population and clinical setting, so the result should not be treated as a universal diagnostic cutoff.'
    }
  },

  references: [
    'Modified Shock Index is calculated as heart rate divided by mean arterial pressure.',
    'Published studies have evaluated different MSI thresholds in trauma, emergency and cardiovascular populations.'
  ]
}

export default msi
