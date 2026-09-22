const duke = {
  id: 'duke-treadmill',
  name: 'Duke Treadmill Score',
  shortName: 'Duke Treadmill',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Prognostic index using exercise duration, ST-segment deviation, and exercise-induced angina.',
  type: 'calculation',

  inputs: [
    {
      id: 'duration',
      label: 'Exercise duration',
      unit: 'minutes',
      min: 0,
      max: 30,
      step: 0.1
    },
    {
      id: 'st',
      label: 'Maximum ST-segment deviation',
      unit: 'mm',
      min: 0,
      max: 10,
      step: 0.1
    },
    {
      id: 'angina',
      label: 'Exercise-induced angina',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Non-limiting' },
        { value: 2, label: 'Exercise-limiting' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const duration = Number(v.duration)
    const st = Number(v.st)
    const angina = Number(v.angina)

    if (
      !Number.isFinite(duration) ||
      !Number.isFinite(st) ||
      !Number.isFinite(angina)
    ) {
      return {
        error: 'Please complete all Duke Treadmill Score inputs.'
      }
    }

    const score =
      duration -
      (5 * st) -
      (4 * angina)

    return {
      value: score,
      displayValue: score.toFixed(1),
      unit: 'points',
      category:
        score >= 5 ? 'Low-risk range' :
        score >= -10 ? 'Intermediate-risk range' :
        'High-risk range',
      note: 'Duke Treadmill Score = exercise duration − (5 × ST-segment deviation) − (4 × angina index).'
    }
  },

  references: [
    'Duke Treadmill Score original prognostic model.',
    'Exercise treadmill testing literature describing the Duke score.'
  ]
}

export default duke
