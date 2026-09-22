const ranson = {
  id: 'ranson',
  name: "Ranson's Criteria for Acute Pancreatitis",
  shortName: 'Ranson',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description:
    'Original Ranson criteria using admission variables and 48-hour changes in acute pancreatitis.',

  inputs: [
    { id: 'wbc', label: 'Admission WBC >16 ×10³/µL', type: 'boolean' },
    { id: 'age', label: 'Admission age >55 years', type: 'boolean' },
    { id: 'glucose', label: 'Admission glucose >200 mg/dL', type: 'boolean' },
    { id: 'ast', label: 'Admission AST >250 IU/L', type: 'boolean' },
    { id: 'ldh', label: 'Admission LDH >350 IU/L', type: 'boolean' },
    { id: 'hctDrop', label: '48h hematocrit fall >10 percentage points', type: 'boolean' },
    { id: 'bunRise', label: '48h BUN rise >5 mg/dL', type: 'boolean' },
    { id: 'calcium', label: '48h calcium <8 mg/dL', type: 'boolean' },
    { id: 'pao2', label: '48h PaO₂ <60 mmHg', type: 'boolean' },
    { id: 'baseDeficit', label: '48h base deficit >4 mEq/L', type: 'boolean' },
    { id: 'fluids', label: '48h fluid sequestration >6 L', type: 'boolean' }
  ],

  calculate(v) {
    const ids = [
      'wbc', 'age', 'glucose', 'ast', 'ldh',
      'hctDrop', 'bunRise', 'calcium', 'pao2',
      'baseDeficit', 'fluids'
    ]

    if (ids.some(id => typeof v[id] !== 'boolean')) {
      return { error: 'Please answer all Ranson criteria.' }
    }

    const score = ids.reduce((n, id) => n + (v[id] ? 1 : 0), 0)

    return {
      value: score,
      displayValue: String(score),
      unit: '/11',
      category:
        score < 3
          ? 'Lower-severity range'
          : 'Higher-severity range',
      note:
        'Ranson requires both admission and 48-hour information and therefore cannot be fully completed from presentation data alone.'
    }
  },

  references: [
    'Ranson JHC, et al. Objective early identification of severe acute pancreatitis. Am J Gastroenterol. 1974.'
  ]
}

export default ranson
