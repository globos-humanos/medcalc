const calc = {
  id: 'curb-65',
  name: 'CURB-65',
  shortName: 'CURB-65',
  categoryId: 'respiratory',
  description: 'Severity assessment for community-acquired pneumonia.',
  type: 'score',
  inputs: [
    { id: 'confusion', label: 'Confusion', type: 'boolean' },
    { id: 'urea', label: 'Blood urea', type: 'number', unit: 'mmol/L', min: 0, max: 60, step: 0.1 },
    { id: 'rr', label: 'Respiratory rate', type: 'number', unit: '/min', min: 0, max: 80, step: 1 },
    { id: 'sbp', label: 'Systolic blood pressure', type: 'number', unit: 'mmHg', min: 40, max: 250, step: 1 },
    { id: 'dbp', label: 'Diastolic blood pressure', type: 'number', unit: 'mmHg', min: 20, max: 150, step: 1 },
    { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 0, max: 120, step: 1 }
  ],
  calculate(v) {
    const score =
      (v.confusion ? 1 : 0) +
      (Number(v.urea) > 7 ? 1 : 0) +
      (Number(v.rr) >= 30 ? 1 : 0) +
      (Number(v.sbp) < 90 || Number(v.dbp) <= 60 ? 1 : 0) +
      (Number(v.age) >= 65 ? 1 : 0)

    return {
      value: score,
      unit: '/5',
      interpretation:
        score <= 1 ? 'Low-risk CURB-65 category.' :
        score === 2 ? 'Intermediate-risk category; clinical assessment of disposition is required.' :
        'Higher-risk category; consider higher-acuity assessment in the clinical context.',
      note: 'CURB-65 is a severity tool and does not replace clinical judgment.'
    }
  }
}

export default calc
