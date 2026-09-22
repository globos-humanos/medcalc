const calc = {
  id: 'spesi',
  name: 'Simplified PESI',
  shortName: 'sPESI',
  categoryId: 'respiratory',
  description: 'Simplified Pulmonary Embolism Severity Index.',
  type: 'score',
  inputs: [
    { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 18, max: 120, step: 1 },
    { id: 'cancer', label: 'Cancer', type: 'boolean' },
    { id: 'cardiopulm', label: 'Chronic cardiopulmonary disease', type: 'boolean' },
    { id: 'pulse', label: 'Heart rate', type: 'number', unit: '/min', min: 20, max: 250, step: 1 },
    { id: 'sbp', label: 'Systolic BP', type: 'number', unit: 'mmHg', min: 30, max: 250, step: 1 },
    { id: 'spo2', label: 'Oxygen saturation', type: 'number', unit: '%', min: 50, max: 100, step: 1 }
  ],
  calculate(v) {
    const score =
      (Number(v.age) >= 80 ? 1 : 0) +
      (v.cancer ? 1 : 0) +
      (v.cardiopulm ? 1 : 0) +
      (Number(v.pulse) >= 110 ? 1 : 0) +
      (Number(v.sbp) < 100 ? 1 : 0) +
      (Number(v.spo2) < 90 ? 1 : 0)

    return {
      value: score,
      unit: '/6',
      interpretation: score === 0
        ? 'sPESI = 0: low-risk category by the simplified score.'
        : 'sPESI >=1: not low-risk by the simplified score.',
      note: 'sPESI is a prognostic tool for confirmed pulmonary embolism.'
    }
  }
}

export default calc
