const framingham = {
  id: 'framingham',
  name: 'Framingham 10-Year General CVD Risk',
  shortName: 'Framingham CVD',
  type: 'calculation',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description:
    '2008 Framingham general cardiovascular disease risk equation for 10-year CVD risk.',
  keywords: [
    'Framingham',
    'CVD risk',
    'cardiovascular risk',
    '10-year risk',
    'D’Agostino'
  ],

  inputs: [
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'age',
      label: 'Age',
      unit: 'years',
      min: 30,
      max: 74,
      step: 1
    },
    {
      id: 'totalCholesterol',
      label: 'Total cholesterol',
      unit: 'mg/dL',
      min: 50,
      max: 500,
      step: 1
    },
    {
      id: 'hdl',
      label: 'HDL cholesterol',
      unit: 'mg/dL',
      min: 5,
      max: 150,
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
      id: 'bpTreatment',
      label: 'Currently receiving antihypertensive treatment',
      type: 'boolean'
    },
    {
      id: 'smoker',
      label: 'Current cigarette smoker',
      type: 'boolean'
    },
    {
      id: 'diabetes',
      label: 'Diabetes mellitus',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const age = Number(v.age)
    const totalCholesterol = Number(v.totalCholesterol)
    const hdl = Number(v.hdl)
    const sbp = Number(v.sbp)

    if (
      !v.sex ||
      !Number.isFinite(age) ||
      !Number.isFinite(totalCholesterol) ||
      !Number.isFinite(hdl) ||
      !Number.isFinite(sbp) ||
      typeof v.bpTreatment !== 'boolean' ||
      typeof v.smoker !== 'boolean' ||
      typeof v.diabetes !== 'boolean'
    ) {
      return {
        error: 'Please complete all Framingham variables.'
      }
    }

    if (
      age < 30 ||
      age > 74 ||
      totalCholesterol <= 0 ||
      hdl <= 0 ||
      sbp <= 0
    ) {
      return {
        error:
          'The 2008 Framingham general CVD model is intended for ages 30–74 and requires positive cholesterol and blood-pressure values.'
      }
    }

    let riskFactor

    if (v.sex === 'male') {
      riskFactor =
        3.06117 * Math.log(age) +
        1.12370 * Math.log(totalCholesterol) -
        0.93263 * Math.log(hdl) +
        (v.bpTreatment
          ? 1.99881
          : 1.93303) * Math.log(sbp) +
        (v.smoker ? 0.65451 : 0) +
        (v.diabetes ? 0.57367 : 0) -
        23.9802

      const risk =
        1 -
        Math.pow(
          0.88936,
          Math.exp(riskFactor)
        )

      const percentage = Math.max(
        0,
        Math.min(100, risk * 100)
      )

      return {
        value: percentage,
        displayValue: `${percentage.toFixed(1)}%`,
        unit: '10-year CVD risk',
        category: 'Framingham 2008 — male equation',
        note:
          'Estimates 10-year risk of a first general CVD event, including coronary, cerebrovascular, peripheral arterial disease and heart failure. This is the lipid-based 2008 Framingham general CVD model.'
      }
    }

    riskFactor =
      2.32888 * Math.log(age) +
      1.20904 * Math.log(totalCholesterol) -
      0.70833 * Math.log(hdl) +
      (v.bpTreatment
        ? 2.82263
        : 2.76157) * Math.log(sbp) +
      (v.smoker ? 0.52873 : 0) +
      (v.diabetes ? 0.69154 : 0) -
      26.1931

    const risk =
      1 -
      Math.pow(
        0.95012,
        Math.exp(riskFactor)
      )

    const percentage = Math.max(
      0,
      Math.min(100, risk * 100)
    )

    return {
      value: percentage,
      displayValue: `${percentage.toFixed(1)}%`,
      unit: '10-year CVD risk',
      category: 'Framingham 2008 — female equation',
      note:
        'Estimates 10-year risk of a first general CVD event, including coronary, cerebrovascular, peripheral arterial disease and heart failure. This is the lipid-based 2008 Framingham general CVD model.'
    }
  },

  references: [
    'D’Agostino RB Sr, et al. General Cardiovascular Risk Profile for Use in Primary Care. Circulation. 2008;117:743–753.',
    'Framingham Heart Study — General CVD Risk Profile.'
  ]
}

export default framingham
