const calc = {
  id: 'cao2',
  name: 'Arterial Oxygen Content',
  shortName: 'CaO2',
  categoryId: 'respiratory',
  description: 'Calculated arterial oxygen content.',
  type: 'calculation',
  inputs: [
    { id: 'hb', label: 'Hemoglobin', type: 'number', unit: 'g/dL', min: 1, max: 25, step: 0.1 },
    { id: 'sao2', label: 'SaO2', type: 'number', unit: '%', min: 0, max: 100, step: 1 },
    { id: 'pao2', label: 'PaO2', type: 'number', unit: 'mmHg', min: 0, max: 800, step: 1 }
  ],
  calculate(v) {
    const hb = Number(v.hb)
    const sao2 = Number(v.sao2) / 100
    const pao2 = Number(v.pao2)
    const value = 1.34 * hb * sao2 + 0.0031 * pao2

    return {
      value,
      unit: 'mL O2/dL',
      interpretation: 'Calculated arterial oxygen content.',
      note: 'Most arterial oxygen content is hemoglobin-bound; dissolved oxygen contributes a small amount.'
    }
  }
}

export default calc
