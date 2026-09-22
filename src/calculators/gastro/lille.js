const lille = {
  id: 'lille',
  name: 'Lille Model',
  shortName: 'Lille',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description:
    'Predicts response and mortality risk after 7 days of corticosteroid therapy in severe alcohol-associated hepatitis.',

  inputs: [
    { id: 'age', label: 'Age', unit: 'years', min: 18, max: 120 },
    { id: 'albumin', label: 'Baseline albumin', unit: 'g/L', min: 1, max: 100, step: 0.1 },
    { id: 'bilirubin0', label: 'Baseline bilirubin', unit: 'µmol/L', min: 0.1, max: 2000, step: 0.1 },
    { id: 'bilirubin7', label: 'Day-7 bilirubin', unit: 'µmol/L', min: 0.1, max: 2000, step: 0.1 },
    { id: 'creatinine', label: 'Baseline creatinine', unit: 'mg/dL', min: 0, max: 20, step: 0.01 },
    { id: 'pt', label: 'Baseline prothrombin time', unit: 'seconds', min: 5, max: 100, step: 0.1 }
  ],

  calculate(v) {
    const age = Number(v.age)
    const albumin = Number(v.albumin)
    const bilirubin0 = Number(v.bilirubin0)
    const bilirubin7 = Number(v.bilirubin7)
    const creatinine = Number(v.creatinine)
    const pt = Number(v.pt)

    if (
      ![age, albumin, bilirubin0, bilirubin7, creatinine, pt].every(Number.isFinite) ||
      albumin <= 0 ||
      bilirubin0 <= 0 ||
      bilirubin7 <= 0 ||
      creatinine < 0 ||
      pt <= 0
    ) {
      return { error: 'Please enter valid Lille variables.' }
    }

    const evolution = bilirubin0 - bilirubin7
    const renalInsufficiency = creatinine > 1.3 ? 1 : 0

    const r =
      3.19 -
      0.101 * age +
      0.147 * albumin +
      0.0165 * evolution -
      0.206 * renalInsufficiency -
      0.0065 * bilirubin0 -
      0.0096 * pt

    const score = Math.exp(-r) / (1 + Math.exp(-r))

    return {
      value: score,
      displayValue: score.toFixed(3),
      unit: 'Lille score',
      category:
        score < 0.45
          ? 'Lower predicted mortality / response more likely'
          : 'Higher predicted mortality / poor response',
      note:
        'The Lille model is intended after approximately 7 days of corticosteroid therapy in severe alcohol-associated hepatitis and uses bilirubin evolution from baseline to day 7.'
    }
  },

  references: [
    'Louvet A, et al. Hepatology. 2007;45:1348–1354.'
  ]
}

export default lille
