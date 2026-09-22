const aims65 = {
  id: 'aims65',
  name: 'AIMS65 Score',
  shortName: 'AIMS65',
  categoryId: 'gastro',
  description: 'Pre-endoscopy risk score for upper gastrointestinal bleeding.',
  keywords: ['AIMS65', 'GI bleed', 'upper GI bleeding', 'risk'],

  inputs: [
    {
      id: 'albumin',
      label: 'Albumin < 3.0 g/dL',
      type: 'boolean'
    },
    {
      id: 'inr',
      label: 'INR > 1.5',
      type: 'boolean'
    },
    {
      id: 'mentalStatus',
      label: 'Altered mental status',
      type: 'boolean'
    },
    {
      id: 'systolicBP',
      label: 'Systolic BP ≤ 90 mmHg',
      type: 'boolean'
    },
    {
      id: 'age65',
      label: 'Age ≥ 65 years',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const score =
      (v.albumin ? 1 : 0) +
      (v.inr ? 1 : 0) +
      (v.mentalStatus ? 1 : 0) +
      (v.systolicBP ? 1 : 0) +
      (v.age65 ? 1 : 0);

    return {
      value: score,
      displayValue: String(score) + '/5',
      unit: 'points',
      category: score === 0 ? 'AIMS65 = 0' : 'AIMS65 ≥ 1',
      interpretation:
        score === 0
          ? 'No AIMS65 risk factors are present.'
          : score === 1
            ? 'One AIMS65 risk factor is present.'
            : score + ' AIMS65 risk factors are present.',
      note:
        'AIMS65 assigns 1 point each for albumin <3.0 g/dL, INR >1.5, altered mental status, systolic BP ≤90 mmHg, and age ≥65 years.'
    };
  }
};

export default aims65;
