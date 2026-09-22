const charlson = {
  id: 'charlson',
  name: 'Charlson Comorbidity Index',
  shortName: 'Charlson',
  categoryId: 'general-medicine',
  category: 'General Medicine',
  description:
    'Age-adjusted Charlson Comorbidity Index for estimating overall comorbidity burden.',

  type: 'score',

  inputs: [
    {
      id: 'mi',
      label: 'Prior Myocardial Infarction',
      type: 'boolean'
    },

    {
      id: 'chf',
      label: 'Congestive Heart Failure',
      type: 'boolean'
    },

    {
      id: 'pvd',
      label: 'Peripheral Vascular Disease',
      type: 'boolean'
    },

    {
      id: 'cva',
      label: 'Cerebrovascular Disease / Prior Stroke',
      type: 'boolean'
    },

    {
      id: 'dementia',
      label: 'Dementia',
      type: 'boolean'
    },

    {
      id: 'copd',
      label: 'Chronic Pulmonary Disease',
      type: 'boolean'
    },

    {
      id: 'ctd',
      label: 'Connective Tissue Disease',
      type: 'boolean'
    },

    {
      id: 'ulcer',
      label: 'Peptic Ulcer Disease',
      type: 'boolean'
    },

    {
      id: 'liver',
      label: 'Liver Disease',
      type: 'choice',
      optionsLayout: 'stack',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'mild',
          label: 'Mild liver disease'
        },
        {
          value: 'severe',
          label: 'Moderate or severe liver disease'
        }
      ]
    },

    {
      id: 'diabetes',
      label: 'Diabetes Mellitus',
      type: 'choice',
      optionsLayout: 'stack',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'uncomplicated',
          label: 'Diabetes without end-organ damage'
        },
        {
          value: 'complicated',
          label: 'Diabetes with end-organ damage'
        }
      ]
    },

    {
      id: 'renal',
      label: 'Moderate or Severe Renal Disease',
      type: 'boolean'
    },

    {
      id: 'hemiplegia',
      label: 'Hemiplegia',
      type: 'boolean'
    },

    {
      id: 'tumor',
      label: 'Solid Tumor',
      type: 'choice',
      optionsLayout: 'stack',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'localized',
          label: 'Any solid tumor without metastasis'
        },
        {
          value: 'metastatic',
          label: 'Metastatic solid tumor'
        }
      ]
    },

    {
      id: 'leukemia',
      label: 'Leukemia',
      type: 'boolean'
    },

    {
      id: 'lymphoma',
      label: 'Lymphoma',
      type: 'boolean'
    },

    {
      id: 'aids',
      label: 'AIDS / HIV',
      type: 'boolean'
    },

    {
      id: 'age',
      label: 'Age',
      type: 'number',
      unit: 'years',
      min: 18,
      max: 120,
      step: 1
    }
  ],

  calculate(values) {
    const age = Number(values.age)

    if (!Number.isFinite(age) || age < 18 || age > 120) {
      return {
        error: 'Please enter a valid age between 18 and 120 years.'
      }
    }

    let score = 0

    // 1-point conditions
    if (values.mi === true || values.mi === 'true') {
      score += 1
    }

    if (values.chf === true || values.chf === 'true') {
      score += 1
    }

    if (values.pvd === true || values.pvd === 'true') {
      score += 1
    }

    if (values.cva === true || values.cva === 'true') {
      score += 1
    }

    if (values.dementia === true || values.dementia === 'true') {
      score += 1
    }

    if (values.copd === true || values.copd === 'true') {
      score += 1
    }

    if (values.ctd === true || values.ctd === 'true') {
      score += 1
    }

    if (values.ulcer === true || values.ulcer === 'true') {
      score += 1
    }

    // Liver disease
    if (values.liver === 'mild') {
      score += 1
    } else if (values.liver === 'severe') {
      score += 3
    }

    // Diabetes
    if (values.diabetes === 'uncomplicated') {
      score += 1
    } else if (values.diabetes === 'complicated') {
      score += 2
    }

    // 2-point conditions
    if (values.renal === true || values.renal === 'true') {
      score += 2
    }

    if (values.hemiplegia === true || values.hemiplegia === 'true') {
      score += 2
    }

    if (values.tumor === 'localized') {
      score += 2
    } else if (values.tumor === 'metastatic') {
      score += 6
    }

    if (values.leukemia === true || values.leukemia === 'true') {
      score += 2
    }

    if (values.lymphoma === true || values.lymphoma === 'true') {
      score += 2
    }

    // 6-point condition
    if (values.aids === true || values.aids === 'true') {
      score += 6
    }

    // Age adjustment
    if (age >= 50 && age < 60) {
      score += 1
    } else if (age >= 60 && age < 70) {
      score += 2
    } else if (age >= 70 && age < 80) {
      score += 3
    } else if (age >= 80) {
      score += 4
    }

    let ageAdjustment = 0

    if (age >= 50 && age < 60) {
      ageAdjustment = 1
    } else if (age >= 60 && age < 70) {
      ageAdjustment = 2
    } else if (age >= 70 && age < 80) {
      ageAdjustment = 3
    } else if (age >= 80) {
      ageAdjustment = 4
    }

    return {
      value: score,
      displayValue: `${score} points`,
      unit: 'points',
      category: 'Age-adjusted Charlson Comorbidity Index',
      interpretation:
        'Higher scores indicate greater comorbidity burden. This version includes the age adjustment.',
      note:
        `Age contribution: ${ageAdjustment} point${ageAdjustment === 1 ? '' : 's'}. The index is a comorbidity-burden measure; outcome associations vary by population and clinical setting.`
    }
  },

  references: [
    'Charlson ME, Pompei P, Ales KL, MacKenzie CR. A new method of classifying prognostic comorbidity in longitudinal studies: development and validation. J Chronic Dis. 1987;40(5):373-383.',
    'Charlson Comorbidity Index â€” age-adjusted scoring system.'
  ]
}

export default charlson

