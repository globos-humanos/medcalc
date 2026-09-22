const pitt = {
  id: 'pitt-bacteremia',
  name: 'Pitt Bacteremia Score',
  shortName: 'Pitt',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'Clinical severity score for bloodstream infection.',
  keywords: ['Pitt', 'bacteremia', 'bloodstream infection'],

  inputs: [
    {
      id: 'temp',
      label: 'Temperature',
      type: 'number',
      unit: '°C',
      min: 25,
      max: 45,
      step: 0.1
    },
    {
      id: 'mental',
      label: 'Mental status',
      type: 'choice',
      options: [
        { value: 0, label: 'Alert' },
        { value: 1, label: 'Disoriented' },
        { value: 2, label: 'Stuporous' },
        { value: 4, label: 'Comatose' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'hypotension',
      label: 'Hypotension',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 2, label: 'SBP <90 mmHg or vasopressor use' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'vent',
      label: 'Mechanical ventilation',
      type: 'boolean'
    },
    {
      id: 'cardiac',
      label: 'Cardiac arrest',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const temp = Number(v.temp)

    let temperaturePoints = 0

    if (temp <= 35) {
      temperaturePoints = 2
    } else if (temp <= 36) {
      temperaturePoints = 1
    } else if (temp >= 39 && temp < 40) {
      temperaturePoints = 1
    } else if (temp >= 40) {
      temperaturePoints = 2
    }

    const score =
      temperaturePoints +
      Number(v.mental) +
      Number(v.hypotension) +
      (v.vent ? 2 : 0) +
      (v.cardiac ? 4 : 0)

    return {
      value: score,
      displayValue: `${score} points`,
      category:
        score === 0
          ? 'Lowest severity category'
          : score <= 3
            ? 'Intermediate severity range'
            : 'High severity range',
      interpretation: `Pitt Bacteremia Score = ${score}.`,
      note:
        'The Pitt score is a severity/prognostic tool for bacteremia and should be interpreted in the context of the underlying infection.'
    }
  },

  references: ['Pitt bacteremia score']
}

export default pitt

