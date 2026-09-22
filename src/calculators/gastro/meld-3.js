const meld3 = {
  id: 'meld3',
  name: 'MELD 3.0',
  shortName: 'MELD 3.0',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description:
    'Updated MELD 3.0 model incorporating bilirubin, INR, creatinine, sodium, albumin and sex.',

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
    { id: 'bilirubin', label: 'Bilirubin', unit: 'mg/dL', min: 0, step: 0.01 },
    { id: 'inr', label: 'INR', min: 0, step: 0.01 },
    { id: 'creatinine', label: 'Creatinine', unit: 'mg/dL', min: 0, step: 0.01 },
    { id: 'sodium', label: 'Sodium', unit: 'mEq/L', min: 100, max: 160, step: 0.1 },
    { id: 'albumin', label: 'Albumin', unit: 'g/dL', min: 0.5, max: 6, step: 0.1 },
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
    let albumin = Number(v.albumin)

    if (
      !['male', 'female'].includes(v.sex) ||
      ![bilirubin, inr, creatinine, sodium, albumin].every(Number.isFinite) ||
      bilirubin < 0 ||
      inr < 0 ||
      creatinine < 0 ||
      albumin <= 0 ||
      typeof v.dialysis !== 'boolean'
    ) {
      return { error: 'Please enter all MELD 3.0 variables.' }
    }

    bilirubin = Math.max(1, bilirubin)
    inr = Math.max(1, inr)
    creatinine = Math.max(1, creatinine)

    if (v.dialysis) {
      creatinine = 3
    } else {
      creatinine = Math.min(3, creatinine)
    }

    sodium = Math.min(137, Math.max(125, sodium))
    albumin = Math.min(3.5, Math.max(1.5, albumin))

    const raw =
      (v.sex === 'female' ? 1.33 : 0) +
      4.56 * Math.log(bilirubin) +
      0.82 * (137 - sodium) -
      0.24 * (137 - sodium) * Math.log(bilirubin) +
      9.09 * Math.log(inr) +
      11.14 * Math.log(creatinine) +
      1.85 * (3.5 - albumin) -
      1.83 * (3.5 - albumin) * Math.log(creatinine) +
      6

    const score = Math.max(6, Math.min(40, Math.round(raw)))

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category: 'MELD 3.0',
      note:
        'MELD 3.0 incorporates sex and albumin and models interactions involving sodium, bilirubin, albumin and creatinine.'
    }
  },

  references: [
    'Kim WR, et al. MELD 3.0: The Model for End-stage Liver Disease Updated for the Modern Era. Gastroenterology. 2021;161:1887–1895.'
  ]
}

export default meld3
