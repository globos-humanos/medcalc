const calc = {
  id: 'asa',
  name: 'ASA Physical Status',
  shortName: 'ASA',
  categoryId: 'surgery',
  description: 'American Society of Anesthesiologists physical-status classification.',
  type: 'score',

  inputs: [
    {
      id: 'class',
      label: 'ASA Physical Status',
      type: 'choice',
      options: [
        { value: 1, label: 'I — Healthy patient' },
        { value: 2, label: 'II — Mild systemic disease' },
        { value: 3, label: 'III — Severe systemic disease' },
        { value: 4, label: 'IV — Severe disease that is a constant threat to life' },
        { value: 5, label: 'V — Moribund patient, not expected to survive without the operation' },
        { value: 6, label: 'VI — Brain-dead patient whose organs are being removed for donation' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'emergency',
      label: 'Emergency procedure?',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const c = Number(v.class)
    const suffix = v.emergency ? 'E' : ''

    return {
      value: c,
      unit: suffix ? `ASA ${c}E` : `ASA ${c}`,
      interpretation: `ASA Physical Status ${c}${suffix}`,
      note: 'The E modifier indicates an emergency procedure.'
    }
  }
}

export default calc
