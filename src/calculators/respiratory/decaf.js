const calc = {
  id: 'decaf',
  name: 'DECAF Score',
  shortName: 'DECAF',
  categoryId: 'respiratory',
  description: 'Predicts hospital mortality in acute exacerbation of COPD.',
  type: 'score',
  inputs: [
    {
      id: 'dyspnea',
      label: 'Extended MRC dyspnea grade',
      type: 'choice',
      options: [
        { value: 0, label: 'eMRCD 1-4' },
        { value: 1, label: 'eMRCD 5a' },
        { value: 2, label: 'eMRCD 5b' }
      ]
    },
    { id: 'eosinopenia', label: 'Eosinopenia <0.05 x 10^9/L', type: 'boolean' },
    { id: 'consolidation', label: 'Consolidation on chest imaging', type: 'boolean' },
    { id: 'acidemia', label: 'Acidemia: pH <7.30', type: 'boolean' },
    { id: 'af', label: 'Atrial fibrillation', type: 'boolean' }
  ],
  calculate(v) {
    const score =
      Number(v.dyspnea) +
      (v.eosinopenia ? 1 : 0) +
      (v.consolidation ? 1 : 0) +
      (v.acidemia ? 1 : 0) +
      (v.af ? 1 : 0)

    return {
      value: score,
      unit: '/6',
      interpretation:
        score <= 1 ? 'Low DECAF risk category.' :
        score <= 3 ? 'Intermediate DECAF risk category.' :
        'High DECAF risk category.',
      note: 'DECAF was developed for hospitalised acute COPD exacerbations.'
    }
  }
}

export default calc
