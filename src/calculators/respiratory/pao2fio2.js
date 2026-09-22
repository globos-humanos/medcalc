const calc = {
  id: 'pao2-fio2',
  name: 'P/F Ratio',
  shortName: 'P/F Ratio',
  categoryId: 'respiratory',
  description: 'PaO2/FiO2 ratio for assessment of oxygenation.',
  type: 'calculation',
  inputs: [
    { id: 'pao2', label: 'PaO2', type: 'number', unit: 'mmHg', min: 0, max: 800, step: 1 },
    { id: 'fio2', label: 'FiO2', type: 'number', unit: '%', min: 21, max: 100, step: 1 }
  ],
  calculate(v) {
    const ratio = Number(v.pao2) / (Number(v.fio2) / 100)

    return {
      value: ratio,
      unit: '',
      interpretation:
        ratio >= 300 ? 'Preserved oxygenation by P/F ratio.' :
        ratio >= 200 ? 'Reduced oxygenation.' :
        ratio >= 100 ? 'Marked oxygenation impairment.' :
        'Severe oxygenation impairment.',
      note: 'Interpret with ventilatory support, PEEP, and the clinical context.'
    }
  }
}

export default calc
