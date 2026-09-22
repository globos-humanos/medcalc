const calc = {
  id: 'pesi',
  name: 'PESI Score',
  shortName: 'PESI',
  categoryId: 'respiratory',
  description: 'Pulmonary Embolism Severity Index.',
  type: 'score',
  inputs: [
    { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 18, max: 120, step: 1 },
    { id: 'male', label: 'Male sex', type: 'boolean' },
    { id: 'cancer', label: 'Cancer', type: 'boolean' },
    { id: 'chf', label: 'Heart failure', type: 'boolean' },
    { id: 'lung', label: 'Chronic lung disease', type: 'boolean' },
    { id: 'pulse', label: 'Heart rate', type: 'number', unit: '/min', min: 20, max: 250, step: 1 },
    { id: 'sbp', label: 'Systolic BP', type: 'number', unit: 'mmHg', min: 30, max: 250, step: 1 },
    { id: 'rr', label: 'Respiratory rate', type: 'number', unit: '/min', min: 0, max: 100, step: 1 },
    { id: 'temp', label: 'Temperature', type: 'number', unit: 'C', min: 25, max: 45, step: 0.1 },
    { id: 'mental', label: 'Altered mental status', type: 'boolean' },
    { id: 'spo2', label: 'Oxygen saturation', type: 'number', unit: '%', min: 50, max: 100, step: 1 }
  ],
  calculate(v) {
    const score =
      Number(v.age) +
      (v.male ? 10 : 0) +
      (v.cancer ? 30 : 0) +
      (v.chf ? 10 : 0) +
      (v.lung ? 10 : 0) +
      (Number(v.pulse) >= 110 ? 20 : 0) +
      (Number(v.sbp) < 100 ? 30 : 0) +
      (Number(v.rr) >= 30 ? 20 : 0) +
      (Number(v.temp) < 36 ? 20 : 0) +
      (v.mental ? 60 : 0) +
      (Number(v.spo2) < 90 ? 20 : 0)

    const cls =
      score <= 65 ? 'I' :
      score <= 85 ? 'II' :
      score <= 105 ? 'III' :
      score <= 125 ? 'IV' : 'V'

    return {
      value: score,
      unit: 'points',
      interpretation: `PESI Risk Class ${cls}.`,
      note: 'PESI is a prognostic severity tool for confirmed pulmonary embolism.'
    }
  }
}

export default calc
