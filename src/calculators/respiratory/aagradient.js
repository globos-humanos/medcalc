const calc = {
  id: 'aa-gradient',
  name: 'A-a Gradient',
  shortName: 'A-a Gradient',
  categoryId: 'respiratory',
  description: 'Alveolar-arterial oxygen gradient for assessment of gas exchange.',
  type: 'calculation',
  inputs: [
    { id: 'fio2', label: 'FiO2', type: 'number', unit: '%', min: 21, max: 100, step: 1 },
    { id: 'pao2', label: 'PaO2', type: 'number', unit: 'mmHg', min: 0, max: 800, step: 1 },
    { id: 'paco2', label: 'PaCO2', type: 'number', unit: 'mmHg', min: 10, max: 150, step: 1 },
    { id: 'patm', label: 'Atmospheric pressure', type: 'number', unit: 'mmHg', min: 300, max: 850, step: 1 },
    { id: 'ph2o', label: 'Water vapor pressure', type: 'number', unit: 'mmHg', min: 40, max: 50, step: 1 },
    { id: 'rq', label: 'Respiratory quotient', type: 'number', unit: '', min: 0.7, max: 1.2, step: 0.01 }
  ],
  calculate(v) {
    const fio2 = Number(v.fio2) / 100
    const pao2 = Number(v.pao2)
    const paco2 = Number(v.paco2)
    const patm = Number(v.patm)
    const ph2o = Number(v.ph2o)
    const rq = Number(v.rq)

    const pao2Alv = fio2 * (patm - ph2o) - paco2 / rq
    const gradient = pao2Alv - pao2

    return {
      value: gradient,
      unit: 'mmHg',
      interpretation: gradient <= 10
        ? 'A-a gradient is within a typical normal range for a young adult on room air.'
        : 'A-a gradient is elevated; consider V/Q mismatch, diffusion limitation, or shunt in the clinical context.',
      note: 'Expected normal A-a gradient increases with age and depends on FiO2.'
    }
  }
}

export default calc
