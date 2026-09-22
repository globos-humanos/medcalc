const glasgowImrie = {
  id: 'glasgowImrie',
  name: 'Glasgow-Imrie Score',
  shortName: 'Glasgow-Imrie',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description:
    'Nine-variable Glasgow-Imrie severity score for acute pancreatitis.',

  inputs: [
    { id: 'age', label: 'Age >55 years', type: 'boolean' },
    { id: 'wbc', label: 'WBC >15 ×10⁹/L', type: 'boolean' },
    { id: 'glucose', label: 'Glucose >10 mmol/L', type: 'boolean' },
    { id: 'urea', label: 'Urea >16 mmol/L', type: 'boolean' },
    { id: 'calcium', label: 'Calcium <2.0 mmol/L', type: 'boolean' },
    { id: 'albumin', label: 'Albumin <32 g/L', type: 'boolean' },
    { id: 'pao2', label: 'PaO₂ <8 kPa', type: 'boolean' },
    { id: 'ldh', label: 'LDH >600 IU/L', type: 'boolean' },
    { id: 'ast', label: 'AST >100 IU/L', type: 'boolean' }
  ],

  calculate(v) {
    const ids = [
      'age', 'wbc', 'glucose', 'urea', 'calcium',
      'albumin', 'pao2', 'ldh', 'ast'
    ]

    if (ids.some(id => typeof v[id] !== 'boolean')) {
      return { error: 'Please answer all Glasgow-Imrie criteria.' }
    }

    const score = ids.reduce((n, id) => n + (v[id] ? 1 : 0), 0)

    return {
      value: score,
      displayValue: String(score),
      unit: '/9',
      category:
        score < 3
          ? 'Lower-severity range'
          : 'Severe pancreatitis range',
      note:
        'Glasgow-Imrie is assessed over the first 48 hours; ≥3 criteria is conventionally associated with severe acute pancreatitis.'
    }
  },

  references: [
    'Glasgow-Imrie criteria for acute pancreatitis severity.'
  ]
}

export default glasgowImrie
