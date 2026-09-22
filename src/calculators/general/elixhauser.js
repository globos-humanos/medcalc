const elixhauser = {
  id: 'elixhauser',
  name: 'Elixhauser Comorbidity Score',
  shortName: 'Elixhauser',
  categoryId: 'general-medicine',
  category: 'General Medicine',
  description:
    'Weighted Elixhauser comorbidity score using the van Walraven weighting system.',

  type: 'score',

  inputs: [
    {
      id: 'chf',
      label: 'Congestive Heart Failure',
      type: 'boolean'
    },

    {
      id: 'arrhythmia',
      label: 'Cardiac Arrhythmia',
      type: 'boolean'
    },

    {
      id: 'valvular',
      label: 'Valvular Disease',
      type: 'boolean'
    },

    {
      id: 'pulmonary_circulation',
      label: 'Pulmonary Circulation Disorder',
      type: 'boolean'
    },

    {
      id: 'pvd',
      label: 'Peripheral Vascular Disease',
      type: 'boolean'
    },

    {
      id: 'hypertension',
      label: 'Hypertension',
      type: 'choice',
      optionsLayout: 'stack',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'uncomplicated',
          label: 'Hypertension, uncomplicated'
        },
        {
          value: 'complicated',
          label: 'Hypertension, complicated'
        }
      ]
    },

    {
      id: 'paralysis',
      label: 'Paralysis',
      type: 'boolean'
    },

    {
      id: 'neuro_other',
      label: 'Other Neurological Disorder',
      type: 'boolean'
    },

    {
      id: 'copd',
      label: 'Chronic Pulmonary Disease',
      type: 'boolean'
    },

    {
      id: 'diabetes',
      label: 'Diabetes',
      type: 'choice',
      optionsLayout: 'stack',
      options: [
        {
          value: 'none',
          label: 'None'
        },
        {
          value: 'uncomplicated',
          label: 'Diabetes, uncomplicated'
        },
        {
          value: 'complicated',
          label: 'Diabetes with chronic complications'
        }
      ]
    },

    {
      id: 'hypothyroid',
      label: 'Hypothyroidism',
      type: 'boolean'
    },

    {
      id: 'renal',
      label: 'Renal Failure',
      type: 'boolean'
    },

    {
      id: 'liver',
      label: 'Liver Disease',
      type: 'boolean'
    },

    {
      id: 'ulcer',
      label: 'Peptic Ulcer Disease',
      type: 'boolean'
    },

    {
      id: 'aids',
      label: 'AIDS / HIV',
      type: 'boolean'
    },

    {
      id: 'lymphoma',
      label: 'Lymphoma',
      type: 'boolean'
    },

    {
      id: 'metastatic_cancer',
      label: 'Metastatic Cancer',
      type: 'boolean'
    },

    {
      id: 'solid_tumor',
      label: 'Solid Tumor Without Metastasis',
      type: 'boolean'
    },

    {
      id: 'rheumatoid',
      label: 'Rheumatoid Arthritis / Collagen Vascular Disease',
      type: 'boolean'
    },

    {
      id: 'coagulopathy',
      label: 'Coagulopathy',
      type: 'boolean'
    },

    {
      id: 'obesity',
      label: 'Obesity',
      type: 'boolean'
    },

    {
      id: 'weight_loss',
      label: 'Weight Loss',
      type: 'boolean'
    },

    {
      id: 'fluid_electrolyte',
      label: 'Fluid / Electrolyte Disorder',
      type: 'boolean'
    },

    {
      id: 'blood_loss_anemia',
      label: 'Blood Loss Anemia',
      type: 'boolean'
    },

    {
      id: 'deficiency_anemia',
      label: 'Deficiency Anemia',
      type: 'boolean'
    },

    {
      id: 'alcohol',
      label: 'Alcohol Abuse',
      type: 'boolean'
    },

    {
      id: 'drug_abuse',
      label: 'Drug Abuse',
      type: 'boolean'
    },

    {
      id: 'psychosis',
      label: 'Psychosis',
      type: 'boolean'
    },

    {
      id: 'depression',
      label: 'Depression',
      type: 'boolean'
    }
  ],

  calculate(values) {
    const yes = value => value === true || value === 'true'

    let score = 0

    /*
     * van Walraven Elixhauser weights
     */

    // Cardiovascular
    if (yes(values.chf)) score += 7
    if (yes(values.arrhythmia)) score += 5
    if (yes(values.valvular)) score -= 1
    if (yes(values.pulmonary_circulation)) score += 4
    if (yes(values.pvd)) score += 2

    // Hypertension
    // Both hypertension categories carry zero points
    // in the van Walraven weighted model.
    // They remain separate inputs because they are separate
    // Elixhauser comorbidity definitions.
    if (
      values.hypertension !== 'none' &&
      values.hypertension !== 'uncomplicated' &&
      values.hypertension !== 'complicated'
    ) {
      return {
        error: 'Please select the hypertension category.'
      }
    }

    // Neurologic
    if (yes(values.paralysis)) score += 2
    if (yes(values.neuro_other)) score += 7

    // Pulmonary
    if (yes(values.copd)) score += 3

    // Diabetes
    // Both uncomplicated and complicated diabetes receive
    // zero points in the van Walraven weighting system.
    if (
      values.diabetes !== 'none' &&
      values.diabetes !== 'uncomplicated' &&
      values.diabetes !== 'complicated'
    ) {
      return {
        error: 'Please select the diabetes category.'
      }
    }

    // Endocrine / renal
    if (yes(values.hypothyroid)) score += 0
    if (yes(values.renal)) score += 5

    // Hepatic / GI
    if (yes(values.liver)) score += 11
    if (yes(values.ulcer)) score += 0

    // Malignancy / immunologic
    if (yes(values.aids)) score += 0
    if (yes(values.lymphoma)) score += 9
    if (yes(values.metastatic_cancer)) score += 14

    /*
     * A metastatic cancer diagnosis and a non-metastatic
     * solid tumor should not be counted together.
     */
    if (yes(values.metastatic_cancer) && yes(values.solid_tumor)) {
      return {
        error:
          'Do not select both metastatic cancer and solid tumor without metastasis.'
      }
    }

    if (yes(values.solid_tumor)) score += 4

    // Rheumatologic / hematologic
    if (yes(values.rheumatoid)) score -= 1
    if (yes(values.coagulopathy)) score += 3

    // Nutritional / metabolic
    if (yes(values.obesity)) score -= 1
    if (yes(values.weight_loss)) score += 6
    if (yes(values.fluid_electrolyte)) score += 5

    // Anemia
    if (yes(values.blood_loss_anemia)) score -= 2
    if (yes(values.deficiency_anemia)) score -= 2

    // Substance use / psychiatric
    if (yes(values.alcohol)) score += 0
    if (yes(values.drug_abuse)) score -= 7
    if (yes(values.psychosis)) score -= 5
    if (yes(values.depression)) score -= 3

    let category = ''

    if (score < 0) {
      category = 'Negative weighted score'
    } else if (score <= 4) {
      category = 'Low weighted comorbidity burden'
    } else if (score <= 9) {
      category = 'Moderate weighted comorbidity burden'
    } else {
      category = 'High weighted comorbidity burden'
    }

    return {
      value: score,
      displayValue: `${score} points`,
      unit: 'points',
      category,
      interpretation:
        'This is the van Walraven-weighted Elixhauser Comorbidity Score. Higher scores represent greater weighted comorbidity burden.',
      note:
        'The weighted score is primarily a risk-adjustment/comorbidity measure. Its association with outcomes depends on the population and outcome being studied.'
    }
  },

  references: [
    'Elixhauser A, Steiner C, Harris DR, Coffey RM. Comorbidity measures for use with administrative data. Med Care. 1998;36(1):8-27.',
    'van Walraven C, Austin PC, Jennings A, Quan H, Forster AJ. A modification of the Elixhauser comorbidity measures into a point system for hospital death using administrative data. Med Care. 2009;47(6):626-633.'
  ]
}

export default elixhauser

