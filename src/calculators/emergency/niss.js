const niss = {
  id: 'niss',
  name: 'New Injury Severity Score',
  shortName: 'NISS',
  categoryId: 'emergency',
  category: 'Emergency / Trauma',
  description:
    'Trauma severity score based on the three highest AIS injury severities regardless of body region.',
  type: 'score',

  inputs: [
    {
      id: 'ais1',
      label: 'Highest AIS injury',
      min: 0,
      max: 6,
      step: 1
    },
    {
      id: 'ais2',
      label: 'Second-highest AIS injury',
      min: 0,
      max: 6,
      step: 1
    },
    {
      id: 'ais3',
      label: 'Third-highest AIS injury',
      min: 0,
      max: 6,
      step: 1
    }
  ],

  calculate(v) {
    const values = [
      Number(v.ais1),
      Number(v.ais2),
      Number(v.ais3)
    ]

    if (values.some(value => !Number.isFinite(value) || value < 0 || value > 6)) {
      return {
        error: 'Please enter valid AIS values from 0 to 6.'
      }
    }

    if (values.includes(6)) {
      return {
        value: 75,
        displayValue: '75',
        unit: 'NISS',
        category: 'Maximum NISS',
        note:
          'An AIS 6 injury sets the New Injury Severity Score at 75.'
      }
    }

    const score = values.reduce(
      (total, value) => total + value * value,
      0
    )

    return {
      value: score,
      displayValue: String(score),
      unit: 'NISS',
      category:
        score === 0
          ? 'No AIS-coded injury'
          : score <= 15
            ? 'Lower severity range'
            : score <= 24
              ? 'Moderate severity range'
              : 'Severe injury range',
      note:
        'NISS squares the three highest AIS injury severities regardless of body region. AIS coding requires appropriately coded injuries.'
    }
  },

  references: [
    'Osler T, Baker SP, Long W. A modification of the Injury Severity Score that both improves accuracy and simplifies scoring. Journal of Trauma. 1997;43:922–926.',
    'Abbreviated Injury Scale (AIS) coding system.'
  ]
}

export default niss
