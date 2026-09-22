const calc = {
  id: 'frailty-index',
  name: 'Frailty Index',
  shortName: 'Frailty Index',
  categoryId: 'surgery',
  description: 'Deficit-accumulation Frailty Index calculated as the proportion of assessed deficits.',
  type: 'calculator',

  inputs: [
    {
      id: 'deficits',
      label: 'Number of deficits present',
      type: 'number',
      min: 0,
      step: 1
    },
    {
      id: 'total',
      label: 'Total deficits assessed',
      type: 'number',
      min: 1,
      step: 1
    }
  ],

  calculate(v) {
    const deficits = Number(v.deficits)
    const total = Number(v.total)

    if (!Number.isFinite(deficits) || !Number.isFinite(total) || total <= 0 || deficits < 0 || deficits > total) {
      return { error: 'Deficits must be between 0 and the total number assessed.' }
    }

    const index = deficits / total

    return {
      value: Number(index.toFixed(3)),
      displayValue: `${index.toFixed(3)} (${(index * 100).toFixed(1)}%)`,
      unit: 'Frailty Index',
      interpretation: 'Deficit-accumulation score',
      note: 'The Frailty Index is the proportion of measured health deficits present. Interpretation depends on the validated deficit set and clinical context.'
    }
  }
}

export default calc
