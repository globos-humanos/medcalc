const zahara = {
  id: 'zahara',
  name: 'ZAHARA Score',
  shortName: 'ZAHARA',
  categoryId: 'obgyn',
  description: 'Weighted ZAHARA score for maternal cardiac complications in pregnancy with congenital heart disease.',
  type: 'score',
  inputs: [
    {
      id: 'arrhythmia',
      label: 'History of arrhythmia',
      type: 'boolean'
    },
    {
      id: 'meds',
      label: 'Cardiovascular medication before pregnancy',
      type: 'boolean'
    },
    {
      id: 'nyha',
      label: 'NYHA functional class >=II before pregnancy',
      type: 'boolean'
    },
    {
      id: 'left',
      label: 'Left-heart obstruction',
      type: 'boolean'
    },
    {
      id: 'systemicRegurg',
      label: 'Moderate/severe systemic AV-valve regurgitation',
      type: 'boolean'
    },
    {
      id: 'subpulmonaryRegurg',
      label: 'Moderate/severe subpulmonary AV-valve regurgitation',
      type: 'boolean'
    },
    {
      id: 'mechanical',
      label: 'Mechanical valve prosthesis',
      type: 'boolean'
    },
    {
      id: 'cyanotic',
      label: 'Cyanotic heart disease',
      type: 'boolean'
    }
  ],
  calculate(v) {
    const score =
      (v.arrhythmia ? 1.5 : 0) +
      (v.meds ? 1.5 : 0) +
      (v.nyha ? 0.75 : 0) +
      (v.left ? 2.5 : 0) +
      (v.systemicRegurg ? 0.75 : 0) +
      (v.subpulmonaryRegurg ? 0.75 : 0) +
      (v.mechanical ? 4.25 : 0) +
      (v.cyanotic ? 1 : 0);

    return {
      value: score,
      displayValue: score.toFixed(2),
      unit: 'points',
      interpretation: 'Calculated ZAHARA score',
      note: 'The ZAHARA score is a pregnancy cardiac-risk model for women with congenital heart disease. Published event rates vary across cohorts; interpret the score in the context of the original model population.'
    };
  }
};

export default zahara;
