const iss = {
  id: 'iss',
  name: 'Injury Severity Score',
  shortName: 'ISS',
  categoryId: 'emergency',
  category: 'Emergency / Trauma',
  description:
    'Anatomic trauma severity score based on the three highest AIS scores from different body regions.',
  type: 'score',

  inputs: [
    {
      id: 'headNeck',
      label: 'Head / neck AIS',
      min: 0,
      max: 6,
      step: 1
    },
    {
      id: 'face',
      label: 'Face AIS',
      min: 0,
      max: 6,
      step: 1
    },
    {
      id: 'chest',
      label: 'Chest AIS',
      min: 0,
      max: 6,
      step: 1
    },
    {
      id: 'abdomen',
      label: 'Abdomen / pelvic contents AIS',
      min: 0,
      max: 6,
      step: 1
    },
    {
      id: 'extremity',
      label: 'Extremity / pelvic girdle AIS',
      min: 0,
      max: 6,
      step: 1
    },
    {
      id: 'external',
      label: 'External AIS',
      min: 0,
      max: 6,
      step: 1
    }
  ],

  calculate(v) {
    const values = [
      Number(v.headNeck),
      Number(v.face),
      Number(v.chest),
      Number(v.abdomen),
      Number(v.extremity),
      Number(v.external)
    ]

    if (values.some(value => !Number.isFinite(value) || value < 0 || value > 6)) {
      return {
        error: 'Please enter a valid AIS value from 0 to 6 for every body region.'
      }
    }

    if (values.includes(6)) {
      return {
        value: 75,
        displayValue: '75',
        unit: 'ISS',
        category: 'Maximum ISS',
        note:
          'An AIS 6 injury sets the Injury Severity Score at 75.'
      }
    }

    const topThree = [...values]
      .sort((a, b) => b - a)
      .slice(0, 3)

    const score = topThree.reduce(
      (total, value) => total + value * value,
      0
    )

    return {
      value: score,
      displayValue: String(score),
      unit: 'ISS',
      category:
        score === 0
          ? 'No AIS-coded injury'
          : score <= 15
            ? 'Lower severity range'
            : score <= 24
              ? 'Moderate severity range'
              : 'Severe injury range',
      note:
        'ISS uses the three highest AIS scores from three different body regions. AIS coding itself requires an appropriately coded injury rather than a generic clinical severity estimate.'
    }
  },

  references: [
    'Baker SP, et al. The Injury Severity Score: a method for describing patients with multiple injuries and evaluating emergency care. Journal of Trauma. 1974;14:187–196.',
    'Abbreviated Injury Scale (AIS) coding system.'
  ]
}

export default iss
