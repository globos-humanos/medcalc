const calc = {
  id: 'stopbang',
  name: 'STOP-BANG',
  shortName: 'STOP-BANG',
  categoryId: 'respiratory',
  description: 'Screening questionnaire for obstructive sleep apnea.',
  type: 'score',
  inputs: [
    { id: 'snoring', label: 'Snoring loudly', type: 'boolean' },
    { id: 'tired', label: 'Often tired, fatigued or sleepy during daytime', type: 'boolean' },
    { id: 'observed', label: 'Observed apnea during sleep', type: 'boolean' },
    { id: 'pressure', label: 'High blood pressure', type: 'boolean' },
    { id: 'bmi', label: 'BMI >35 kg/m2', type: 'boolean' },
    { id: 'age', label: 'Age >50 years', type: 'boolean' },
    { id: 'neck', label: 'Neck circumference >40 cm', type: 'boolean' },
    { id: 'male', label: 'Male sex', type: 'boolean' }
  ],
  calculate(v) {
    const score = [
      v.snoring,
      v.tired,
      v.observed,
      v.pressure,
      v.bmi,
      v.age,
      v.neck,
      v.male
    ].filter(Boolean).length

    return {
      value: score,
      unit: '/8',
      interpretation:
        score <= 2 ? 'Low OSA risk by STOP-BANG.' :
        score <= 4 ? 'Intermediate OSA risk by STOP-BANG.' :
        'High OSA risk by STOP-BANG.',
      note: 'STOP-BANG is a screening tool and does not establish a diagnosis of obstructive sleep apnea.'
    }
  }
}

export default calc
