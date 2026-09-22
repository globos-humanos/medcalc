const waterlow = {
  id: 'waterlow',
  name: 'Waterlow Score',
  shortName: 'Waterlow Score',
  type: 'score',
  categoryId: 'general-medicine',
  category: 'General Medicine',

  description:
    'Adult Waterlow pressure-injury risk assessment using clinical descriptors and special-risk factors.',

  keywords: ['Waterlow', 'pressure injury', 'pressure ulcer', 'pressure sore'],
  aliases: ['Waterlow Score', 'Waterlow Scale'],

  inputs: [
    {
      id: 'sex',
      label: 'Sex',
      type: 'select',
      options: [
        {
          value: 'male',
          label: 'Male — 1 point'
        },
        {
          value: 'female',
          label: 'Female — 2 points'
        }
      ]
    },

    {
      id: 'age',
      label: 'Age',
      type: 'number',
      min: 14,
      max: 120,
      step: 1,
      unit: 'years'
    },

    {
      id: 'bmi',
      label: 'BMI',
      type: 'number',
      min: 5,
      max: 80,
      step: 0.1,
      unit: 'kg/m²'
    },

    {
      id: 'skin',
      label: 'Skin Type / Visual Risk Areas',
      type: 'select',
      options: [
        {
          value: 0,
          label: 'Healthy — 0 points'
        },
        {
          value: 1,
          label: 'Tissue paper / thin fragile skin — 1 point'
        },
        {
          value: 1,
          label: 'Dry / flaky skin — 1 point'
        },
        {
          value: 1,
          label: 'Oedematous skin — 1 point'
        },
        {
          value: 1,
          label: 'Clammy / raised temperature — 1 point'
        },
        {
          value: 2,
          label: 'Discoloured / Grade 1 skin damage — 2 points'
        },
        {
          value: 3,
          label: 'Broken skin / Grade 2–4 pressure injury — 3 points'
        }
      ]
    },

    {
      id: 'continence',
      label: 'Continence',
      type: 'select',
      options: [
        {
          value: 0,
          label: 'Complete / catheterised — 0 points'
        },
        {
          value: 1,
          label: 'Urinary incontinence — 1 point'
        },
        {
          value: 2,
          label: 'Faecal incontinence — 2 points'
        },
        {
          value: 3,
          label: 'Urinary + faecal incontinence — 3 points'
        }
      ]
    },

    {
      id: 'mobility',
      label: 'Mobility',
      type: 'select',
      options: [
        {
          value: 0,
          label: 'Fully mobile — 0 points'
        },
        {
          value: 1,
          label: 'Restless / fidgety — 1 point'
        },
        {
          value: 2,
          label: 'Apathetic / reluctant to move — 2 points'
        },
        {
          value: 3,
          label: 'Restricted mobility — 3 points'
        },
        {
          value: 4,
          label: 'Bedbound / traction — 4 points'
        },
        {
          value: 5,
          label: 'Chairbound / wheelchair — 5 points'
        }
      ]
    },

    {
      id: 'weightLoss',
      label: 'Recent Unintentional Weight Loss',
      type: 'select',
      options: [
        {
          value: 0,
          label: 'No weight loss — 0 points'
        },
        {
          value: 1,
          label: '0.5–5 kg — 1 point'
        },
        {
          value: 2,
          label: '5–10 kg — 2 points'
        },
        {
          value: 3,
          label: '10–15 kg — 3 points'
        },
        {
          value: 4,
          label: '>15 kg — 4 points'
        },
        {
          value: 2,
          label: 'Unsure whether weight was lost — 2 points'
        }
      ]
    },

    {
      id: 'poorAppetite',
      label: 'Poor Appetite / Eating Poorly',
      type: 'boolean'
    },

    {
      id: 'tissueCachexia',
      label: 'Terminal Cachexia',
      type: 'boolean'
    },

    {
      id: 'tissueMultiOrgan',
      label: 'Multiple Organ Failure',
      type: 'boolean'
    },

    {
      id: 'tissueSingleOrgan',
      label: 'Single Organ Failure (cardiac, renal or respiratory)',
      type: 'boolean'
    },

    {
      id: 'tissuePvd',
      label: 'Peripheral Vascular Disease',
      type: 'boolean'
    },

    {
      id: 'tissueAnaemia',
      label: 'Severe Anaemia (Hb <8 g/dL)',
      type: 'boolean'
    },

    {
      id: 'tissueSmoking',
      label: 'Smoking',
      type: 'boolean'
    },

    {
      id: 'neurologic',
      label: 'Neurological Deficit',
      type: 'select',
      options: [
        {
          value: 0,
          label: 'None — 0 points'
        },
        {
          value: 4,
          label: 'Neurological deficit, mild — 4 points'
        },
        {
          value: 5,
          label: 'Neurological deficit, moderate — 5 points'
        },
        {
          value: 6,
          label: 'Neurological deficit, severe / paraplegia — 6 points'
        }
      ]
    },

    {
      id: 'orthopaedicSpinal',
      label: 'Orthopaedic / Below-Waist / Spinal Surgery or Trauma',
      type: 'boolean'
    },

    {
      id: 'tableTime',
      label: 'Time on Operating Table',
      type: 'select',
      options: [
        {
          value: 0,
          label: '≤2 hours / not applicable — 0 points'
        },
        {
          value: 5,
          label: '>2 hours — 5 points'
        },
        {
          value: 8,
          label: '>6 hours — 8 points'
        }
      ]
    },

    {
      id: 'cytotoxic',
      label: 'Cytotoxic Medication',
      type: 'boolean'
    },

    {
      id: 'steroids',
      label: 'Long-term / High-dose Steroids',
      type: 'boolean'
    },

    {
      id: 'antiInflammatory',
      label: 'Anti-inflammatory Medication',
      type: 'boolean'
    }
  ],

  calculate(values) {
    const bmi = Number(values.bmi)
    const age = Number(values.age)

    if (!Number.isFinite(age) || age < 14 || age > 120) {
      return {
        error: 'Please enter a valid age between 14 and 120 years.'
      }
    }

    if (!Number.isFinite(bmi) || bmi < 5 || bmi > 80) {
      return {
        error: 'Please enter a valid BMI between 5 and 80 kg/m².'
      }
    }

    /*
     * BUILD / WEIGHT FOR HEIGHT
     *
     * Waterlow:
     * 20–24.9 = 0
     * 25–29.9 = 1
     * >30 = 2
     * <20 = 3
     */
    let buildScore = 0

    if (bmi < 20) {
      buildScore = 3
    } else if (bmi >= 20 && bmi < 25) {
      buildScore = 0
    } else if (bmi >= 25 && bmi < 30) {
      buildScore = 1
    } else {
      buildScore = 2
    }

    /*
     * SEX
     */
    const sexScore = values.sex === 'female' ? 2 : 1

    /*
     * AGE
     */
    let ageScore = 1

    if (age >= 50 && age <= 64) {
      ageScore = 2
    } else if (age >= 65 && age <= 74) {
      ageScore = 3
    } else if (age >= 75 && age <= 80) {
      ageScore = 4
    } else if (age >= 81) {
      ageScore = 5
    }

    /*
     * SKIN
     */
    const skinScore = Number(values.skin)

    if (!Number.isFinite(skinScore)) {
      return {
        error: 'Please select the skin assessment.'
      }
    }

    /*
     * CONTINENCE
     */
    const continenceScore = Number(values.continence)

    if (!Number.isFinite(continenceScore)) {
      return {
        error: 'Please select the continence category.'
      }
    }

    /*
     * MOBILITY
     */
    const mobilityScore = Number(values.mobility)

    if (!Number.isFinite(mobilityScore)) {
      return {
        error: 'Please select the mobility category.'
      }
    }

    /*
     * MALNUTRITION SCREENING TOOL
     *
     * Weight loss:
     * 0.5–5 kg = 1
     * 5–10 kg = 2
     * 10–15 kg = 3
     * >15 kg = 4
     * unsure = 2
     *
     * Poor appetite = 1
     */
    const weightLossScore = Number(values.weightLoss)

    if (!Number.isFinite(weightLossScore)) {
      return {
        error: 'Please select the recent weight-loss category.'
      }
    }

    const appetiteScore =
      values.poorAppetite === true || values.poorAppetite === 'true'
        ? 1
        : 0

    const nutritionScore = weightLossScore + appetiteScore

    /*
     * TISSUE MALNUTRITION
     *
     * These are special-risk factors and can contribute
     * additional points.
     */
    let tissueScore = 0

    if (values.tissueCachexia === true || values.tissueCachexia === 'true') {
      tissueScore += 8
    }

    if (
      values.tissueMultiOrgan === true ||
      values.tissueMultiOrgan === 'true'
    ) {
      tissueScore += 8
    }

    if (
      values.tissueSingleOrgan === true ||
      values.tissueSingleOrgan === 'true'
    ) {
      tissueScore += 5
    }

    if (values.tissuePvd === true || values.tissuePvd === 'true') {
      tissueScore += 5
    }

    if (values.tissueAnaemia === true || values.tissueAnaemia === 'true') {
      tissueScore += 2
    }

    if (values.tissueSmoking === true || values.tissueSmoking === 'true') {
      tissueScore += 1
    }

    /*
     * NEUROLOGICAL DEFICIT
     */
    const neurologicalScore = Number(values.neurologic)

    if (!Number.isFinite(neurologicalScore)) {
      return {
        error: 'Please select the neurological-deficit category.'
      }
    }

    /*
     * SURGERY / TRAUMA
     *
     * Orthopaedic/spinal risk can coexist with operative-duration risk.
     * >6 hours is represented by 8 rather than adding the >2-hour score.
     */
    let surgeryScore = 0

    if (
      values.orthopaedicSpinal === true ||
      values.orthopaedicSpinal === 'true'
    ) {
      surgeryScore += 5
    }

    const tableTimeScore = Number(values.tableTime)

    if (!Number.isFinite(tableTimeScore)) {
      return {
        error: 'Please select the operating-table duration.'
      }
    }

    surgeryScore += tableTimeScore

    /*
     * MEDICATION
     *
     * Medication contribution is capped at 4 points.
     */
    let medicationScore = 0

    const medicationFactors = [
      values.cytotoxic,
      values.steroids,
      values.antiInflammatory
    ]

    if (medicationFactors.some(v => v === true || v === 'true')) {
      medicationScore = 4
    }

    /*
     * TOTAL
     */
    const score =
      buildScore +
      sexScore +
      ageScore +
      skinScore +
      continenceScore +
      mobilityScore +
      nutritionScore +
      tissueScore +
      neurologicalScore +
      surgeryScore +
      medicationScore

    let category = ''

    if (score < 10) {
      category = 'Not currently at risk'
    } else if (score < 15) {
      category = 'At risk'
    } else if (score < 20) {
      category = 'High risk'
    } else {
      category = 'Very high risk'
    }

    return {
      value: score,
      displayValue: `${score} points`,
      unit: 'points',
      category,
      interpretation:
        score < 10
          ? 'Waterlow score <10: not currently classified as at risk by this scoring system.'
          : score < 15
            ? 'Waterlow score 10–14: at risk of pressure injury.'
            : score < 20
              ? 'Waterlow score 15–19: high risk of pressure injury.'
              : 'Waterlow score ≥20: very high risk of pressure injury.',
      note:
        'Waterlow is a risk-assessment aid and should be used with clinical judgement, skin inspection, and local pressure-injury prevention protocols.'
    }
  },

  references: [
    'Waterlow J. Waterlow Pressure Ulcer Risk Assessment.',
    'Waterlow pressure ulcer risk assessment charts used in UK clinical practice.',
    'NICE Clinical Guideline 179 — Prevention and Management of Pressure Ulcers.'
  ]
}

export default waterlow

