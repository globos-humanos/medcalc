const hasBled = {
  id: 'has-bled',
  name: 'HAS-BLED Score for Major Bleeding',
  shortName: 'HAS-BLED',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Estimates bleeding risk in patients with atrial fibrillation receiving anticoagulation.',
  keywords: ['HAS-BLED', 'bleeding', 'atrial fibrillation', 'anticoagulation'],
  aliases: ['HASBLED', 'HAS BLED'],
  inputs: [
    { id: 'hypertension', label: 'Uncontrolled hypertension — systolic BP >160 mmHg', type: 'boolean' },
    { id: 'renal', label: 'Renal disease — dialysis, transplant, or creatinine >2.26 mg/dL', type: 'boolean' },
    { id: 'liver', label: 'Liver disease', type: 'boolean' },
    { id: 'stroke', label: 'Previous stroke', type: 'boolean' },
    { id: 'bleeding', label: 'Prior major bleeding or bleeding predisposition', type: 'boolean' },
    { id: 'labileInr', label: 'Labile INR — unstable/high INR or TTR <60%', type: 'boolean' },
    { id: 'age65', label: 'Age >65 years', type: 'boolean' },
    { id: 'medications', label: 'Bleeding-predisposing medications — antiplatelet/NSAID', type: 'boolean' },
    { id: 'alcohol', label: 'Alcohol use — ≥8 drinks/week', type: 'boolean' }
  ],
  calculate(values) {
    const ids = ['hypertension', 'renal', 'liver', 'stroke', 'bleeding', 'labileInr', 'age65', 'medications', 'alcohol']
    if (ids.some(id => typeof values[id] !== 'boolean')) return { error: 'Please answer all HAS-BLED criteria.' }
    const score = ids.reduce((sum, id) => sum + (values[id] ? 1 : 0), 0)
    return {
      value: score,
      displayValue: String(score),
      unit: '/ 9 points',
      category: score >= 3 ? 'High bleeding-risk score' : 'Lower score; risk factors still require review'
    }
  },
  references: [
    'Pisters R, et al. A novel user-friendly score to assess one-year risk of major bleeding in AF patients. Chest. 2010;138:1093–1100.',
    'MDCalc — HAS-BLED Score for Major Bleeding Risk.'
  ]
}

export default hasBled
