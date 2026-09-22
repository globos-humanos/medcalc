const alvarado = {
  id: 'alvarado',
  name: 'Alvarado Score',
  shortName: 'Alvarado',
  categoryId: 'emergency',
  category: 'Emergency / Trauma',
  description:
    'Clinical score for risk stratification in suspected acute appendicitis.',
  type: 'score',

  inputs: [
    {
      id: 'migration',
      label: 'Migration of pain to right lower quadrant',
      type: 'boolean'
    },
    {
      id: 'anorexia',
      label: 'Anorexia',
      type: 'boolean'
    },
    {
      id: 'nausea',
      label: 'Nausea or vomiting',
      type: 'boolean'
    },
    {
      id: 'tenderness',
      label: 'Right lower quadrant tenderness',
      type: 'boolean'
    },
    {
      id: 'rebound',
      label: 'Rebound tenderness',
      type: 'boolean'
    },
    {
      id: 'temp',
      label: 'Temperature ≥37.3°C',
      type: 'boolean'
    },
    {
      id: 'wbc',
      label: 'WBC >10,000/mm³',
      type: 'boolean'
    },
    {
      id: 'neutrophils',
      label: 'Neutrophilia / left shift',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const ids = [
      'migration',
      'anorexia',
      'nausea',
      'tenderness',
      'rebound',
      'temp',
      'wbc',
      'neutrophils'
    ]

    if (ids.some(id => typeof v[id] !== 'boolean')) {
      return {
        error: 'Please complete all Alvarado Score variables.'
      }
    }

    const score =
      (v.migration ? 1 : 0) +
      (v.anorexia ? 1 : 0) +
      (v.nausea ? 1 : 0) +
      (v.tenderness ? 2 : 0) +
      (v.rebound ? 1 : 0) +
      (v.temp ? 1 : 0) +
      (v.wbc ? 2 : 0) +
      (v.neutrophils ? 1 : 0)

    return {
      value: score,
      displayValue: String(score),
      unit: '/9',
      category:
        score <= 4
          ? 'Low probability'
          : score <= 6
            ? 'Intermediate probability'
            : 'High probability',
      note:
        'The Alvarado Score supports risk stratification in suspected appendicitis. Performance and appropriate thresholds vary with patient population; it does not establish the diagnosis by itself.'
    }
  },

  references: [
    'Alvarado A. A practical score for the early diagnosis of acute appendicitis. Annals of Emergency Medicine. 1986;15:557–564.',
    'Ohle R, et al. The Alvarado score for predicting acute appendicitis: a systematic review. BMC Medicine. 2011;9:139.'
  ]
}

export default alvarado
