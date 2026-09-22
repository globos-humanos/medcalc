const duke = {
  id: 'duke',
  name: 'Modified Duke Criteria',
  shortName: 'Duke Criteria',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'Major/minor clinical criteria framework for infective endocarditis.',
  keywords: ['Duke', 'endocarditis', 'infective endocarditis'],

  inputs: [
    {
      id: 'major',
      label: 'Number of major criteria',
      type: 'number',
      min: 0,
      max: 5,
      step: 1
    },
    {
      id: 'minor',
      label: 'Number of minor criteria',
      type: 'number',
      min: 0,
      max: 5,
      step: 1
    }
  ],

  calculate(v) {
    const major = Number(v.major)
    const minor = Number(v.minor)

    let classification = 'Rejected / does not meet possible IE criteria'

    if (
      major >= 2 ||
      (major >= 1 && minor >= 3) ||
      minor >= 5
    ) {
      classification = 'Definite infective endocarditis'
    } else if (
      (major >= 1 && minor >= 1) ||
      minor >= 3
    ) {
      classification = 'Possible infective endocarditis'
    }

    return {
      value: major + minor,
      displayValue: `${major} major + ${minor} minor`,
      category: classification,
      interpretation: classification,
      note:
        'This calculator evaluates the entered major/minor counts only. The individual Duke criteria must be established clinically from microbiology, imaging and clinical findings.'
    }
  },

  references: ['Modified Duke Criteria for infective endocarditis']
}

export default duke
