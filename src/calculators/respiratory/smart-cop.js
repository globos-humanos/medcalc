const calc = {
  id: 'smart-cop',
  name: 'SMART-COP',
  shortName: 'SMART-COP',
  categoryId: 'respiratory',
  description: 'Predicts the need for intensive respiratory or vasopressor support in community-acquired pneumonia.',
  type: 'score',
  inputs: [
    { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 18, max: 120, step: 1 },
    { id: 'sbp', label: 'Systolic BP', type: 'number', unit: 'mmHg', min: 40, max: 250, step: 1 },
    { id: 'multilobar', label: 'Multilobar infiltrates', type: 'boolean' },
    { id: 'albumin', label: 'Albumin <3.5 g/dL', type: 'boolean' },
    { id: 'rr', label: 'Respiratory rate', type: 'number', unit: '/min', min: 0, max: 100, step: 1 },
    { id: 'hr', label: 'Heart rate', type: 'number', unit: '/min', min: 20, max: 250, step: 1 },
    { id: 'confusion', label: 'New confusion', type: 'boolean' },
    { id: 'pao2', label: 'PaO2', type: 'number', unit: 'mmHg', min: 20, max: 500, step: 1 },
    { id: 'spo2', label: 'SpO2', type: 'number', unit: '%', min: 50, max: 100, step: 1 },
    { id: 'fio2', label: 'FiO2 if receiving oxygen', type: 'number', unit: '%', min: 21, max: 100, step: 1 },
    { id: 'onOxygen', label: 'Receiving supplemental oxygen', type: 'boolean' },
    { id: 'ph', label: 'Arterial pH', type: 'number', unit: '', min: 6.5, max: 8, step: 0.01 }
  ],
  calculate(v) {
    const age = Number(v.age)
    const rrThreshold = age <= 50 ? 25 : 30
    const oxygenLow = age <= 50
      ? Number(v.pao2) < 70 || Number(v.spo2) <= 93 || (v.onOxygen && Number(v.pao2) / (Number(v.fio2) / 100) < 333)
      : Number(v.pao2) < 60 || Number(v.spo2) <= 90 || (v.onOxygen && Number(v.pao2) / (Number(v.fio2) / 100) < 250)

    const score =
      (Number(v.sbp) < 90 ? 2 : 0) +
      (v.multilobar ? 1 : 0) +
      (v.albumin ? 1 : 0) +
      (Number(v.rr) >= rrThreshold ? 1 : 0) +
      (Number(v.hr) >= 125 ? 1 : 0) +
      (v.confusion ? 1 : 0) +
      (oxygenLow ? 2 : 0) +
      (Number(v.ph) < 7.35 ? 2 : 0)

    return {
      value: score,
      unit: '/11',
      interpretation:
        score <= 2 ? 'Lower SMART-COP score.' :
        score <= 4 ? 'Increased risk; score should be interpreted with the clinical picture.' :
        'SMART-COP suggests increased likelihood of intensive respiratory or vasopressor support.',
      note: 'A score of 3 or more was used in the original framework to identify patients at increased risk of requiring IRVS.'
    }
  }
}

export default calc
