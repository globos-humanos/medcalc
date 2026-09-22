const pecarn = {
  id: 'pecarn',
  name: 'PECARN Pediatric Head Trauma Rule',
  shortName: 'PECARN',
  type: 'score',
  categoryId: 'neurology',
  category: 'Neurology',
  description: 'Age-specific PECARN decision rule for clinically important traumatic brain injury in children.',
  keywords: ['PECARN', 'pediatric head injury', 'CT'],

  inputs: [
    {
      id: 'ageGroup',
      label: 'Age group',
      type: 'choice',
      options: [
        { value: 'under2', label: '<2 years' },
        { value: '2plus', label: '≥2 years' }
      ],
      optionsLayout: 'stack'
    },

    {
      id: 'mental',
      label: 'Altered mental status',
      type: 'boolean'
    },

    {
      id: 'palpableSkull',
      label: 'Palpable skull fracture (<2 years)',
      type: 'boolean'
    },

    {
      id: 'basilarSkull',
      label: 'Signs of basilar skull fracture (≥2 years)',
      type: 'boolean'
    },

    {
      id: 'loc',
      label: 'Loss of consciousness',
      type: 'boolean'
    },

    {
      id: 'loc5',
      label: 'Loss of consciousness ≥5 seconds (<2 years)',
      type: 'boolean'
    },

    {
      id: 'vomit',
      label: 'History of vomiting (≥2 years)',
      type: 'boolean'
    },

    {
      id: 'severe',
      label: 'Severe mechanism of injury',
      type: 'boolean'
    },

    {
      id: 'headache',
      label: 'Severe headache (≥2 years)',
      type: 'boolean'
    },

    {
      id: 'nonfrontal',
      label: 'Non-frontal scalp hematoma (<2 years)',
      type: 'boolean'
    },

    {
      id: 'notActing',
      label: 'Not acting normally according to parent (<2 years)',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const under2 = v.ageGroup === 'under2'

    if (under2) {
      const highRisk =
        v.mental === true ||
        v.palpableSkull === true

      if (highRisk) {
        return {
          value: 'High-risk feature',
          displayValue: 'High-risk',
          unit: 'PECARN',
          category: 'Higher-risk PECARN pathway',
          interpretation: 'A high-risk predictor is present for children younger than 2 years.',
          note: 'The <2-year PECARN high-risk predictors are altered mental status or palpable skull fracture.'
        }
      }

      const intermediate =
        v.nonfrontal === true ||
        v.loc5 === true ||
        v.severe === true ||
        v.notActing === true

      return {
        value: intermediate ? 'Intermediate-risk feature' : 'No listed predictor',
        displayValue: intermediate ? 'Intermediate-risk' : 'Very-low-risk features',
        unit: 'PECARN',
        category: intermediate
          ? 'Intermediate-risk PECARN pathway'
          : 'Very-low-risk PECARN pathway',
        interpretation: intermediate
          ? 'One or more age-specific intermediate-risk predictors are present.'
          : 'No listed age-specific PECARN predictor is present.',
        note: 'For children younger than 2 years, intermediate predictors include non-frontal scalp hematoma, LOC ≥5 seconds, severe mechanism, and not acting normally according to the parent.'
      }
    }

    const highRisk =
      v.mental === true ||
      v.basilarSkull === true

    if (highRisk) {
      return {
        value: 'High-risk feature',
        displayValue: 'High-risk',
        unit: 'PECARN',
        category: 'Higher-risk PECARN pathway',
        interpretation: 'A high-risk predictor is present for children aged 2 years or older.',
        note: 'The ≥2-year PECARN high-risk predictors are altered mental status or signs of basilar skull fracture.'
      }
    }

    const intermediate =
      v.loc === true ||
      v.vomit === true ||
      v.severe === true ||
      v.headache === true

    return {
      value: intermediate ? 'Intermediate-risk feature' : 'No listed predictor',
      displayValue: intermediate ? 'Intermediate-risk' : 'Very-low-risk features',
      unit: 'PECARN',
      category: intermediate
        ? 'Intermediate-risk PECARN pathway'
        : 'Very-low-risk PECARN pathway',
      interpretation: intermediate
        ? 'One or more age-specific intermediate-risk predictors are present.'
        : 'No listed age-specific PECARN predictor is present.',
      note: 'For children aged 2 years or older, intermediate predictors include any LOC, vomiting, severe mechanism, and severe headache.'
    }
  },

  references: [
    'Kuppermann et al. PECARN pediatric head trauma rule',
    'PECARN age-specific clinical prediction rules'
  ]
}

export default pecarn
