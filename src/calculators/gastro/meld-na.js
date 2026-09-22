const meldNa = {
  id: 'meld-na',
  name: 'MELD-Na Score',
  shortName: 'MELD-Na',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description:
    'Classic MELD-Na calculation using bilirubin, INR, creatinine and sodium.',

  inputs: [
    { id: 'bilirubin', label: 'Bilirubin', unit: 'mg/dL', min: 0, step: 0.01 },
    { id: 'inr', label: 'INR', min: 0, step: 0.01 },
    { id: 'creatinine', label: 'Creatinine', unit: 'mg/dL', min: 0, step: 0.01 },
    { id: 'sodium', label: 'Sodium', unit: 'mEq/L', min: 100, max: 160, step: 0.1 },
    {
      id: 'dialysis',
      label: '≥2 dialysis treatments in prior 7 days or ≥24 h CVVHD',
      type: 'boolean'
    }
  ],

  calculate(v) {
    let bilirubin = Number(v.bilirubin)
    let inr = Number(v.inr)
    let creatinine = Number(v.creatinine)
    let sodium = Number(v.sodium)

    if (
      ![bilirubin, inr, creatinine, sodium].every(Number.isFinite) ||
      bilirubin < 0 ||
      inr < 0 ||
      creatinine < 0 ||
      typeof v.dialysis !== 'boolean'
    ) {
      return { error: 'Please enter all MELD-Na variables.' }
    }

    bilirubin = Math.max(1, bilirubin)
    inr = Math.max(1, inr)
    creatinine = Math.max(1, creatinine)

    if (v.dialysis) {
      creatinine = 4
    } else {
      creatinine = Math.min(4, creatinine)
    }

    sodium = Math.min(137, Math.max(125, sodium))

    const meld =
      3.78 * Math.log(bilirubin) +
      11.2 * Math.log(inr) +
      9.57 * Math.log(creatinine) +
      6.43

    const meldNa =
      meld +
      1.32 * (137 - sodium) -
      0.033 * meld * (137 - sodium)

    const score = Math.max(6, Math.min(40, Math.round(meldNa)))

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category: 'Classic MELD-Na',
      note:
        'Classic MELD-Na adds a sodium correction to the laboratory MELD formulation. It is distinct from MELD 3.0.'
    }
  },

  references: [
    'OPTN/UNOS MELD-Na formulation.',
    'MELD-Na = MELD + 1.32 × (137 − Na) − [0.033 × MELD × (137 − Na)].'
  ]
}

export default meldNa
