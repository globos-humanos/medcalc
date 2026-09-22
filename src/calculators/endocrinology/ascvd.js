const calc = {
  id: 'ascvd',
  name: 'ASCVD 10-Year Risk',
  shortName: 'ASCVD',
  categoryId: 'endocrinology',
  category: 'Endocrinology',
  description:
    '2013 ACC/AHA Pooled Cohort Equation for estimated 10-year risk of a first hard ASCVD event.',
  type: 'score',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      unit: 'years',
      min: 40,
      max: 79,
      step: 1
    },
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]
    },
    {
      id: 'race',
      label: 'PCE race category',
      type: 'choice',
      options: [
        { value: 'white', label: 'White / other' },
        { value: 'black', label: 'Black / African American' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'tc',
      label: 'Total cholesterol',
      unit: 'mg/dL',
      min: 50,
      max: 600,
      step: 1
    },
    {
      id: 'hdl',
      label: 'HDL cholesterol',
      unit: 'mg/dL',
      min: 10,
      max: 200,
      step: 1
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      unit: 'mmHg',
      min: 70,
      max: 250,
      step: 1
    },
    {
      id: 'treated',
      label: 'Currently taking antihypertensive medication?',
      type: 'boolean'
    },
    {
      id: 'smoker',
      label: 'Current smoker?',
      type: 'boolean'
    },
    {
      id: 'diabetes',
      label: 'Diabetes?',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const age = Number(v.age)
    const tc = Number(v.tc)
    const hdl = Number(v.hdl)
    const sbp = Number(v.sbp)

    if (
      !Number.isFinite(age) ||
      !Number.isFinite(tc) ||
      !Number.isFinite(hdl) ||
      !Number.isFinite(sbp) ||
      !['male', 'female'].includes(v.sex) ||
      !['white', 'black'].includes(v.race)
    ) {
      return {
        error: 'Please complete all ASCVD variables.'
      }
    }

    if (
      age < 40 ||
      age > 79 ||
      tc <= 0 ||
      hdl <= 0 ||
      sbp <= 0
    ) {
      return {
        error: 'Please enter valid ASCVD risk inputs.'
      }
    }

    const lnAge = Math.log(age)
    const lnTc = Math.log(tc)
    const lnHdl = Math.log(hdl)
    const lnSbp = Math.log(sbp)
    const smoker = v.smoker ? 1 : 0
    const diabetes = v.diabetes ? 1 : 0
    const treated = v.treated ? 1 : 0

    let sum
    let mean
    let baseline

    if (v.sex === 'female' && v.race === 'white') {
      sum =
        -29.799 * lnAge +
        4.884 * lnAge * lnAge +
        13.540 * lnTc -
        3.114 * lnAge * lnTc -
        13.578 * lnHdl +
        3.149 * lnAge * lnHdl +
        (treated ? 2.019 : 1.957) * lnSbp +
        7.574 * smoker -
        1.665 * lnAge * smoker +
        0.661 * diabetes

      mean = -29.18
      baseline = 0.9665
    } else if (v.sex === 'female' && v.race === 'black') {
      sum =
        17.114 * lnAge +
        0.940 * lnTc -
        18.920 * lnHdl +
        4.475 * lnAge * lnHdl +
        (treated
          ? 29.291 * lnSbp - 6.432 * lnAge * lnSbp
          : 27.820 * lnSbp - 6.087 * lnAge * lnSbp) +
        0.691 * smoker +
        0.874 * diabetes

      mean = 86.61
      baseline = 0.9533
    } else if (v.sex === 'male' && v.race === 'white') {
      sum =
        12.344 * lnAge +
        11.853 * lnTc -
        2.664 * lnAge * lnTc -
        7.990 * lnHdl +
        1.769 * lnAge * lnHdl +
        (treated ? 1.797 : 1.764) * lnSbp +
        7.837 * smoker -
        1.795 * lnAge * smoker +
        0.658 * diabetes

      mean = 61.18
      baseline = 0.9144
    } else {
      sum =
        2.469 * lnAge +
        0.302 * lnTc -
        0.307 * lnHdl +
        (treated ? 1.916 : 1.809) * lnSbp +
        0.549 * smoker +
        0.645 * diabetes

      mean = 19.54
      baseline = 0.8954
    }

    const risk = 1 - Math.pow(baseline, Math.exp(sum - mean))
    const percent = Math.max(0, Math.min(100, risk * 100))

    return {
      value: percent,
      displayValue: `${percent.toFixed(1)}%`,
      unit: '10-year ASCVD risk',
      category:
        percent < 5
          ? 'Low risk'
          : percent < 7.5
            ? 'Borderline risk'
            : percent < 20
              ? 'Intermediate risk'
              : 'High risk',
      note:
        'This is the 2013 ACC/AHA Pooled Cohort Equation. It estimates first hard ASCVD events and should not be interpreted as a universal risk model for every population. The current ACC CVD Risk Estimator Plus also includes the newer PREVENT equations.'
    }
  },

  references: [
    'Goff DC Jr, et al. 2013 ACC/AHA Guideline on the Assessment of Cardiovascular Risk. Circulation. 2014;129:S49–S73.',
    'American College of Cardiology. ASCVD Risk Estimator.',
    'American College of Cardiology. CVD Risk Estimator Plus.'
  ]
}

export default calc
