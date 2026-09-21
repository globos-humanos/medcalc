const calc = {
  id: 'canadian-ct-head',
  name: 'Canadian CT Head Rule',
  shortName: 'CCHR',
  categoryId: 'neurology',
  description: 'Clinical decision rule for CT imaging after minor head injury in eligible adults.',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      unit: 'years',
      min: 16,
      max: 120,
      step: 1
    },
    {
      id: 'gcs2h',
      label: 'GCS <15 at 2 hours after injury',
      type: 'boolean'
    },
    {
      id: 'openSkull',
      label: 'Suspected open or depressed skull fracture',
      type: 'boolean'
    },
    {
      id: 'basalSkull',
      label: 'Signs of basal skull fracture',
      type: 'boolean'
    },
    {
      id: 'vomiting',
      label: 'Vomiting ≥2 episodes',
      type: 'boolean'
    },
    {
      id: 'amnesia',
      label: 'Amnesia before impact ≥30 minutes',
      type: 'boolean'
    },
    {
      id: 'dangerousMechanism',
      label: 'Dangerous mechanism',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const age = Number(v.age)

    if (!Number.isFinite(age) || age < 16) {
      return {
        error: 'The Canadian CT Head Rule was derived for eligible adults with minor head injury.'
      }
    }

    const highRisk =
      v.gcs2h === true ||
      v.openSkull === true ||
      v.basalSkull === true ||
      v.vomiting === true ||
      age >= 65

    const mediumRisk =
      v.amnesia === true ||
      v.dangerousMechanism === true

    const total =
      Number(v.gcs2h === true) +
      Number(v.openSkull === true) +
      Number(v.basalSkull === true) +
      Number(v.vomiting === true) +
      Number(age >= 65) +
      Number(v.amnesia === true) +
      Number(v.dangerousMechanism === true)

    if (highRisk) {
      return {
        value: 'CT indicated',
        unit: 'CCHR',
        interpretation: `${total} positive criterion(s); high-risk criterion present`,
        note: 'The rule is intended for eligible patients with minor head injury. Confirm the rule’s inclusion and exclusion criteria before applying it.'
      }
    }

    if (mediumRisk) {
      return {
        value: 'CT / observation decision',
        unit: 'CCHR',
        interpretation: `${total} positive criterion(s); medium-risk criterion present`,
        note: 'A medium-risk factor is present. Clinical context and observation may influence management.'
      }
    }

    return {
      value: 'No CCHR criterion',
      unit: 'CCHR',
      interpretation: 'No high- or medium-risk criterion selected',
      note: 'This does not replace clinical assessment and is only applicable to the rule’s intended patient population.'
    }
  },

  references: [
    'Stiell IG et al. The Canadian CT Head Rule for patients with minor head injury. Lancet. 2001.',
    'Canadian CT Head Rule validation literature.'
  ]
}

export default calc