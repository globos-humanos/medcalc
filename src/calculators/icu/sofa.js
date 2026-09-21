const sofa = {
  id: 'sofa',
  name: 'SOFA Score',
  shortName: 'SOFA',
  type: 'score',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Calculates the classic Sequential Organ Failure Assessment score across six organ systems.',
  keywords: ['SOFA', 'sequential organ failure assessment', 'sepsis', 'organ dysfunction', 'ICU'],
  aliases: ['sequential organ failure assessment'],
  inputs: [
    { id: 'pao2', label: 'PaO₂', type: 'number', unit: 'mmHg', step: 1 },
    { id: 'fio2', label: 'FiO₂', type: 'number', unit: '%', min: 21, max: 100, step: 1 },
    { id: 'respSupport', label: 'Mechanical ventilation / qualifying respiratory support', type: 'boolean' },
    { id: 'platelets', label: 'Platelets', type: 'number', unit: '×10³/µL', step: 1 },
    { id: 'bilirubin', label: 'Total Bilirubin', type: 'number', unit: 'mg/dL', min: 0, step: 0.1 },
    {
      id: 'cardiovascular',
      label: 'Cardiovascular status',
      type: 'choice',
      options: [
        { value: '0', label: 'MAP ≥70 mmHg' },
        { value: '1', label: 'MAP <70 mmHg' },
        { value: '2', label: 'Dopamine ≤5 or dobutamine (any dose)' },
        { value: '3', label: 'Dopamine >5 to 15, or epinephrine ≤0.1, or norepinephrine ≤0.1 µg/kg/min' },
        { value: '4', label: 'Dopamine >15, or epinephrine >0.1, or norepinephrine >0.1 µg/kg/min' }
      ],
      optionsLayout: 'stack'
    },
    { id: 'gcs', label: 'Glasgow Coma Scale', type: 'number', min: 3, max: 15, step: 1 },
    { id: 'creatinine', label: 'Creatinine', type: 'number', unit: 'mg/dL', min: 0, step: 0.1 },
    { id: 'urineOutput', label: 'Urine output over 24 hours (optional)', type: 'number', unit: 'mL/day', min: 0, step: 1 }
  ],
  calculate(values) {
    const n = id => Number(values[id])
    const required = ['pao2', 'fio2', 'platelets', 'bilirubin', 'gcs', 'creatinine']
    if (!values.respSupport && values.respSupport !== false) return { error: 'Please specify respiratory support.' }
    if (!values.cardiovascular || required.some(id => !Number.isFinite(n(id)))) {
      return { error: 'Please complete all required SOFA inputs.' }
    }

    const ratio = n('pao2') / (n('fio2') / 100)

    const respiratory =
      ratio < 100 && values.respSupport ? 4 :
      ratio < 200 && values.respSupport ? 3 :
      ratio < 300 ? 2 :
      ratio < 400 ? 1 : 0

    const coagulation =
      n('platelets') < 20 ? 4 :
      n('platelets') < 50 ? 3 :
      n('platelets') < 100 ? 2 :
      n('platelets') < 150 ? 1 : 0

    const liver =
      n('bilirubin') >= 12 ? 4 :
      n('bilirubin') >= 6 ? 3 :
      n('bilirubin') >= 2 ? 2 :
      n('bilirubin') >= 1.2 ? 1 : 0

    const cardiovascular = Number(values.cardiovascular)

    const cns =
      n('gcs') < 6 ? 4 :
      n('gcs') <= 9 ? 3 :
      n('gcs') <= 12 ? 2 :
      n('gcs') <= 14 ? 1 : 0

    const urine = values.urineOutput === '' || values.urineOutput == null
      ? null
      : n('urineOutput')

    const renalByCr =
      n('creatinine') >= 5 ? 4 :
      n('creatinine') >= 3.5 ? 3 :
      n('creatinine') >= 2 ? 2 :
      n('creatinine') >= 1.2 ? 1 : 0

    const renalByUrine =
      Number.isFinite(urine)
        ? (urine < 200 ? 4 : urine < 500 ? 3 : 0)
        : 0

    const renal = Math.max(renalByCr, renalByUrine)

    const total =
      respiratory +
      coagulation +
      liver +
      cardiovascular +
      cns +
      renal

    return {
      value: total,
      displayValue: String(total),
      unit: '/ 24 points',
      category: `Resp ${respiratory} • Coag ${coagulation} • Liver ${liver} • CV ${cardiovascular} • CNS ${cns} • Renal ${renal}`
    }
  },
  references: [
    'Vincent JL, et al. The SOFA (Sepsis-related Organ Failure Assessment) score. Intensive Care Med. 1996;22:707–710.',
    'Merck Manual Professional Edition — Sequential Organ Failure Assessment (SOFA) Score.'
  ]
}

export default sofa
