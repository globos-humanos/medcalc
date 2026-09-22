const calc = {
  id: 'barthel',
  name: 'Barthel Index',
  shortName: 'Barthel',
  categoryId: 'general-medicine',
  category: 'General Medicine',
  description: 'Weighted Barthel Index for activities of daily living.',
  type: 'score',

  inputs: [
    {
      id: 'feeding',
      label: 'Feeding',
      type: 'choice',
      options: [
        { value: 0, label: 'Dependent' },
        { value: 5, label: 'Needs help' },
        { value: 10, label: 'Independent' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'bathing',
      label: 'Bathing',
      type: 'choice',
      options: [
        { value: 0, label: 'Dependent' },
        { value: 5, label: 'Independent' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'grooming',
      label: 'Grooming',
      type: 'choice',
      options: [
        { value: 0, label: 'Dependent' },
        { value: 5, label: 'Independent' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'dressing',
      label: 'Dressing',
      type: 'choice',
      options: [
        { value: 0, label: 'Dependent' },
        { value: 5, label: 'Needs help' },
        { value: 10, label: 'Independent' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'bowels',
      label: 'Bowels',
      type: 'choice',
      options: [
        { value: 0, label: 'Incontinent' },
        { value: 5, label: 'Occasional accident' },
        { value: 10, label: 'Continent' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'bladder',
      label: 'Bladder',
      type: 'choice',
      options: [
        { value: 0, label: 'Incontinent / catheterized' },
        { value: 5, label: 'Occasional accident' },
        { value: 10, label: 'Continent' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'toilet',
      label: 'Toilet use',
      type: 'choice',
      options: [
        { value: 0, label: 'Dependent' },
        { value: 5, label: 'Needs help' },
        { value: 10, label: 'Independent' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'transfer',
      label: 'Transfers bed to chair',
      type: 'choice',
      options: [
        { value: 0, label: 'Unable' },
        { value: 5, label: 'Major help' },
        { value: 10, label: 'Minor help' },
        { value: 15, label: 'Independent' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'mobility',
      label: 'Mobility on level surface',
      type: 'choice',
      options: [
        { value: 0, label: 'Immobile' },
        { value: 5, label: 'Wheelchair independent' },
        { value: 10, label: 'Walks with help' },
        { value: 15, label: 'Independent' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'stairs',
      label: 'Stairs',
      type: 'choice',
      options: [
        { value: 0, label: 'Unable' },
        { value: 5, label: 'Needs help' },
        { value: 10, label: 'Independent' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(values) {
    const keys = [
      'feeding',
      'bathing',
      'grooming',
      'dressing',
      'bowels',
      'bladder',
      'toilet',
      'transfer',
      'mobility',
      'stairs'
    ]

    if (keys.some(key => values[key] === undefined || values[key] === '')) {
      return {
        error: 'Please complete all ten Barthel Index domains.'
      }
    }

    const value = keys.reduce(
      (total, key) => total + Number(values[key]),
      0
    )

    let interpretation

    if (value === 100) {
      interpretation = 'Complete independence in the assessed activities.'
    } else if (value >= 91) {
      interpretation = 'Slight dependence.'
    } else if (value >= 61) {
      interpretation = 'Moderate dependence.'
    } else if (value >= 21) {
      interpretation = 'Severe dependence.'
    } else {
      interpretation = 'Total dependence.'
    }

    return {
      value,
      displayValue: `${value}/100`,
      unit: 'points',
      category: interpretation,
      note: 'Higher scores indicate greater independence. Interpretation bands can vary by version and clinical setting.'
    }
  }
}

export default calc
