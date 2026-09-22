const modifiedDuke = {
  id: 'modified-duke',
  name: '2023 Duke-ISCVID Criteria',
  shortName: 'Duke-ISCVID 2023',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: '2023 Duke-ISCVID clinical classification framework for infective endocarditis.',
  keywords: ['Duke ISCVID', '2023 Duke', 'endocarditis'],

  inputs: [
    {
      id: 'major',
      label: 'Number of major clinical criteria',
      type: 'number',
      min: 0,
      max: 5,
      step: 1
    },
    {
      id: 'minor',
      label: 'Number of minor clinical criteria',
      type: 'number',
      min: 0,
      max: 5,
      step: 1
    },
    {
      id: 'pathologic',
      label: 'Pathologic criterion for definite IE present?',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const major = Number(v.major)
    const minor = Number(v.minor)
    const pathologic = v.pathologic === true

    let classification = 'Rejected / does not meet possible IE criteria'

    if (
      pathologic ||
      major >= 2 ||
      (major === 1 && minor >= 3) ||
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
      displayValue:
        pathologic
          ? 'Pathologic criterion present'
          : `${major} major + ${minor} minor`,
      category: classification,
      interpretation: classification,
      note:
        'The 2023 Duke-ISCVID criteria include expanded microbiologic, imaging and surgical/pathologic domains. This interface classifies the entered criteria counts; it does not independently determine whether an individual finding qualifies as a Duke major or minor criterion.'
    }
  },

  references: ['2023 Duke-ISCVID Criteria for Infective Endocarditis']
}

export default modifiedDuke
