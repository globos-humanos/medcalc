const calc = {
  id: 'ariscat',
  name: 'ARISCAT Score',
  shortName: 'ARISCAT',
  categoryId: 'surgery',
  description: 'Assess Respiratory Risk in Surgical Patients in Catalonia score for postoperative pulmonary complications.',
  type: 'score',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'choice',
      options: [
        { value: 0, label: '<51 years' },
        { value: 3, label: '51–80 years' },
        { value: 16, label: '>80 years' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'spo2',
      label: 'Preoperative SpO₂',
      type: 'choice',
      options: [
        { value: 0, label: '≥96%' },
        { value: 8, label: '91–95%' },
        { value: 24, label: '≤90%' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'respInfection',
      label: 'Respiratory infection within the previous month',
      type: 'boolean'
    },
    {
      id: 'anemia',
      label: 'Preoperative hemoglobin ≤10 g/dL',
      type: 'boolean'
    },
    {
      id: 'incision',
      label: 'Surgical incision',
      type: 'choice',
      options: [
        { value: 0, label: 'Peripheral' },
        { value: 8, label: 'Upper abdominal' },
        { value: 15, label: 'Intrathoracic' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'duration',
      label: 'Expected surgery duration',
      type: 'choice',
      options: [
        { value: 0, label: '<2 hours' },
        { value: 16, label: '2–3 hours' },
        { value: 23, label: '>3 hours' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'emergency',
      label: 'Emergency surgery',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const score =
      Number(v.age || 0) +
      Number(v.spo2 || 0) +
      (v.respInfection ? 17 : 0) +
      (v.anemia ? 11 : 0) +
      Number(v.incision || 0) +
      Number(v.duration || 0) +
      (v.emergency ? 8 : 0)

    let interpretation

    if (score < 26) interpretation = 'Low risk'
    else if (score <= 44) interpretation = 'Intermediate risk'
    else interpretation = 'High risk'

    return {
      value: score,
      unit: 'points',
      interpretation,
      note: 'ARISCAT estimates risk of postoperative pulmonary complications from seven preoperative variables.'
    }
  }
}

export default calc
