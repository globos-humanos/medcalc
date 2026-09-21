const cockcroftGault = {
  id: 'cockcroft-gault',
  name: 'Creatinine Clearance (Cockcroft-Gault)',
  shortName: 'Cockcroft-Gault',
  type: 'calculator',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Estimates creatinine clearance using age, sex, body weight, and serum creatinine.',
  keywords: ['Cockcroft-Gault', 'creatinine clearance', 'CrCl', 'renal function', 'kidney'],
  aliases: ['Cockcroft Gault', 'CrCl'],
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
    { id: 'weight', label: 'Body Weight', type: 'number', unit: 'kg', min: 1, step: 0.1 },
    { id: 'creatinine', label: 'Serum Creatinine', type: 'number', unit: 'mg/dL', min: 0.1, step: 0.1 }
  ],
  calculate(values) {
    const age = Number(values.age)
    const weight = Number(values.weight)
    const creatinine = Number(values.creatinine)

    if (!values.sex || !age || age <= 0 || !weight || weight <= 0 || !creatinine || creatinine <= 0) {
      return { error: 'Please enter valid Cockcroft-Gault inputs.' }
    }

    let crcl = ((140 - age) * weight) / (72 * creatinine)
    if (values.sex === 'female') crcl *= 0.85

    return {
      value: crcl,
      displayValue: crcl.toFixed(1),
      unit: 'mL/min',
      category: 'Cockcroft-Gault creatinine clearance'
    }
  },
  references: [
    'Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron. 1976;16:31–41.',
    'MDCalc — Creatinine Clearance (Cockcroft-Gault Equation).'
  ]
}

export default cockcroftGault
