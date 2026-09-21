const calc = {
  id: 'pecarn',
  name: 'PECARN Pediatric Head Injury Rule',
  shortName: 'PECARN',
  categoryId: 'neurology',
  description: 'PECARN clinical prediction rule for clinically important traumatic brain injury after minor blunt head trauma.',

  inputs: [
    {
      id: 'ageGroup',
      label: 'Age group',
      type: 'choice',
      options: [
        {
          value: 'under2',
          label: '<2 years'
        },
        {
          value: '2plus',
          label: '≥2 years'
        }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'alteredMentalStatus',
      label: 'Altered mental status / GCS <15',
      type: 'boolean'
    },
    {
      id: 'palpableSkull',
      label: 'Palpable skull fracture',
      type: 'boolean'
    },
    {
      id: 'nonFrontalHematoma',
      label: 'Non-frontal scalp hematoma',
      type: 'boolean'
    },
    {
      id: 'loc5sec',
      label: 'Loss of consciousness ≥5 seconds',
      type: 'boolean'
    },
    {
      id: 'actingAbnormal',
      label: 'Not acting normally according to parent',
      type: 'boolean'
    },
    {
      id: 'anyLoc',
      label: 'Any loss of consciousness',
      type: 'boolean'
    },
    {
      id: 'vomiting',
      label: 'Vomiting',
      type: 'boolean'
    },
    {
      id: 'basilarSkull',
      label: 'Signs of basilar skull fracture',
      type: 'boolean'
    },
    {
      id: 'severeHeadache',
      label: 'Severe headache',
      type: 'boolean'
    },
    {
      id: 'severeMechanism',
      label: 'Severe mechanism of injury',
      type: 'boolean'
    }
  ],

  calculate(v) {
    if (!v.ageGroup) {
      return {
        error: 'Please select the age group.'
      }
    }

    if (v.ageGroup === 'under2') {

      const highRisk =
        v.alteredMentalStatus === true ||
        v.palpableSkull === true

      const intermediateRisk =
        v.nonFrontalHematoma === true ||
        v.loc5sec === true ||
        v.severeMechanism === true ||
        v.actingAbnormal === true

      if (highRisk) {
        return {
          value: 'CT recommended',
          unit: 'PECARN',
          interpretation: 'Higher-risk category',
          note: 'Age <2 years: altered mental status or palpable skull fracture.'
        }
      }

      if (intermediateRisk) {
        return {
          value: 'Observation vs CT',
          unit: 'PECARN',
          interpretation: 'Intermediate-risk category',
          note: 'Consider observation versus CT using clinical factors, including multiple findings, worsening symptoms, age <3 months, clinician experience and caregiver preference.'
        }
      }

      return {
        value: 'CT not routinely indicated',
        unit: 'PECARN',
        interpretation: 'Very low-risk category',
        note: 'No PECARN predictor selected for the <2-year rule.'
      }
    }

    const highRisk =
      v.alteredMentalStatus === true ||
      v.basilarSkull === true

    const intermediateRisk =
      v.anyLoc === true ||
      v.vomiting === true ||
      v.severeMechanism === true ||
      v.severeHeadache === true

    if (highRisk) {
      return {
        value: 'CT recommended',
        unit: 'PECARN',
        interpretation: 'Higher-risk category',
        note: 'Age ≥2 years: altered mental status or signs of basilar skull fracture.'
      }
    }

    if (intermediateRisk) {
      return {
        value: 'Observation vs CT',
        unit: 'PECARN',
        interpretation: 'Intermediate-risk category',
        note: 'Consider observation versus CT using clinical factors and the overall presentation.'
      }
    }

    return {
      value: 'CT not routinely indicated',
      unit: 'PECARN',
      interpretation: 'Very low-risk category',
      note: 'No PECARN predictor selected for the ≥2-year rule.'
    }
  },

  references: [
    'Kuppermann N et al. Identification of children at very low risk of clinically-important brain injuries after head trauma. Lancet. 2009.',
    'PECARN pediatric head trauma prediction rule validation literature.'
  ]
}

export default calc