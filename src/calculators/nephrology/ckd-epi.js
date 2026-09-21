const ckdEpi = {
  id: 'ckd-epi',
  name: 'CKD-EPI 2021 eGFR',
  shortName: 'CKD-EPI',
  type: 'calculator',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Estimates eGFR from age, sex, and serum creatinine using the 2021 race-free CKD-EPI creatinine equation.',
  keywords: ['CKD-EPI', 'eGFR', 'GFR', 'creatinine', 'kidney function', 'CKD'],
  aliases: ['CKD EPI', '2021 CKD-EPI', 'eGFR calculator'],
  inputs: [
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]
    },
    { id: 'age', label: 'Age', type: 'number', unit: 'years', min: 18, step: 1 },
    { id: 'creatinine', label: 'Serum Creatinine', type: 'number', unit: 'mg/dL', min: 0.1, step: 0.01 }
  ],
  calculate(values) {
    const age = Number(values.age)
    const creatinine = Number(values.creatinine)

    if (!values.sex || !age || age <= 0 || !creatinine || creatinine <= 0) {
      return { error: 'Please enter valid CKD-EPI inputs.' }
    }

    const female = values.sex === 'female'
    const k = female ? 0.7 : 0.9
    const alpha = female ? -0.241 : -0.302

    const egfr =
      142 *
      Math.pow(Math.min(creatinine / k, 1), alpha) *
      Math.pow(Math.max(creatinine / k, 1), -1.2) *
      Math.pow(0.9938, age) *
      (female ? 1.012 : 1)

    return {
      value: egfr,
      displayValue: egfr.toFixed(1),
      unit: 'mL/min/1.73 m²',
      category:
        egfr >= 90 ? 'G1 range' :
        egfr >= 60 ? 'G2 range' :
        egfr >= 45 ? 'G3a range' :
        egfr >= 30 ? 'G3b range' :
        egfr >= 15 ? 'G4 range' :
        'G5 range'
    }
  },
  references: [
    'Inker LA, et al. New Creatinine- and Cystatin C-Based Equations to Estimate GFR without Race. N Engl J Med. 2021;385:1737–1749.',
    'MDCalc — CKD-EPI Equations for Glomerular Filtration Rate.'
  ]
}

export default ckdEpi
