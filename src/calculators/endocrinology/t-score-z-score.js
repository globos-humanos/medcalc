const calc = {
  id: 't-score-z-score',
  name: 'T-Score / Z-Score',
  shortName: 'T / Z Score',
  categoryId: 'endocrinology',
  description: 'Calculates T-score and Z-score from a measured value and reference mean and standard deviation.',

  inputs: [
    {
      id: 'measured',
      label: 'Measured BMD / value',
      type: 'number',
      step: 0.001
    },
    {
      id: 'youngMean',
      label: 'Young-adult reference mean',
      type: 'number',
      step: 0.001
    },
    {
      id: 'youngSd',
      label: 'Young-adult reference SD',
      type: 'number',
      step: 0.001
    },
    {
      id: 'ageMean',
      label: 'Age-matched reference mean',
      type: 'number',
      step: 0.001
    },
    {
      id: 'ageSd',
      label: 'Age-matched reference SD',
      type: 'number',
      step: 0.001
    }
  ],

  calculate(v) {
    const measured = Number(v.measured)
    const youngMean = Number(v.youngMean)
    const youngSd = Number(v.youngSd)
    const ageMean = Number(v.ageMean)
    const ageSd = Number(v.ageSd)

    if (
      !Number.isFinite(measured) ||
      !Number.isFinite(youngMean) ||
      !Number.isFinite(youngSd) ||
      !Number.isFinite(ageMean) ||
      !Number.isFinite(ageSd) ||
      youngSd <= 0 ||
      ageSd <= 0
    ) {
      return {
        error: 'Please enter valid reference means and standard deviations.'
      }
    }

    const tScore =
      (measured - youngMean) /
      youngSd

    const zScore =
      (measured - ageMean) /
      ageSd

    return {
      value: `T ${tScore.toFixed(2)} | Z ${zScore.toFixed(2)}`,
      unit: 'SD',
      interpretation:
        tScore >= -1
          ? 'T-score ≥ −1 SD'
          : tScore > -2.5
            ? 'T-score between −1 and −2.5 SD'
            : 'T-score ≤ −2.5 SD',
      note: 'Interpretation of T-scores depends on the population, sex, menopausal status, skeletal site and applicable densitometry guidance. Z-scores compare with an age-matched reference population.'
    }
  },

  references: [
    'International Society for Clinical Densitometry (ISCD) densitometry terminology and interpretation.'
  ]
}

export default calc