const calc = {
  id: 'p-possum',
  name: 'P-POSSUM',
  shortName: 'P-POSSUM',
  categoryId: 'surgery',
  description: 'Portsmouth modification of POSSUM for predicted postoperative mortality.',

  inputs: [
    {
      id: 'physiologicalScore',
      label: 'Physiological Score',
      type: 'number',
      min: 12,
      max: 96,
      step: 1
    },
    {
      id: 'operativeScore',
      label: 'Operative Severity Score',
      type: 'number',
      min: 6,
      max: 48,
      step: 1
    }
  ],

  calculate(v) {
    const ps = Number(v.physiologicalScore)
    const os = Number(v.operativeScore)

    if (
      !Number.isFinite(ps) ||
      !Number.isFinite(os) ||
      ps < 12 ||
      os < 6
    ) {
      return {
        error: 'Please enter valid POSSUM physiological and operative scores.'
      }
    }

    const mortalityLogit =
      -9.065 +
      (0.1692 * ps) +
      (0.1550 * os)

    const mortality =
      100 *
      Math.exp(mortalityLogit) /
      (1 + Math.exp(mortalityLogit))

    return {
      value: Number(mortality.toFixed(1)),
      unit: '% predicted mortality',
      interpretation: 'P-POSSUM predicted mortality',
      note: 'P-POSSUM uses the POSSUM physiological and operative scores and a modified mortality equation. It is intended for surgical risk prediction and audit, not as a standalone clinical decision.'
    }
  },

  references: [
    'Prytherch DR et al. POSSUM and Portsmouth POSSUM for predicting mortality. Br J Surg. 1998.'
  ]
}

export default calc