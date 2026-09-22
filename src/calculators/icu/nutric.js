const calc = {
  id: 'nutric',
  name: 'NUTRIC Score',
  shortName: 'NUTRIC',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Nutrition Risk in Critically Ill score, with modified NUTRIC or original IL-6 version.',
  type: 'score',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      unit: 'years',
      min: 18,
      max: 120
    },
    {
      id: 'apache',
      label: 'APACHE II score',
      min: 0,
      max: 71
    },
    {
      id: 'sofa',
      label: 'SOFA score',
      min: 0,
      max: 24
    },
    {
      id: 'comorbidity',
      label: 'Number of comorbidities',
      min: 0,
      max: 20
    },
    {
      id: 'days',
      label: 'Days from hospital admission to ICU admission',
      unit: 'days',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'il6',
      label: 'IL-6 available?',
      type: 'boolean'
    },
    {
      id: 'il6value',
      label: 'IL-6',
      unit: 'pg/mL',
      min: 0,
      max: 100000,
      step: 1
    }
  ],

  calculate(v) {
    const age = Number(v.age)
    const apache = Number(v.apache)
    const sofa = Number(v.sofa)
    const comorbidity = Number(v.comorbidity)
    const days = Number(v.days)

    if (
      !Number.isFinite(age) ||
      !Number.isFinite(apache) ||
      !Number.isFinite(sofa) ||
      !Number.isFinite(comorbidity) ||
      !Number.isFinite(days)
    ) {
      return {
        error: 'Please complete all required NUTRIC inputs.'
      }
    }

    if (v.il6) {
      const il6 = Number(v.il6value)

      if (!Number.isFinite(il6)) {
        return {
          error: 'Please enter the IL-6 value when IL-6 is selected.'
        }
      }
    }

    const agePoints =
      age < 50 ? 0 :
      age < 75 ? 1 : 2

    const apachePoints =
      apache < 15 ? 0 :
      apache < 20 ? 1 :
      apache < 28 ? 2 : 3

    const sofaPoints =
      sofa < 6 ? 0 :
      sofa < 10 ? 1 : 2

    const comorbidityPoints =
      comorbidity >= 2 ? 1 : 0

    const daysPoints =
      days >= 1 ? 1 : 0

    const il6Points = v.il6
      ? (Number(v.il6value) >= 400 ? 1 : 0)
      : 0

    const score =
      agePoints +
      apachePoints +
      sofaPoints +
      comorbidityPoints +
      daysPoints +
      il6Points

    const maximum = v.il6 ? 10 : 9

    const highRisk = v.il6
      ? score >= 6
      : score >= 5

    return {
      value: score,
      displayValue: `${score}/${maximum}`,
      unit: 'points',
      category: highRisk
        ? 'High nutritional risk'
        : 'Low nutritional risk',
      interpretation: highRisk
        ? 'Higher NUTRIC scores identify patients at greater nutritional risk.'
        : 'Lower NUTRIC score indicates lower nutritional risk by this model.',
      note: v.il6
        ? 'Original NUTRIC version including IL-6.'
        : 'Modified NUTRIC version without IL-6. A cutoff of ≥5 is commonly used for high nutritional risk in the modified score.'
    }
  },

  references: [
    'Heyland DK, et al. Crit Care. 2011;15:R268.',
    'Heyland DK, et al. Modified NUTRIC validation. 2015.'
  ]
}

export default calc
