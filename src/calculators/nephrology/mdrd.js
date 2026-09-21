const calc = {
  id: 'mdrd',
  name: 'MDRD eGFR',
  shortName: 'MDRD',
  categoryId: 'nephrology',
  description: 'Four-variable MDRD equation for estimated glomerular filtration rate.',
  type: 'calculation',

  inputs: [
    {
      id: 'creatinine',
      label: 'Serum creatinine',
      type: 'number',
      unit: 'mg/dL',
      min: 0.1,
      step: 0.01
    },
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      unit: 'years',
      min: 18,
      max: 120,
      step: 1
    },
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        {
          value: 'male',
          label: 'Male'
        },
        {
          value: 'female',
          label: 'Female'
        }
      ]
    }
  ],

  calculate(v) {
    const creatinine = Number(v.creatinine)
    const age = Number(v.age)

    if (
      !Number.isFinite(creatinine) ||
      !Number.isFinite(age) ||
      creatinine <= 0 ||
      age < 18
    ) {
      return {
        error: 'Please enter a valid adult age and serum creatinine.'
      }
    }

    const femaleFactor =
      v.sex === 'female'
        ? 0.742
        : 1

    const egfr =
      175 *
      Math.pow(creatinine, -1.154) *
      Math.pow(age, -0.203) *
      femaleFactor

    return {
      value: Number(egfr.toFixed(1)),
      unit: 'mL/min/1.73 m²',
      interpretation:
        egfr >= 90
          ? 'G1 range'
          : egfr >= 60
            ? 'G2 range'
            : egfr >= 45
              ? 'G3a range'
              : egfr >= 30
                ? 'G3b range'
                : egfr >= 15
                  ? 'G4 range'
                  : 'G5 range',
      note: 'Four-variable MDRD equation. The original MDRD equation included a historical race coefficient; this implementation uses the race-free form.'
    }
  },

  references: [
    'Levey et al. MDRD Study equation.',
    'NIDDK: Previous eGFR Equations for Reference.'
  ]
}

export default calc