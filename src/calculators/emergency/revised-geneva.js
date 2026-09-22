const revisedGeneva = {
  id: 'revised-geneva',
  name: 'Revised Geneva Score for Pulmonary Embolism',
  shortName: 'Revised Geneva',
  type: 'score',
  categoryId: 'emergency',
  category: 'Emergency',
  description: 'Calculates the revised Geneva pretest probability score for pulmonary embolism using objective clinical criteria.',
  keywords: ['Geneva', 'revised Geneva', 'PE', 'pulmonary embolism', 'VTE'],
  aliases: ['Revised Geneva Score', 'Geneva PE score'],
  inputs: [
    { id: 'age65', label: 'Age >65 years', type: 'boolean' },
    { id: 'previousVte', label: 'Previous DVT or PE', type: 'boolean' },
    { id: 'surgeryFracture', label: 'Surgery under general anesthesia or lower-limb fracture within 1 month', type: 'boolean' },
    { id: 'malignancy', label: 'Active malignant condition', type: 'boolean' },
    { id: 'legPain', label: 'Unilateral lower-limb pain', type: 'boolean' },
    { id: 'hemoptysis', label: 'Hemoptysis', type: 'boolean' },
    {
      id: 'heartRate',
      label: 'Heart Rate',
      type: 'choice',
      options: [
        { value: '0', label: '<75/min' },
        { value: '3', label: '75â€“94/min' },
        { value: '5', label: 'â‰¥95/min' }
      ]
    },
    { id: 'painEdema', label: 'Pain on lower-limb palpation and unilateral edema', type: 'boolean' }
  ],
  calculate(values) {
    const boolIds = ['age65', 'previousVte', 'surgeryFracture', 'malignancy', 'legPain', 'hemoptysis', 'painEdema']
    if (boolIds.some(id => typeof values[id] !== 'boolean') || !values.heartRate) {
      return { error: 'Please complete all Revised Geneva criteria.' }
    }

    const score =
      (values.age65 ? 1 : 0) +
      (values.previousVte ? 3 : 0) +
      (values.surgeryFracture ? 2 : 0) +
      (values.malignancy ? 2 : 0) +
      (values.legPain ? 3 : 0) +
      (values.hemoptysis ? 2 : 0) +
      Number(values.heartRate) +
      (values.painEdema ? 4 : 0)

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category:
        score <= 3 ? 'Low pretest probability' :
        score <= 10 ? 'Intermediate pretest probability' :
        'High pretest probability'
    }
  },
  references: [
    'Le Gal G, et al. Prediction of pulmonary embolism in the emergency department: the revised Geneva score. Ann Intern Med. 2006;144:165â€“171.',
    'MDCalc â€” Geneva Score (Revised) for Pulmonary Embolism.'
  ]
}

export default revisedGeneva

