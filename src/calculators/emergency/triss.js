const triss = {
  id: 'triss',
  name: 'Trauma and Injury Severity Score',
  shortName: 'TRISS',
  categoryId: 'emergency',
  category: 'Emergency / Trauma',
  description:
    'Estimates probability of survival after trauma using RTS, ISS, age and mechanism of injury.',
  type: 'calculation',

  inputs: [
    {
      id: 'gcs',
      label: 'Glasgow Coma Scale',
      min: 3,
      max: 15,
      step: 1
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      unit: 'mmHg',
      min: 0,
      max: 300,
      step: 1
    },
    {
      id: 'rr',
      label: 'Respiratory rate',
      unit: '/min',
      min: 0,
      max: 100,
      step: 1
    },
    {
      id: 'iss',
      label: 'Injury Severity Score',
      unit: 'ISS',
      min: 0,
      max: 75,
      step: 1
    },
    {
      id: 'age',
      label: 'Age',
      unit: 'years',
      min: 0,
      max: 120,
      step: 1
    },
    {
      id: 'mechanism',
      label: 'Mechanism of injury',
      type: 'choice',
      options: [
        {
          value: 'blunt',
          label: 'Blunt trauma'
        },
        {
          value: 'penetrating',
          label: 'Penetrating trauma'
        }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const gcs = Number(v.gcs)
    const sbp = Number(v.sbp)
    const rr = Number(v.rr)
    const iss = Number(v.iss)
    const age = Number(v.age)

    if (
      !Number.isFinite(gcs) ||
      !Number.isFinite(sbp) ||
      !Number.isFinite(rr) ||
      !Number.isFinite(iss) ||
      !Number.isFinite(age) ||
      !['blunt', 'penetrating'].includes(v.mechanism)
    ) {
      return {
        error: 'Please complete all TRISS variables.'
      }
    }

    if (
      gcs < 3 ||
      gcs > 15 ||
      sbp < 0 ||
      rr < 0 ||
      iss < 0 ||
      iss > 75 ||
      age < 0
    ) {
      return {
        error: 'Please enter valid trauma values.'
      }
    }

    // Revised Trauma Score physiologic component.
    const gcsCoded =
      gcs === 15
        ? 4
        : gcs >= 13
          ? 3
          : gcs >= 9
            ? 2
            : gcs >= 6
              ? 1
              : 0

    const sbpCoded =
      sbp >= 90
        ? 4
        : sbp >= 76
          ? 3
          : sbp >= 50
            ? 2
            : sbp >= 1
              ? 1
              : 0

    const rrCoded =
      rr >= 10 && rr <= 29
        ? 4
        : rr >= 30
          ? 3
          : rr >= 6
            ? 2
            : rr >= 1
              ? 1
              : 0

    const rts =
      0.9368 * gcsCoded +
      0.7326 * sbpCoded +
      0.2908 * rrCoded

    // TRISS uses a dichotomous age index:
    // 0 for age <55 years, 1 for age ≥55 years.
    const ageIndex = age >= 55 ? 1 : 0

    let b

    if (v.mechanism === 'blunt') {
      b =
        -0.4499 +
        0.8085 * rts -
        0.0835 * iss -
        1.7430 * ageIndex
    } else {
      b =
        -2.5355 +
        0.9934 * rts -
        0.0651 * iss -
        1.1360 * ageIndex
    }

    const probabilitySurvival = 1 / (1 + Math.exp(-b))
    const percentSurvival = probabilitySurvival * 100

    return {
      value: percentSurvival,
      displayValue: `${percentSurvival.toFixed(1)}%`,
      unit: 'probability of survival',
      category:
        v.mechanism === 'blunt'
          ? 'TRISS — blunt trauma'
          : 'TRISS — penetrating trauma',
      note:
        `RTS ${rts.toFixed(2)} • ISS ${iss} • age index ${ageIndex}. This estimate uses the published TRISS coefficients and should be interpreted in the context of the model version, trauma population and clinical setting.`
    }
  },

  references: [
    'Champion HR, et al. A revision of the Trauma Score. Journal of Trauma. 1989.',
    'Boyd CR, Tolson MA, Copes WS. Evaluating trauma care: the TRISS method. Journal of Trauma. 1987;27:370–378.',
    'Sacco WJ, et al. Trauma and Injury Severity Score (TRISS) coefficients 2009 revision. Journal of Trauma. 2010.',
    'TRISS methodology combines RTS, ISS, age and mechanism of injury.'
  ]
}

export default triss
