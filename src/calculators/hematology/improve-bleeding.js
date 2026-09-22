const improveBleeding = {
  id: 'improve-bleeding',
  name: 'IMPROVE Bleeding Score',
  shortName: 'IMPROVE Bleeding',
  categoryId: 'hematology',
  description:
    'Bleeding risk assessment model for hospitalized medical patients.',
  type: 'score',

  inputs: [
    { id: 'renalModerate', label: 'Moderate renal failure — GFR 30–59?', type: 'boolean' },
    { id: 'male', label: 'Male sex?', type: 'boolean' },
    { id: 'age4084', label: 'Age 40–84 years?', type: 'boolean' },
    { id: 'cancer', label: 'Active cancer?', type: 'boolean' },
    { id: 'rheumatic', label: 'Rheumatic disease?', type: 'boolean' },
    { id: 'centralLine', label: 'Central venous catheter?', type: 'boolean' },
    { id: 'icu', label: 'ICU/critical-care stay?', type: 'boolean' },
    { id: 'renalSevere', label: 'Severe renal failure — GFR <30?', type: 'boolean' },
    { id: 'hepatic', label: 'Hepatic failure / INR >1.5?', type: 'boolean' },
    { id: 'age85', label: 'Age ≥85 years?', type: 'boolean' },
    { id: 'platelets', label: 'Platelet count <50 ×10⁹/L?', type: 'boolean' },
    { id: 'recentBleed', label: 'Bleeding within 3 months before admission?', type: 'boolean' },
    { id: 'ulcer', label: 'Active gastroduodenal ulcer?', type: 'boolean' }
  ],

  calculate(v) {
    if (
      Object.values(v).some(value => typeof value !== 'boolean')
    ) {
      return {
        error: 'Please answer all IMPROVE Bleeding criteria.'
      }
    }

    // Age categories are mutually exclusive.
    const agePoints = v.age85
      ? 3.5
      : v.age4084
        ? 1.5
        : 0

    // Renal categories are mutually exclusive.
    const renalPoints = v.renalSevere
      ? 2.5
      : v.renalModerate
        ? 1
        : 0

    const score =
      renalPoints +
      (v.male ? 1 : 0) +
      agePoints +
      (v.cancer ? 2 : 0) +
      (v.rheumatic ? 2 : 0) +
      (v.centralLine ? 2 : 0) +
      (v.icu ? 2.5 : 0) +
      (v.hepatic ? 2.5 : 0) +
      (v.platelets ? 4 : 0) +
      (v.recentBleed ? 4 : 0) +
      (v.ulcer ? 4.5 : 0)

    const rounded = Number(score.toFixed(1))

    return {
      value: rounded,
      displayValue: String(rounded),
      unit: 'points',
      category:
        rounded >= 7
          ? 'High bleeding-risk threshold reached'
          : 'Below high bleeding-risk threshold',
      interpretation:
        rounded >= 7
          ? 'IMPROVE Bleeding score is ≥7.'
          : 'IMPROVE Bleeding score is <7.',
      note:
        'Age and renal-function categories are mutually exclusive in this implementation. The commonly used high-risk threshold is ≥7.'
    }
  },

  references: [
    'IMPROVE Bleeding Risk Assessment Model.'
  ]
}

export default improveBleeding
