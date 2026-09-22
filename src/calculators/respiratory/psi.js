const calc = {
  id: 'psi-port',
  name: 'Pneumonia Severity Index',
  shortName: 'PSI / PORT',
  categoryId: 'respiratory',
  description: 'Pneumonia Severity Index for community-acquired pneumonia.',
  type: 'score',

  inputs: [
    { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 0, max: 120, step: 1 },
    { id: 'female', label: 'Female sex', type: 'boolean' },
    { id: 'nursing', label: 'Nursing-home resident', type: 'boolean' },
    { id: 'cancer', label: 'Malignancy', type: 'boolean' },
    { id: 'liver', label: 'Liver disease', type: 'boolean' },
    { id: 'chf', label: 'Congestive heart failure', type: 'boolean' },
    { id: 'cva', label: 'Cerebrovascular disease', type: 'boolean' },
    { id: 'renal', label: 'Renal disease', type: 'boolean' },
    { id: 'rr', label: 'Respiratory rate', type: 'number', unit: '/min', min: 0, max: 100, step: 1 },
    { id: 'sbp', label: 'Systolic BP', type: 'number', unit: 'mmHg', min: 30, max: 250, step: 1 },
    { id: 'temp', label: 'Temperature', type: 'number', unit: 'C', min: 25, max: 45, step: 0.1 },
    { id: 'pulse', label: 'Pulse', type: 'number', unit: '/min', min: 20, max: 250, step: 1 },
    { id: 'ph', label: 'Arterial pH', type: 'number', unit: '', min: 6.5, max: 8, step: 0.01 },
    { id: 'bun', label: 'BUN', type: 'number', unit: 'mg/dL', min: 0, max: 200, step: 1 },
    { id: 'na', label: 'Sodium', type: 'number', unit: 'mmol/L', min: 80, max: 200, step: 1 },
    { id: 'glucose', label: 'Glucose', type: 'number', unit: 'mg/dL', min: 20, max: 1000, step: 1 },
    { id: 'hct', label: 'Hematocrit', type: 'number', unit: '%', min: 5, max: 70, step: 0.1 },
    { id: 'pao2', label: 'PaO2', type: 'number', unit: 'mmHg', min: 20, max: 500, step: 1 },
    { id: 'pleural', label: 'Pleural effusion', type: 'boolean' }
  ],

  calculate(v) {
    const age = Number(v.age)

    const score =
      age -
      (v.female ? 10 : 0) +
      (v.nursing ? 10 : 0) +
      (v.cancer ? 30 : 0) +
      (v.liver ? 20 : 0) +
      (v.chf ? 10 : 0) +
      (v.cva ? 10 : 0) +
      (v.renal ? 10 : 0) +
      (Number(v.rr) >= 30 ? 20 : 0) +
      (Number(v.sbp) < 90 ? 20 : 0) +
      (Number(v.temp) < 35 || Number(v.temp) >= 40 ? 15 : 0) +
      (Number(v.pulse) >= 125 ? 10 : 0) +
      (Number(v.ph) < 7.35 ? 30 : 0) +
      (Number(v.bun) >= 30 ? 20 : 0) +
      (Number(v.na) < 130 ? 20 : 0) +
      (Number(v.glucose) >= 250 ? 10 : 0) +
      (Number(v.hct) < 30 ? 10 : 0) +
      (Number(v.pao2) < 60 ? 10 : 0) +
      (v.pleural ? 10 : 0)

    /*
     * PSI has a separate Class I rule before the point score.
     * This implementation reports the point-score class.
     *
     * Point-score classes:
     * II  <=70
     * III 71-90
     * IV  91-130
     * V   >130
     */

    const cls =
      score <= 70 ? 'II' :
      score <= 90 ? 'III' :
      score <= 130 ? 'IV' : 'V'

    return {
      value: score,
      unit: 'points',
      interpretation: 'PSI Risk Class ' + cls,
      note: 'PSI Class I is determined by a separate two-step low-risk algorithm. Once the point score is calculated, classes are II (≤70), III (71–90), IV (91–130), and V (>130).'
    }
  }
}

export default calc
