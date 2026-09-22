const feverpain = {
  id: 'feverpain',
  name: 'FeverPAIN Score',
  shortName: 'FeverPAIN',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'Clinical prediction rule for acute sore throat.',
  keywords: ['FeverPAIN', 'sore throat', 'pharyngitis'],

  inputs: [
    { id: 'fever', label: 'Fever in previous 24 hours', type: 'boolean' },
    { id: 'purulence', label: 'Purulence', type: 'boolean' },
    { id: 'attend', label: 'Attendance within 3 days of symptom onset', type: 'boolean' },
    { id: 'inflamed', label: 'Severely inflamed tonsils', type: 'boolean' },
    { id: 'noCough', label: 'No cough or coryza', type: 'boolean' }
  ],

  calculate(v) {
    const score =
      Number(v.fever) +
      Number(v.purulence) +
      Number(v.attend) +
      Number(v.inflamed) +
      Number(v.noCough)

    return {
      value: score,
      displayValue: `${score}/5`,
      category:
        score <= 1
          ? 'Lower probability'
          : score <= 3
            ? 'Intermediate probability'
            : 'Higher probability',
      interpretation: `FeverPAIN score = ${score}/5.`,
      note:
        'FeverPAIN is a clinical prediction rule for acute sore throat and should be used alongside the applicable local testing/treatment pathway.'
    }
  },

  references: ['FeverPAIN clinical prediction rule']
}

export default feverpain
