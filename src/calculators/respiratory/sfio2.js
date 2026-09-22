const calc = {
  id: 'sf-ratio',
  name: 'S/F Ratio',
  shortName: 'S/F Ratio',
  categoryId: 'respiratory',
  description: 'SpO2/FiO2 ratio as a non-invasive oxygenation index.',
  type: 'calculation',
  inputs: [
    { id: 'spo2', label: 'SpO2', type: 'number', unit: '%', min: 50, max: 100, step: 1 },
    { id: 'fio2', label: 'FiO2', type: 'number', unit: '%', min: 21, max: 100, step: 1 }
  ],
  calculate(v) {
    const ratio = Number(v.spo2) / (Number(v.fio2) / 100)

    return {
      value: ratio,
      unit: '',
      interpretation:
        ratio >= 315 ? 'Higher S/F ratio; oxygenation is relatively preserved.' :
        ratio >= 235 ? 'Intermediate oxygenation impairment.' :
        'Low S/F ratio; significant oxygenation impairment.',
      note: 'S/F ratio is an approximation and is affected by the nonlinear oxyhemoglobin dissociation curve.'
    }
  }
}

export default calc
