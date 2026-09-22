const calc = {
  id: 'must',
  name: 'MUST',
  shortName: 'MUST',
  categoryId: 'surgery',
  description: 'Malnutrition Universal Screening Tool.',
  type: 'score',

  inputs: [
    {
      id: 'bmi',
      label: 'BMI',
      type: 'number',
      unit: 'kg/m²',
      min: 5,
      max: 80,
      step: 0.1
    },
    {
      id: 'weightLoss',
      label: 'Unplanned weight loss in previous 3–6 months',
      type: 'choice',
      options: [
        { value: 0, label: '<5%' },
        { value: 1, label: '5–10%' },
        { value: 2, label: '>10%' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'acuteDisease',
      label: 'Acute disease with no nutritional intake for >5 days',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const bmi = Number(v.bmi)

    if (!Number.isFinite(bmi)) {
      return { error: 'Enter BMI.' }
    }

    const bmiScore = bmi < 18.5 ? 2 : bmi < 20 ? 1 : 0
    const score =
      bmiScore +
      Number(v.weightLoss || 0) +
      (v.acuteDisease ? 2 : 0)

    let interpretation
    if (score === 0) interpretation = 'Low risk of malnutrition'
    else if (score === 1) interpretation = 'Medium risk of malnutrition'
    else interpretation = 'High risk of malnutrition'

    return {
      value: score,
      unit: '/6',
      interpretation,
      note: 'MUST is a nutritional screening tool. BMI, unplanned weight loss and acute-disease effect are scored separately.'
    }
  }
}

export default calc
