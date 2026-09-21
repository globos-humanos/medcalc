const ranson = {
  id: 'ranson',
  name: "Ranson's Criteria for Acute Pancreatitis",
  shortName: 'Ranson',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description: 'Calculates Ranson criteria using admission findings and changes during the first 48 hours.',
  keywords: ['Ranson', 'pancreatitis', 'acute pancreatitis', 'severity'],
  aliases: ["Ranson's criteria", 'Ranson score'],
  inputs: [
    { id: 'wbc', label: 'Admission WBC >16 ×10³/µL', type: 'boolean' },
    { id: 'age', label: 'Admission age >55 years', type: 'boolean' },
    { id: 'glucose', label: 'Admission glucose >200 mg/dL', type: 'boolean' },
    { id: 'ast', label: 'Admission AST >250 IU/L', type: 'boolean' },
    { id: 'ldh', label: 'Admission LDH >350 IU/L', type: 'boolean' },
    { id: 'hctDrop', label: '48h hematocrit drop >10%', type: 'boolean' },
    { id: 'bunRise', label: '48h BUN increase >5 mg/dL', type: 'boolean' },
    { id: 'calcium', label: '48h calcium <8 mg/dL', type: 'boolean' },
    { id: 'pao2', label: '48h PaO₂ <60 mmHg', type: 'boolean' },
    { id: 'baseDeficit', label: '48h base deficit >4 mEq/L', type: 'boolean' },
    { id: 'fluids', label: '48h fluid requirement >6 L', type: 'boolean' }
  ],
  calculate(values) {
    const ids = ['wbc', 'age', 'glucose', 'ast', 'ldh', 'hctDrop', 'bunRise', 'calcium', 'pao2', 'baseDeficit', 'fluids']
    if (ids.some(id => typeof values[id] !== 'boolean')) return { error: 'Please answer all Ranson criteria.' }

    const score = ids.reduce((sum, id) => sum + (values[id] ? 1 : 0), 0)

    return {
      value: score,
      displayValue: String(score),
      unit: '/ 11 points',
      category: score >= 3 ? 'Higher-severity range' : 'Lower-severity range'
    }
  },
  references: [
    'Ranson JHC, et al. Objective early identification of severe acute pancreatitis. Am J Gastroenterol. 1974;61:443–451.',
    "MDCalc — Ranson's Criteria for Pancreatitis Mortality."
  ]
}

export default ranson
