const meld = {
  id: 'meld',
  name: 'MELD Score',
  shortName: 'MELD',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description:
    'Original laboratory MELD calculation using bilirubin, INR and creatinine.',

  inputs: [
    { id: 'bilirubin', label: 'Bilirubin', unit: 'mg/dL', min: 0, step: 0.01 },
    { id: 'inr', label: 'INR', min: 0, step: 0.01 },
    { id: 'creatinine', label: 'Creatinine', unit: 'mg/dL', min: 0, step: 0.01 },
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

    if (
      ![bilirubin, inr, creatinine].every(Number.isFinite) ||
      bilirubin < 0 ||
      inr < 0 ||
      creatinine < 0 ||
      typeof v.dialysis !== 'boolean'
    ) {
      return { error: 'Please enter all MELD variables.' }
    }

    bilirubin = Math.max(1, bilirubin)
    inr = Math.max(1, inr)
    creatinine = Math.max(1, creatinine)

    if (v.dialysis) {
      creatinine = 4
    } else {
      creatinine = Math.min(4, creatinine)
    }

    const raw =
      3.78 * Math.log(bilirubin) +
      11.2 * Math.log(inr) +
      9.57 * Math.log(creatinine) +
      6.43

    const score = Math.max(6, Math.min(40, Math.round(raw)))

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category: 'Original MELD',
      note:
        'This is the original laboratory MELD formulation and is distinct from MELD-Na and MELD 3.0.'
    }
  },

  references: [
    'Original MELD formulation.',
    'MELD 3.0 publication describes the standard MELD and MELD-Na preprocessing conventions.'
  ]
}

export default meld
