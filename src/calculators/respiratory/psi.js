const psi = {
  id: 'psi',
  name: 'Pneumonia Severity Index (PSI/PORT)',
  shortName: 'PSI',
  type: 'score',
  categoryId: 'respiratory',
  category: 'Respiratory',
  description:
    'Calculates the Pneumonia Severity Index (PSI/PORT) score for adults with community-acquired pneumonia to estimate 30-day mortality risk and assist with disposition decisions.',
  keywords: [
    'PSI',
    'PORT',
    'Pneumonia Severity Index',
    'pneumonia',
    'community acquired pneumonia',
    'CAP',
    'mortality',
    'risk stratification'
  ],
  aliases: [
    'Pneumonia Severity Index',
    'PORT Score',
    'PSI Score'
  ],

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      unit: 'years',
      min: 18,
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
      id: 'nursingHome',
      label: 'Nursing home resident',
      type: 'boolean'
    },

    {
      id: 'neoplasticDisease',
      label: 'Neoplastic disease',
      type: 'boolean'
    },
    {
      id: 'liverDisease',
      label: 'Liver disease',
      type: 'boolean'
    },
    {
      id: 'congestiveHeartFailure',
      label: 'Congestive heart failure',
      type: 'boolean'
    },
    {
      id: 'cerebrovascularDisease',
      label: 'Cerebrovascular disease',
      type: 'boolean'
    },
    {
      id: 'renalDisease',
      label: 'Renal disease',
      type: 'boolean'
    },

    {
      id: 'alteredMentalStatus',
      label: 'Altered mental status',
      type: 'boolean'
    },
    {
      id: 'respiratoryRate',
      label: 'Respiratory rate',
      type: 'number',
      unit: '/min',
      min: 0,
      step: 1
    },
    {
      id: 'systolicBP',
      label: 'Systolic blood pressure',
      type: 'number',
      unit: 'mmHg',
      min: 0,
      step: 1
    },
    {
      id: 'temperature',
      label: 'Temperature',
      type: 'number',
      unit: '°C',
      step: 0.1
    },
    {
      id: 'pulse',
      label: 'Pulse',
      type: 'number',
      unit: 'beats/min',
      min: 0,
      step: 1
    },

    {
      id: 'arterialPh',
      label: 'Arterial pH',
      type: 'number',
      min: 0,
      max: 14,
      step: 0.01
    },
    {
      id: 'bun',
      label: 'Blood urea nitrogen (BUN)',
      type: 'number',
      unit: 'mg/dL',
      min: 0,
      step: 0.1
    },
    {
      id: 'sodium',
      label: 'Serum sodium',
      type: 'number',
      unit: 'mmol/L',
      step: 0.1
    },
    {
      id: 'glucose',
      label: 'Serum glucose',
      type: 'number',
      unit: 'mg/dL',
      min: 0,
      step: 0.1
    },
    {
      id: 'hematocrit',
      label: 'Hematocrit',
      type: 'number',
      unit: '%',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'oxygenSaturation',
      label: 'Oxygen saturation',
      type: 'number',
      unit: '%',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'pleuralEffusion',
      label: 'Pleural effusion on chest radiograph',
      type: 'boolean'
    }
  ],

  calculate(values) {
    const age = Number(values.age)
    const respiratoryRate = Number(values.respiratoryRate)
    const systolicBP = Number(values.systolicBP)
    const temperature = Number(values.temperature)
    const pulse = Number(values.pulse)
    const arterialPh = Number(values.arterialPh)
    const bun = Number(values.bun)
    const sodium = Number(values.sodium)
    const glucose = Number(values.glucose)
    const hematocrit = Number(values.hematocrit)
    const oxygenSaturation = Number(values.oxygenSaturation)

    if (
      !Number.isFinite(age) ||
      !Number.isFinite(respiratoryRate) ||
      !Number.isFinite(systolicBP) ||
      !Number.isFinite(temperature) ||
      !Number.isFinite(pulse) ||
      !Number.isFinite(arterialPh) ||
      !Number.isFinite(bun) ||
      !Number.isFinite(sodium) ||
      !Number.isFinite(glucose) ||
      !Number.isFinite(hematocrit) ||
      !Number.isFinite(oxygenSaturation) ||
      !values.sex
    ) {
      return {
        error: 'Please complete all PSI inputs.'
      }
    }

    const booleanInputs = [
      'nursingHome',
      'neoplasticDisease',
      'liverDisease',
      'congestiveHeartFailure',
      'cerebrovascularDisease',
      'renalDisease',
      'alteredMentalStatus',
      'pleuralEffusion'
    ]

    if (
      booleanInputs.some(
        key => typeof values[key] !== 'boolean'
      )
    ) {
      return {
        error: 'Please complete all PSI clinical history and examination inputs.'
      }
    }

    let score = values.sex === 'male' ? age : age - 10

    if (values.nursingHome) score += 10

    if (values.neoplasticDisease) score += 30
    if (values.liverDisease) score += 20
    if (values.congestiveHeartFailure) score += 10
    if (values.cerebrovascularDisease) score += 10
    if (values.renalDisease) score += 10

    if (values.alteredMentalStatus) score += 20

    if (respiratoryRate >= 30) score += 20
    if (systolicBP < 90) score += 20
    if (temperature < 35 || temperature >= 40) score += 15
    if (pulse >= 125) score += 10

    if (arterialPh < 7.35) score += 30
    if (bun >= 30) score += 20
    if (sodium < 130) score += 20
    if (glucose >= 250) score += 10
    if (hematocrit < 30) score += 10
    if (oxygenSaturation < 90) score += 10
    if (pleuralEffusion) score += 10

    let riskClass
    let mortality

    if (score <= 50) {
      riskClass = 'Class I'
      mortality = 'Very low'
    } else if (score <= 70) {
      riskClass = 'Class II'
      mortality = 'Low'
    } else if (score <= 90) {
      riskClass = 'Class III'
      mortality = 'Low'
    } else if (score <= 130) {
      riskClass = 'Class IV'
      mortality = 'Moderate'
    } else {
      riskClass = 'Class V'
      mortality = 'High'
    }

    return {
      value: score,
      displayValue: String(score),
      unit: 'PSI points',
      category: riskClass,
      interpretation: `${riskClass} — ${mortality} mortality risk.`
    }
  },

  references: [
    'Fine MJ, et al. A prediction rule to identify low-risk patients with community-acquired pneumonia. N Engl J Med. 1997;336:243–250.',
    'Fine MJ, et al. The Pneumonia Severity Index: a validated prediction rule for mortality in patients with community-acquired pneumonia.'
  ]
}

export default psi