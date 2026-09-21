const wellsDvt = {
  id: 'wells-dvt',
  name: 'Wells Criteria for DVT',
  shortName: 'Wells DVT',
  type: 'score',
  categoryId: 'emergency',
  category: 'Emergency',
  description: 'Calculates the Wells clinical score for pretest probability of lower-extremity DVT.',
  keywords: ['Wells', 'DVT', 'deep vein thrombosis', 'VTE'],
  aliases: ['Wells DVT', 'Wells criteria DVT'],
  inputs: [
    { id: 'cancer', label: 'Active cancer', type: 'boolean' },
    { id: 'bedriddenSurgery', label: 'Bedridden >3 days or major surgery within 12 weeks', type: 'boolean' },
    { id: 'calfSwelling', label: 'Calf swelling >3 cm compared with the other leg', type: 'boolean' },
    { id: 'collateralVeins', label: 'Collateral superficial veins, nonvaricose', type: 'boolean' },
    { id: 'entireLeg', label: 'Entire leg swollen', type: 'boolean' },
    { id: 'tenderness', label: 'Localized tenderness along deep venous system', type: 'boolean' },
    { id: 'pittingEdema', label: 'Pitting edema confined to symptomatic leg', type: 'boolean' },
    { id: 'paralysis', label: 'Paralysis, paresis, or recent plaster immobilization of lower extremity', type: 'boolean' },
    { id: 'previousDvt', label: 'Previously documented DVT', type: 'boolean' },
    { id: 'alternativeDiagnosis', label: 'Alternative diagnosis as likely or more likely than DVT', type: 'boolean' }
  ],
  calculate(values) {
    const ids = ['cancer', 'bedriddenSurgery', 'calfSwelling', 'collateralVeins', 'entireLeg', 'tenderness', 'pittingEdema', 'paralysis', 'previousDvt', 'alternativeDiagnosis']
    if (ids.some(id => typeof values[id] !== 'boolean')) return { error: 'Please answer all Wells DVT criteria.' }

    let score = 0
    ids.slice(0, 9).forEach(id => {
      if (values[id]) score += 1
    })
    if (values.alternativeDiagnosis) score -= 2

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category:
        score <= 0 ? 'DVT unlikely' :
        score <= 2 ? 'Moderate-risk range' :
        'DVT likely'
    }
  },
  references: [
    'Wells PS, et al. Evaluation of D-dimer in the diagnosis of suspected deep-vein thrombosis. N Engl J Med. 2003;349:1227–1235.',
    'MDCalc — Wells Criteria for DVT.'
  ]
}

export default wellsDvt
