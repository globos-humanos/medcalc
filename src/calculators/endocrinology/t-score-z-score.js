const calc = {
  id: 't-score-z-score',
  name: 'T-Score / Z-Score',
  shortName: 'T / Z Score',
  categoryId: 'endocrinology',
  category: 'Endocrinology',
  description:
    'Calculates T-score and Z-score from a measured value and appropriate reference mean and standard deviation.',
  type: 'calculation',

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
    },
    {
      id: 'interpretationGroup',
      label: 'Interpretation population',
      type: 'choice',
      options: [
        {
          value: 't',
          label: 'Postmenopausal woman or man ≥50 years'
        },
        {
          value: 'z',
          label: 'Premenopausal woman or man <50 years'
        }
      ],
      optionsLayout: 'stack'
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
      ageSd <= 0 ||
      !['t', 'z'].includes(v.interpretationGroup)
    ) {
      return {
        error: 'Please enter valid reference values and select the interpretation population.'
      }
    }

    const tScore =
      (measured - youngMean) /
      youngSd

    const zScore =
      (measured - ageMean) /
      ageSd

    if (v.interpretationGroup === 't') {
      return {
        value: tScore,
        displayValue: tScore.toFixed(1),
        unit: 'T-score',
        category:
          tScore > -1
            ? 'Normal bone density range'
            : tScore > -2.5
              ? 'Low bone mass range'
              : 'Osteoporosis-range T-score',
        note:
          `Z-score for comparison: ${zScore.toFixed(1)}. For the selected population, T-score interpretation is the preferred densitometric framework. WHO diagnostic criteria use T-score ≤−2.5 at applicable skeletal sites.`
      }
    }

    return {
      value: zScore,
      displayValue: zScore.toFixed(1),
      unit: 'Z-score',
      category:
        zScore <= -2
          ? 'Below expected range for age'
          : 'Within expected range for age',
      note:
        `T-score for reference: ${tScore.toFixed(1)}. For the selected population, Z-score reporting is preferred; a Z-score ≤−2.0 is defined by ISCD as below the expected range for age.`
    }
  },

  references: [
    'International Society for Clinical Densitometry. Official Positions 2023.',
    'WHO densitometric classification and ISCD reporting recommendations.'
  ]
}

export default calc
