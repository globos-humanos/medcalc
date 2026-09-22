const calc = {
  id: 'killip',
  name: 'Killip Class',
  shortName: 'Killip',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Clinical classification of heart failure severity in acute myocardial infarction.',
  type: 'score',

  inputs: [
    {
      id: 'class',
      label: 'Clinical findings',
      type: 'choice',
      options: [
        {
          value: 1,
          label: 'Class I — No clinical heart failure'
        },
        {
          value: 2,
          label: 'Class II — S3 gallop, rales, or elevated JVP'
        },
        {
          value: 3,
          label: 'Class III — Pulmonary edema'
        },
        {
          value: 4,
          label: 'Class IV — Cardiogenic shock'
        }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    if (v.class === undefined || v.class === '') {
      return {
        error: 'Please select the Killip class.'
      }
    }

    const value = Number(v.class)

    const interpretation = {
      1: 'No clinical heart failure',
      2: 'Clinical evidence of heart failure',
      3: 'Pulmonary edema',
      4: 'Cardiogenic shock'
    }[value]

    return {
      value,
      displayValue: `Class ${value}`,
      unit: 'Killip class',
      category: interpretation,
      note: 'Killip class describes the severity of heart failure in the setting of acute myocardial infarction.'
    }
  },

  references: [
    'Killip T, Kimball JT. Treatment of myocardial infarction in a coronary care unit. Am J Cardiol. 1967;20:457–464.'
  ]
}

export default calc
