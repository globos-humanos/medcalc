const calc = {
  id: 'rox-index',
  name: 'ROX Index',
  shortName: 'ROX',
  categoryId: 'respiratory',
  description: 'Oxygenation index used to assess response to high-flow nasal cannula.',
  type: 'calculation',
  inputs: [
    { id: 'spo2', label: 'SpO2', type: 'number', unit: '%', min: 50, max: 100, step: 1 },
    { id: 'fio2', label: 'FiO2', type: 'number', unit: '%', min: 21, max: 100, step: 1 },
    { id: 'rr', label: 'Respiratory rate', type: 'number', unit: '/min', min: 1, max: 100, step: 1 }
  ],
  calculate(v) {
    const ratio = Number(v.spo2) / (Number(v.fio2) / 100)
    const rox = ratio / Number(v.rr)

    return {
      value: rox,
      unit: '',
      interpretation:
        rox >= 4.88 ? 'ROX is at or above the original 12-hour threshold described for HFNC assessment.' :
        'ROX is below the original 12-hour threshold; increased risk of HFNC failure was observed in the original study.',
      note: 'ROX thresholds depend on timing and population. Do not apply a single cutoff universally.'
    }
  }
}

export default calc
