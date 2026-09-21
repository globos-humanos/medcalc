const perc = {
  id: 'perc',
  name: 'PERC Rule for Pulmonary Embolism',
  shortName: 'PERC',
  type: 'score',
  categoryId: 'emergency',
  category: 'Emergency',
  description: 'Applies the eight Pulmonary Embolism Rule-out Criteria to patients already judged low risk for PE.',
  keywords: ['PERC', 'pulmonary embolism', 'PE', 'rule out', 'VTE'],
  aliases: ['PERC rule', 'Pulmonary Embolism Rule-out Criteria'],
  inputs: [
    { id: 'age50', label: 'Age ≥50 years', type: 'boolean' },
    { id: 'hr100', label: 'Heart rate ≥100/min', type: 'boolean' },
    { id: 'o2low', label: 'Room-air O₂ saturation <95%', type: 'boolean' },
    { id: 'legSwelling', label: 'Unilateral leg swelling', type: 'boolean' },
    { id: 'hemoptysis', label: 'Hemoptysis', type: 'boolean' },
    { id: 'surgeryTrauma', label: 'Recent surgery or trauma requiring general anesthesia within 4 weeks', type: 'boolean' },
    { id: 'priorVte', label: 'Prior PE or DVT', type: 'boolean' },
    { id: 'hormone', label: 'Hormone use', type: 'boolean' }
  ],
  calculate(values) {
    const ids = ['age50', 'hr100', 'o2low', 'legSwelling', 'hemoptysis', 'surgeryTrauma', 'priorVte', 'hormone']
    if (ids.some(id => typeof values[id] !== 'boolean')) return { error: 'Please answer all eight PERC criteria.' }

    const score = ids.reduce((sum, id) => sum + (values[id] ? 1 : 0), 0)

    return {
      value: score,
      displayValue: String(score),
      unit: '/ 8 criteria',
      category: score === 0 ? 'PERC negative' : 'PERC positive'
    }
  },
  references: [
    'Kline JA, et al. Clinical criteria to prevent unnecessary diagnostic testing in emergency department patients with suspected pulmonary embolism. J Thromb Haemost. 2004;2:1247–1255.',
    'MDCalc — PERC Rule for Pulmonary Embolism.'
  ]
}

export default perc
