const piro = {
  id: 'piro',
  name: 'PIRO Sepsis Framework',
  shortName: 'PIRO',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'Predisposition, Infection, Response and Organ dysfunction framework for sepsis.',
  keywords: ['PIRO', 'sepsis', 'staging'],

  inputs: [
    {
      id: 'predisposition',
      label: 'Predisposition domain',
      type: 'choice',
      options: [
        { value: 0, label: 'Not scored / none entered' },
        { value: 1, label: 'Predisposition present' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'infection',
      label: 'Infection domain',
      type: 'choice',
      options: [
        { value: 0, label: 'Not scored / none entered' },
        { value: 1, label: 'Infection characteristic present' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'response',
      label: 'Response domain',
      type: 'choice',
      options: [
        { value: 0, label: 'Not scored / none entered' },
        { value: 1, label: 'Abnormal host response present' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'organ',
      label: 'Organ dysfunction domain',
      type: 'choice',
      options: [
        { value: 0, label: 'Not scored / none entered' },
        { value: 1, label: 'Organ dysfunction present' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const p = Number(v.predisposition)
    const i = Number(v.infection)
    const r = Number(v.response)
    const o = Number(v.organ)

    const score = p + i + r + o

    return {
      value: score,
      displayValue: `${score}/4`,
      category: 'PIRO framework',
      interpretation:
        'PIRO domains entered successfully.',
      note:
        'PIRO is a conceptual staging framework rather than one universally standardized bedside score. Published PIRO models use different variables and coefficients; this screen therefore does not claim to calculate a universal PIRO mortality probability.'
    }
  },

  references: ['PIRO sepsis staging framework']
}

export default piro
