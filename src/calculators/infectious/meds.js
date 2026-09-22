const meds = {
  id: 'meds',
  name: 'MEDS Score',
  shortName: 'MEDS',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'Mortality in Emergency Department Sepsis score.',
  keywords: ['MEDS', 'sepsis', 'mortality'],

  inputs: [
    { id: 'terminal', label: 'Terminal illness', type: 'boolean' },
    { id: 'tachypnea', label: 'Tachypnea or hypoxia', type: 'boolean' },
    { id: 'shock', label: 'Septic shock', type: 'boolean' },
    { id: 'platelets', label: 'Platelet count <150 ×10⁹/L', type: 'boolean' },
    { id: 'bands', label: 'Band forms ≥5%', type: 'boolean' },
    { id: 'age', label: 'Age >65 years', type: 'boolean' },
    { id: 'lrti', label: 'Lower respiratory tract infection', type: 'boolean' },
    { id: 'nursing', label: 'Nursing-home residence', type: 'boolean' },
    { id: 'mental', label: 'Altered mental status', type: 'boolean' }
  ],

  calculate(v) {
    const score =
      (v.terminal ? 6 : 0) +
      (v.tachypnea ? 3 : 0) +
      (v.shock ? 3 : 0) +
      (v.platelets ? 3 : 0) +
      (v.bands ? 3 : 0) +
      (v.age ? 3 : 0) +
      (v.lrti ? 2 : 0) +
      (v.nursing ? 2 : 0) +
      (v.mental ? 2 : 0)

    return {
      value: score,
      displayValue: `${score}/27`,
      category:
        score <= 4
          ? 'Lower MEDS score range'
          : score <= 7
            ? 'Intermediate MEDS score range'
            : score <= 12
              ? 'Higher MEDS score range'
              : 'Very high MEDS score range',
      interpretation: `MEDS score = ${score}/27.`,
      note:
        'MEDS was developed for mortality risk stratification in emergency-department patients with suspected infection.'
    }
  },

  references: ['Shapiro et al. MEDS score']
}

export default meds
