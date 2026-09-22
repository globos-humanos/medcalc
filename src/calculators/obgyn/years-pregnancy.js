const pregnancyYears = {
  id: 'pregnancy-adapted-years',
  name: 'Pregnancy-Adapted YEARS',
  shortName: 'Pregnancy YEARS',
  categoryId: 'obgyn',
  description: 'Pregnancy-adapted YEARS diagnostic pathway for suspected pulmonary embolism.',
  type: 'score',
  inputs: [
    {
      id: 'dvt',
      label: 'Clinical signs of DVT',
      type: 'boolean'
    },
    {
      id: 'hemoptysis',
      label: 'Hemoptysis',
      type: 'boolean'
    },
    {
      id: 'peLikely',
      label: 'PE judged most likely diagnosis',
      type: 'boolean'
    },
    {
      id: 'ddimer',
      label: 'D-dimer',
      unit: 'ng/mL',
      min: 0
    }
  ],
  calculate(v) {
    const ddimer = Number(v.ddimer);

    if (!Number.isFinite(ddimer)) {
      return {
        error: 'Enter the D-dimer value.'
      };
    }

    const criteria =
      (v.dvt ? 1 : 0) +
      (v.hemoptysis ? 1 : 0) +
      (v.peLikely ? 1 : 0);

    const threshold = criteria === 0 ? 1000 : 500;
    const belowThreshold = ddimer < threshold;

    return {
      value: criteria,
      unit: 'YEARS criteria',
      interpretation: belowThreshold
        ? `D-dimer is below the ${threshold} ng/mL YEARS threshold`
        : `D-dimer is at or above the ${threshold} ng/mL YEARS threshold`,
      note: 'The pregnancy-adapted YEARS pathway is part of a complete PE diagnostic strategy and should not be interpreted as a standalone PE diagnosis.'
    };
  }
};

export default pregnancyYears;
