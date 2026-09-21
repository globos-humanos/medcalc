const timiUaNstemi = {
  id: 'timi-ua-nstemi',
  name: 'TIMI Risk Score for UA/NSTEMI',
  shortName: 'TIMI',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Estimates risk of adverse outcomes in unstable angina or NSTEMI using seven clinical criteria.',
  keywords: ['TIMI', 'UA', 'NSTEMI', 'acute coronary syndrome', 'ACS'],
  aliases: ['TIMI risk score', 'TIMI UA NSTEMI'],
  inputs: [
    { id: 'age65', label: 'Age ≥65 years', type: 'boolean' },
    { id: 'cadRiskFactors', label: '≥3 CAD risk factors', type: 'boolean' },
    { id: 'knownCad', label: 'Known CAD with stenosis ≥50%', type: 'boolean' },
    { id: 'asa', label: 'Aspirin use in past 7 days', type: 'boolean' },
    { id: 'severeAngina', label: 'Severe angina — ≥2 episodes in 24 hours', type: 'boolean' },
    { id: 'stChanges', label: 'ST-segment deviation ≥0.5 mm', type: 'boolean' },
    { id: 'positiveMarker', label: 'Positive cardiac marker', type: 'boolean' }
  ],
  calculate(values) {
    const ids = ['age65', 'cadRiskFactors', 'knownCad', 'asa', 'severeAngina', 'stChanges', 'positiveMarker']
    if (ids.some(id => typeof values[id] !== 'boolean')) return { error: 'Please answer all seven TIMI criteria.' }
    const score = ids.reduce((sum, id) => sum + (values[id] ? 1 : 0), 0)
    return {
      value: score,
      displayValue: String(score),
      unit: '/ 7 points',
      category: score <= 1 ? 'Lower-risk group; risk is not zero.' : 'Higher TIMI score'
    }
  },
  references: [
    'Antman EM, et al. The TIMI risk score for unstable angina/non-ST elevation MI. JAMA. 2000;284:835–842.',
    'MDCalc — TIMI Risk Score for UA/NSTEMI.'
  ]
}

export default timiUaNstemi
