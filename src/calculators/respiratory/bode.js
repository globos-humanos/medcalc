const calc = {
  id: 'bode',
  name: 'BODE Index',
  shortName: 'BODE',
  categoryId: 'respiratory',
  description: 'Multidimensional COPD index incorporating BMI, airflow obstruction, dyspnea and exercise capacity.',
  type: 'score',
  inputs: [
    { id: 'bmi', label: 'BMI', type: 'number', unit: 'kg/m2', min: 10, max: 60, step: 0.1 },
    { id: 'fev1', label: 'FEV1 % predicted', type: 'number', unit: '%', min: 0, max: 150, step: 1 },
    {
      id: 'mmrc',
      label: 'mMRC dyspnea grade',
      type: 'choice',
      options: [
        { value: 0, label: '0-1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' }
      ]
    },
    { id: 'walk', label: '6-minute walk distance', type: 'number', unit: 'm', min: 0, max: 1000, step: 1 }
  ],
  calculate(v) {
    const bmi = Number(v.bmi)
    const fev1 = Number(v.fev1)
    const mmrc = Number(v.mmrc)
    const walk = Number(v.walk)

    const bmiPoints = bmi < 21 ? 1 : 0

    const fevPoints =
      fev1 >= 65 ? 0 :
      fev1 >= 50 ? 1 :
      fev1 >= 36 ? 2 : 3

    const dyspneaPoints =
      mmrc <= 1 ? 0 :
      mmrc === 2 ? 1 :
      mmrc === 3 ? 2 : 3

    const walkPoints =
      walk >= 350 ? 0 :
      walk >= 250 ? 1 :
      walk >= 150 ? 2 : 3

    const score = bmiPoints + fevPoints + dyspneaPoints + walkPoints

    return {
      value: score,
      unit: '/10',
      interpretation:
        score <= 2 ? 'BODE 0-2 category.' :
        score <= 4 ? 'BODE 3-4 category.' :
        score <= 6 ? 'BODE 5-6 category.' :
        'BODE 7-10 category.',
      note: 'BODE is a multidimensional COPD prognostic index; it should not be interpreted as an individual mortality prediction without its original validation context.'
    }
  }
}

export default calc
