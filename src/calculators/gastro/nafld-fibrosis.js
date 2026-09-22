const nafldFibrosis = {
  id: 'nafld-fibrosis',
  name: 'NAFLD Fibrosis Score',
  shortName: 'NFS',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description:
    'Non-invasive fibrosis score using age, BMI, glycemic status, AST/ALT ratio, platelets and albumin.',
  type: 'calculation',

  inputs: [
    { id: 'age', label: 'Age', unit: 'years', min: 18, max: 120 },
    { id: 'bmi', label: 'BMI', unit: 'kg/m²', min: 10, max: 80, step: 0.1 },
    { id: 'impaired', label: 'Impaired fasting glucose or diabetes', type: 'boolean' },
    { id: 'ast', label: 'AST', unit: 'U/L', min: 0, step: 0.1 },
    { id: 'alt', label: 'ALT', unit: 'U/L', min: 0.1, step: 0.1 },
    { id: 'platelets', label: 'Platelet count', unit: '×10⁹/L', min: 0.1, step: 0.1 },
    { id: 'albumin', label: 'Albumin', unit: 'g/dL', min: 1, max: 8, step: 0.1 }
  ],

  calculate(v) {
    const age = Number(v.age)
    const bmi = Number(v.bmi)
    const ast = Number(v.ast)
    const alt = Number(v.alt)
    const platelets = Number(v.platelets)
    const albumin = Number(v.albumin)

    if (
      ![age, bmi, ast, alt, platelets, albumin].every(Number.isFinite) ||
      alt <= 0 ||
      platelets <= 0
    ) {
      return { error: 'Please enter valid NFS variables.' }
    }

    const score =
      -1.675 +
      0.037 * age +
      0.094 * bmi +
      1.13 * (v.impaired ? 1 : 0) +
      0.99 * (ast / alt) -
      0.013 * platelets -
      0.66 * albumin

    return {
      value: score,
      displayValue: score.toFixed(2),
      unit: 'NFS',
      category:
        score < -1.455
          ? 'Lower-risk range'
          : score > 0.676
            ? 'Higher-risk range'
            : 'Indeterminate range',
      note:
        'NAFLD Fibrosis Score is a non-invasive fibrosis risk model. Its interpretation depends on the population and disease context.'
    }
  },

  references: [
    'Angulo P, et al. The NAFLD fibrosis score: a noninvasive system that identifies liver fibrosis in patients with NAFLD. Hepatology. 2007.'
  ]
}

export default nafldFibrosis
