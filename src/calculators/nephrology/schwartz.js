const calc = {
  id: 'schwartz',
  name: 'Schwartz eGFR',
  shortName: 'Schwartz',
  categoryId: 'nephrology',
  description: 'Bedside Schwartz equation for estimating GFR in children.',
  type: 'calculation',

  inputs: [
    {
      id: 'height',
      label: 'Height',
      type: 'number',
      unit: 'cm',
      min: 30,
      max: 250,
      step: 0.1
    },
    {
      id: 'creatinine',
      label: 'Serum creatinine',
      type: 'number',
      unit: 'mg/dL',
      min: 0.01,
      step: 0.01
    }
  ],

  calculate(v) {
    const height = Number(v.height)
    const creatinine = Number(v.creatinine)

    if (
      !Number.isFinite(height) ||
      !Number.isFinite(creatinine) ||
      height <= 0 ||
      creatinine <= 0
    ) {
      return {
        error: 'Please enter valid height and serum creatinine values.'
      }
    }

    const egfr =
      0.413 *
      (height / creatinine)

    return {
      value: Number(egfr.toFixed(1)),
      unit: 'mL/min/1.73 m²',
      interpretation:
        egfr >= 90
          ? 'Normal or mildly increased range'
          : egfr >= 60
            ? 'Mildly decreased range'
            : egfr >= 30
              ? 'Moderately decreased range'
              : egfr >= 15
                ? 'Severely decreased range'
                : 'Kidney failure range',
      note: 'Bedside Schwartz equation: eGFR = 0.413 × height (cm) / serum creatinine (mg/dL). Intended for pediatric use.'
    }
  },

  references: [
    'Schwartz et al. Bedside CKiD equation.',
    'Pediatric creatinine-based GFR literature.'
  ]
}

export default calc