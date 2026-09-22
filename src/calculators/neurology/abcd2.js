const abcd2 = {
  id: 'abcd2',
  name: 'ABCD² Score',
  shortName: 'ABCD²',
  type: 'score',
  categoryId: 'neurology',
  category: 'Neurology',
  description: 'Clinical risk score for early stroke risk after transient ischemic attack.',
  keywords: ['ABCD2', 'TIA', 'stroke'],

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      unit: 'years',
      min: 18,
      max: 120,
      step: 1
    },
    {
      id: 'sbp',
      label: 'Initial systolic BP',
      type: 'number',
      unit: 'mmHg',
      min: 50,
      max: 250,
      step: 1
    },
    {
      id: 'dbp',
      label: 'Initial diastolic BP',
      type: 'number',
      unit: 'mmHg',
      min: 20,
      max: 150,
      step: 1
    },
    {
      id: 'clinical',
      label: 'Clinical features',
      type: 'choice',
      options: [
        { value: 'none', label: 'No unilateral weakness or speech disturbance' },
        { value: 'speech', label: 'Speech disturbance without weakness' },
        { value: 'weakness', label: 'Unilateral weakness' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'duration',
      label: 'TIA symptom duration',
      type: 'choice',
      options: [
        { value: 'under10', label: '<10 minutes' },
        { value: '10to59', label: '10–59 minutes' },
        { value: '60plus', label: '≥60 minutes' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'diabetes',
      label: 'Diabetes mellitus',
      type: 'boolean'
    }
  ],

  calculate(v) {
    let score = 0

    if (Number(v.age) >= 60) {
      score += 1
    }

    const sbp = Number(v.sbp)
    const dbp = Number(v.dbp)

    if (sbp >= 140 || dbp >= 90) {
      score += 1
    }

    if (v.clinical === 'weakness') {
      score += 2
    } else if (v.clinical === 'speech') {
      score += 1
    }

    if (v.duration === '60plus') {
      score += 2
    } else if (v.duration === '10to59') {
      score += 1
    }

    if (v.diabetes === true) {
      score += 1
    }

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category:
        score <= 3
          ? 'Lower ABCD² score range'
          : score <= 5
            ? 'Intermediate ABCD² score range'
            : 'Higher ABCD² score range',
      interpretation: 'ABCD² score = ' + score + '/7.',
      note: 'ABCD² is a risk-stratification tool after TIA and does not by itself establish the diagnosis of TIA or determine disposition.'
    }
  },

  references: ['Johnston et al. ABCD² score']
}

export default abcd2
