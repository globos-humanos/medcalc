const calc = {
  id: 'murray-lung-injury',
  name: 'Murray Lung Injury Score',
  shortName: 'Murray',
  categoryId: 'respiratory',
  description: 'Four-component Lung Injury Score using chest radiography, oxygenation, PEEP and compliance.',
  type: 'score',
  inputs: [
    {
      id: 'cxr',
      label: 'Chest radiograph quadrants with consolidation',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 1, label: '1 quadrant' },
        { value: 2, label: '2 quadrants' },
        { value: 3, label: '3 quadrants' },
        { value: 4, label: '4 quadrants' }
      ]
    },
    { id: 'pf', label: 'PaO2/FiO2 ratio', type: 'number', unit: 'mmHg', min: 20, max: 800, step: 1 },
    { id: 'peep', label: 'PEEP', type: 'number', unit: 'cmH2O', min: 0, max: 40, step: 1 },
    { id: 'compliance', label: 'Respiratory system compliance', type: 'number', unit: 'mL/cmH2O', min: 1, max: 150, step: 1 }
  ],
  calculate(v) {
    const pf = Number(v.pf)
    const peep = Number(v.peep)
    const compliance = Number(v.compliance)

    const hypoxemia =
      pf >= 300 ? 0 :
      pf >= 225 ? 1 :
      pf >= 175 ? 2 :
      pf >= 100 ? 3 : 4

    const peepScore =
      peep <= 5 ? 0 :
      peep <= 8 ? 1 :
      peep <= 11 ? 2 :
      peep <= 14 ? 3 : 4

    const complianceScore =
      compliance >= 80 ? 0 :
      compliance >= 60 ? 1 :
      compliance >= 40 ? 2 :
      compliance >= 20 ? 3 : 4

    const components = [
      Number(v.cxr),
      hypoxemia,
      peepScore,
      complianceScore
    ]

    const score = components.reduce((a, b) => a + b, 0) / 4

    return {
      value: score,
      displayValue: score.toFixed(2),
      unit: 'LIS',
      interpretation:
        score === 0 ? 'No lung injury by the score.' :
        score <= 2.5 ? 'Moderate lung injury range.' :
        'Severe lung injury range.',
      note: 'Murray LIS is the average of four component scores. It predates the Berlin ARDS definition.'
    }
  }
}

export default calc
