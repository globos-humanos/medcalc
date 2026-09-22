const sirs = {
  id: 'sirs',
  name: 'SIRS Criteria',
  shortName: 'SIRS',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'Systemic Inflammatory Response Syndrome criteria.',
  keywords: ['SIRS', 'inflammation', 'sepsis'],

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
      id: 'hr',
      label: 'Heart rate',
      type: 'number',
      unit: '/min',
      min: 20,
      max: 250
    },
    {
      id: 'rr',
      label: 'Respiratory rate',
      type: 'number',
      unit: '/min',
      min: 0,
      max: 100
    },
    {
      id: 'paco2',
      label: 'PaCO₂',
      type: 'number',
      unit: 'mmHg',
      min: 10,
      max: 150,
      step: 0.1
    },
    {
      id: 'wbc',
      label: 'WBC count',
      type: 'number',
      unit: '×10⁹/L',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'bands',
      label: 'Bands ≥10%',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const temp = Number(v.temp)
    const hr = Number(v.hr)
    const rr = Number(v.rr)
    const paco2 = Number(v.paco2)
    const wbc = Number(v.wbc)

    const temperature = temp > 38 || temp < 36
    const tachycardia = hr > 90
    const respiratory =
      rr > 20 || paco2 < 32
    const leukocyte =
      wbc > 12 || wbc < 4 || v.bands === true

    const score =
      Number(temperature) +
      Number(tachycardia) +
      Number(respiratory) +
      Number(leukocyte)

    return {
      value: score,
      displayValue: `${score}/4`,
      category: score >= 2 ? 'SIRS criteria met' : 'SIRS criteria not met',
      interpretation:
        score >= 2
          ? 'At least 2 SIRS criteria are present.'
          : 'Fewer than 2 SIRS criteria are present.',
      note:
        'SIRS is a nonspecific inflammatory response framework and does not by itself diagnose sepsis.'
    }
  },

  references: ['SIRS consensus criteria']
}

export default sirs
