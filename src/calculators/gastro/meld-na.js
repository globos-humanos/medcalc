const meldNa = {
  id: 'meld-na',
  name: 'MELD-Na Score',
  shortName: 'MELD-Na',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology & Hepatology',
  description: 'Calculates the classic MELD-Na score from bilirubin, INR, creatinine, and sodium.',
  keywords: [
    'MELD-Na',
    'MELD Na',
    'MELD',
    'Model for End-Stage Liver Disease',
    'liver disease',
    'cirrhosis',
    'sodium',
    'bilirubin',
    'INR',
    'creatinine'
  ],
  aliases: [
    'MELD sodium',
    'MELD-Na',
    'MELD Na',
    'UNOS MELD-Na'
  ],
  inputs: [
    {
      id: 'bilirubin',
      label: 'Bilirubin',
      type: 'number',
      unit: 'mg/dL',
      min: 0,
      step: 0.01
    },
    {
      id: 'inr',
      label: 'INR',
      type: 'number',
      unit: '',
      min: 0,
      step: 0.01
    },
    {
      id: 'creatinine',
      label: 'Serum Creatinine',
      type: 'number',
      unit: 'mg/dL',
      min: 0,
      step: 0.01
    },
    {
      id: 'sodium',
      label: 'Serum Sodium',
      type: 'number',
      unit: 'mEq/L',
      min: 0,
      step: 0.1
    },
    {
      id: 'dialysis',
      label: '≥2 dialysis treatments in the prior 7 days OR ≥24 h CVVHD',
      type: 'boolean'
    }
  ],
  calculate(values) {
    let bilirubin = Number(values.bilirubin)
    let inr = Number(values.inr)
    let creatinine = Number(values.creatinine)
    let sodium = Number(values.sodium)

    if (
      !bilirubin || !inr || !creatinine || !sodium ||
      bilirubin <= 0 || inr <= 0 ||
      creatinine <= 0 || sodium <= 0 ||
      values.dialysis === undefined
    ) {
      return { error: 'Please enter all MELD-Na values.' }
    }

    bilirubin = Math.max(1, bilirubin)
    inr = Math.max(1, inr)
    creatinine = Math.max(1, creatinine)
    creatinine = Math.min(4, creatinine)

    if (values.dialysis) {
      creatinine = 4
    }

    sodium = Math.min(137, Math.max(125, sodium))

    const meldI =
      3.78 * Math.log(bilirubin) +
      11.2 * Math.log(inr) +
      9.57 * Math.log(creatinine) +
      6.43

    const meld = Math.min(40, meldI)

    const meldNa =
      meld +
      1.32 * (137 - sodium) -
      (0.033 * meld * (137 - sodium))

    const finalScore = Math.max(
      6,
      Math.min(40, meldNa)
    )

    return {
      value: finalScore,
      displayValue: finalScore.toFixed(1),
      unit: 'points',
      category: 'Classic MELD-Na'
    }
  },
  references: [
    'OPTN/UNOS MELD-Na policy documentation.',
    'MELD-Na = MELD(i) + 1.32 × (137 − Na) − [0.033 × MELD(i) × (137 − Na)].'
  ]
}

export default meldNa
