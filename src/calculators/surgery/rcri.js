const calc = {
  id: 'rcri',
  name: 'Revised Cardiac Risk Index',
  shortName: 'RCRI',
  categoryId: 'surgery',
  description: 'Lee Revised Cardiac Risk Index for perioperative cardiac risk.',
  type: 'score',

  inputs: [
    { id: 'highRisk', label: 'High-risk surgery', type: 'boolean' },
    { id: 'ischemia', label: 'History of ischemic heart disease', type: 'boolean' },
    { id: 'chf', label: 'History of congestive heart failure', type: 'boolean' },
    { id: 'cva', label: 'History of cerebrovascular disease', type: 'boolean' },
    { id: 'diabetes', label: 'Diabetes requiring insulin therapy', type: 'boolean' },
    { id: 'creatinine', label: 'Preoperative creatinine >2.0 mg/dL', type: 'boolean' }
  ],

  calculate(v) {
    const score =
      (v.highRisk ? 1 : 0) +
      (v.ischemia ? 1 : 0) +
      (v.chf ? 1 : 0) +
      (v.cva ? 1 : 0) +
      (v.diabetes ? 1 : 0) +
      (v.creatinine ? 1 : 0)

    let interpretation

    if (score === 0) interpretation = '0 RCRI risk factors'
    else if (score === 1) interpretation = '1 RCRI risk factor'
    else if (score === 2) interpretation = '2 RCRI risk factors'
    else interpretation = '≥3 RCRI risk factors'

    return {
      value: score,
      unit: '/6',
      interpretation,
      note: 'RCRI is a perioperative risk-stratification model; the score should be interpreted in the context of the planned procedure and patient.'
    }
  }
}

export default calc
