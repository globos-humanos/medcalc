const calc = {
  id: 'p-possum',
  name: 'P-POSSUM',
  shortName: 'P-POSSUM',
  categoryId: 'surgery',
  description: 'Portsmouth modification of POSSUM for predicted postoperative mortality.',
  type: 'score',

  inputs: [
    {
      id: 'physiologicalScore',
      label: 'POSSUM physiological score',
      type: 'number',
      min: 12,
      max: 96,
      step: 1
    },
    {
      id: 'operativeScore',
      label: 'POSSUM operative severity score',
      type: 'number',
      min: 6,
      max: 48,
      step: 1
    }
  ],

  calculate(v) {
    const ps = Number(v.physiologicalScore)
    const os = Number(v.operativeScore)

    if (!Number.isFinite(ps) || !Number.isFinite(os)) {
      return { error: 'Enter valid POSSUM physiological and operative scores.' }
    }

    const logit = -9.065 + (0.1692 * ps) + (0.1550 * os)
    const mortality = 100 * Math.exp(logit) / (1 + Math.exp(logit))

    return {
      value: Number(mortality.toFixed(1)),
      unit: '% predicted mortality',
      interpretation: 'P-POSSUM predicted postoperative mortality',
      note: 'P-POSSUM uses the POSSUM physiological and operative severity scores. It is intended for risk prediction and surgical audit, not as a standalone decision rule.'
    }
  }
}

export default calc
