const calc = {
  id: 'morse',
  name: 'Morse Fall Scale',
  shortName: 'Morse',
  categoryId: 'general-medicine',
  category: 'General Medicine',
  description: 'Hospital fall-risk assessment.',
  type: 'score',

  inputs: [
    {
      id: 'history',
      label: 'History of falling',
      type: 'boolean'
    },
    {
      id: 'secondary',
      label: 'Secondary diagnosis',
      type: 'boolean'
    },
    {
      id: 'aid',
      label: 'Ambulatory aid',
      type: 'choice',
      options: [
        { value: 0, label: 'None / bed rest / nurse assist' },
        { value: 15, label: 'Crutches / cane / walker' },
        { value: 30, label: 'Furniture' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'iv',
      label: 'IV / heparin lock',
      type: 'boolean'
    },
    {
      id: 'gait',
      label: 'Gait / transferring',
      type: 'choice',
      options: [
        { value: 0, label: 'Normal / bed rest / wheelchair' },
        { value: 10, label: 'Weak' },
        { value: 20, label: 'Impaired' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'mental',
      label: 'Mental status overestimates ability',
      type: 'boolean'
    }
  ],

  calculate(values) {
    if (
      values.aid === undefined ||
      values.gait === undefined
    ) {
      return {
        error: 'Please complete the ambulatory aid and gait assessments.'
      }
    }

    const score =
      (values.history ? 25 : 0) +
      (values.secondary ? 15 : 0) +
      Number(values.aid) +
      (values.iv ? 20 : 0) +
      Number(values.gait) +
      (values.mental ? 15 : 0)

    let interpretation

    if (score < 25) {
      interpretation = 'Low risk'
    } else if (score <= 45) {
      interpretation = 'Moderate risk'
    } else {
      interpretation = 'High risk'
    }

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category: interpretation,
      note: 'Morse Fall Scale cut-points may be adapted by institutions according to their patient population and fall-prevention policy.'
    }
  }
}

export default calc
