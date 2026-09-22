const calc = {
  id: 'alveolar-gas-equation',
  name: 'Alveolar Gas Equation',
  shortName: 'Alveolar Gas Equation',
  categoryId: 'respiratory',
  description: 'Estimates alveolar oxygen tension.',
  type: 'calculation',
  inputs: [
    { id: 'fio2', label: 'FiO2', type: 'number', unit: '%', min: 21, max: 100, step: 1 },
    { id: 'patm', label: 'Atmospheric pressure', type: 'number', unit: 'mmHg', min: 300, max: 850, step: 1 },
    { id: 'ph2o', label: 'Water vapor pressure', type: 'number', unit: 'mmHg', min: 40, max: 50, step: 1 },
    { id: 'paco2', label: 'PaCO2', type: 'number', unit: 'mmHg', min: 10, max: 150, step: 1 },
    { id: 'rq', label: 'Respiratory quotient', type: 'number', unit: '', min: 0.7, max: 1.2, step: 0.01 }
  ],
  calculate(v) {
    const fio2 = Number(v.fio2) / 100
    const patm = Number(v.patm)
    const ph2o = Number(v.ph2o)
    const paco2 = Number(v.paco2)
    const rq = Number(v.rq)

    const pao2 = fio2 * (patm - ph2o) - paco2 / rq

    return {
      value: pao2,
      unit: 'mmHg',
      interpretation: 'Estimated alveolar oxygen tension.',
      note: 'Use with measured PaO2 to calculate the A-a gradient.'
    }
  }
}

export default calc
