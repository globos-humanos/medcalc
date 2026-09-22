const haps = {
  id: 'haps',
  name: 'Harmless Acute Pancreatitis Score',
  shortName: 'HAPS',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description:
    'Early assessment of whether acute pancreatitis is likely to follow a non-severe course.',

  inputs: [
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]
    },
    {
      id: 'peritonitis',
      label: 'Peritonitis',
      type: 'boolean'
    },
    {
      id: 'creatinine',
      label: 'Creatinine ≥2.0 mg/dL',
      type: 'boolean'
    },
    {
      id: 'hematocritHigh',
      label: 'Hematocrit above sex-specific HAPS threshold',
      type: 'boolean'
    }
  ],

  calculate(v) {
    if (
      !['male', 'female'].includes(v.sex) ||
      typeof v.peritonitis !== 'boolean' ||
      typeof v.creatinine !== 'boolean' ||
      typeof v.hematocritHigh !== 'boolean'
    ) {
      return { error: 'Please complete all HAPS criteria.' }
    }

    const score =
      (v.peritonitis ? 1 : 0) +
      (v.creatinine ? 1 : 0) +
      (v.hematocritHigh ? 1 : 0)

    return {
      value: score,
      displayValue: String(score),
      unit: '/3',
      category:
        score === 0
          ? 'HAPS-negative / potentially non-severe'
          : 'HAPS-positive',
      note:
        'For the original HAPS formulation, elevated hematocrit is >43% in men or >39.6% in women. A HAPS-negative result supports a potentially non-severe course but does not replace clinical reassessment.'
    }
  },

  references: [
    'Lankisch PG, et al. The harmless acute pancreatitis score: a clinical algorithm for rapid initial stratification of nonsevere disease. Clin Gastroenterol Hepatol. 2009.'
  ]
}

export default haps
