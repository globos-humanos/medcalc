const calc = {
  id: 'snaq',
  name: 'SNAQ',
  shortName: 'SNAQ',
  categoryId: 'surgery',
  description: 'Short Nutritional Assessment Questionnaire framework for hospital nutritional screening.',
  type: 'score',

  inputs: [
    {
      id: 'weightLoss6m',
      label: 'Unintentional weight loss >6 kg in previous 6 months',
      type: 'boolean'
    },
    {
      id: 'weightLoss1m',
      label: 'Unintentional weight loss >3 kg in previous month',
      type: 'boolean'
    },
    {
      id: 'appetite',
      label: 'Reduced appetite during the previous month',
      type: 'boolean'
    },
    {
      id: 'supplements',
      label: 'Use of oral nutritional supplements or tube feeding',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const score =
      (v.weightLoss6m ? 3 : 0) +
      (v.weightLoss1m ? 2 : 0) +
      (v.appetite ? 1 : 0) +
      (v.supplements ? 1 : 0)

    let interpretation
    if (score < 2) interpretation = 'Low nutritional risk'
    else if (score < 3) interpretation = 'Moderate nutritional risk'
    else interpretation = 'High nutritional risk'

    return {
      value: score,
      unit: 'points',
      interpretation,
      note: 'SNAQ is a screening instrument. Local implementation should use the validated version adopted by the institution.'
    }
  }
}

export default calc
