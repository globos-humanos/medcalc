const pim = {
  id: 'pim-pediatric',
  name: 'PIM-2 / PIM-3',
  shortName: 'PIM-2 / PIM-3',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Pediatric Index of Mortality model-output framework.',
  inputs: [
    {
      id: 'version',
      label: 'Model version',
      type: 'choice',
      options: [
        { value: 'pim2', label: 'PIM-2' },
        { value: 'pim3', label: 'PIM-3' }
      ]
    },
    {
      id: 'risk',
      label: 'Validated predicted mortality',
      type: 'number',
      min: 0,
      max: 100,
      step: 0.1,
      unit: '%'
    }
  ],
  calculate(v) {
    const risk = Number(v.risk)

    if (!Number.isFinite(risk)) {
      return { error: 'Enter a validated PIM model output.' }
    }

    return {
      value: risk,
      displayValue: `${risk.toFixed(1)}%`,
      unit: v.version === 'pim3' ? 'PIM-3' : 'PIM-2',
      interpretation: 'Validated model output entered.',
      note: 'PIM-2 and PIM-3 are distinct pediatric ICU mortality models. This interface does not invent model coefficients or substitute a different mortality equation.'
    }
  }
}

export default pim

