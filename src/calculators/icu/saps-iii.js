const calc = {
  id: 'sapsIII',
  name: 'SAPS III',
  shortName: 'SAPS III',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Simplified Acute Physiology Score III for hospital mortality estimation at ICU admission.',
  type: 'score',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      unit: 'years',
      min: 18,
      max: 120
    },
    {
      id: 'preIcuDays',
      label: 'Hospital stay before ICU admission',
      unit: 'days',
      min: 0,
      max: 365
    },
    {
      id: 'location',
      label: 'Location immediately before ICU admission',
      type: 'choice',
      options: [
        { value: 'operating', label: 'Operating room' },
        { value: 'emergency', label: 'Emergency department' },
        { value: 'otherIcu', label: 'Other ICU' },
        { value: 'other', label: 'Other location' }
      ],
      optionsLayout: 'stack'
    },

    {
      id: 'cancerTherapy',
      label: 'Active cancer therapy?',
      type: 'boolean'
    },
    {
      id: 'metastaticCancer',
      label: 'Metastatic cancer?',
      type: 'boolean'
    },
    {
      id: 'hematologicCancer',
      label: 'Hematologic malignancy?',
      type: 'boolean'
    },
    {
      id: 'chfNyha4',
      label: 'Chronic heart failure, NYHA IV?',
      type: 'boolean'
    },
    {
      id: 'cirrhosis',
      label: 'Cirrhosis?',
      type: 'boolean'
    },
    {
      id: 'aids',
      label: 'AIDS?',
      type: 'boolean'
    },
    {
      id: 'vasoactiveBeforeIcu',
      label: 'Vasoactive drugs before ICU admission?',
      type: 'boolean'
    },

    {
      id: 'unplanned',
      label: 'Unplanned ICU admission?',
      type: 'boolean'
    },

    {
      id: 'rhythm',
      label: 'Reason: rhythm disturbance?',
      type: 'boolean'
    },
    {
      id: 'hypovolemicShock',
      label: 'Reason: hypovolemic shock?',
      type: 'boolean'
    },
    {
      id: 'septicShock',
      label: 'Reason: septic shock?',
      type: 'boolean'
    },
    {
      id: 'anaphylacticShock',
      label: 'Reason: anaphylactic / mixed shock?',
      type: 'boolean'
    },
    {
      id: 'liverFailure',
      label: 'Reason: liver failure?',
      type: 'boolean'
    },
    {
      id: 'severePancreatitis',
      label: 'Reason: severe pancreatitis?',
      type: 'boolean'
    },
    {
      id: 'acuteAbdomen',
      label: 'Reason: acute abdomen?',
      type: 'boolean'
    },
    {
      id: 'massEffect',
      label: 'Reason: intracranial mass effect?',
      type: 'boolean'
    },
    {
      id: 'focalNeurologic',
      label: 'Reason: focal neurological deficit?',
      type: 'boolean'
    },
    {
      id: 'seizures',
      label: 'Reason: seizures?',
      type: 'boolean'
    },
    {
      id: 'coma',
      label: 'Reason: coma / stupor / agitation?',
      type: 'boolean'
    },

    {
      id: 'surgicalStatus',
      label: 'Surgical status',
      type: 'choice',
      options: [
        { value: 'scheduled', label: 'Scheduled surgery' },
        { value: 'emergency', label: 'Emergency surgery' },
        { value: 'none', label: 'No surgery' }
      ],
      optionsLayout: 'stack'
    },

    {
      id: 'surgerySite',
      label: 'Surgery site / context',
      type: 'choice',
      options: [
        { value: 'transplant', label: 'Transplantation' },
        { value: 'traumaIsolated', label: 'Isolated trauma' },
        { value: 'traumaMultiple', label: 'Multiple trauma' },
        { value: 'cabg', label: 'CABG without valve surgery' },
        { value: 'neurosurgery', label: 'Neurosurgery / cerebrovascular surgery' },
        { value: 'other', label: 'Other / not applicable' }
      ],
      optionsLayout: 'stack'
    },

    {
      id: 'nosocomialInfection',
      label: 'Nosocomial infection?',
      type: 'boolean'
    },
    {
      id: 'respiratoryInfection',
      label: 'Respiratory infection?',
      type: 'boolean'
    },

    {
      id: 'gcs',
      label: 'GCS',
      min: 3,
      max: 15
    },
    {
      id: 'bilirubin',
      label: 'Bilirubin',
      unit: 'mg/dL',
      min: 0,
      max: 50,
      step: 0.1
    },
    {
      id: 'temperature',
      label: 'Temperature',
      unit: '°C',
      min: 25,
      max: 45,
      step: 0.1
    },
    {
      id: 'creatinine',
      label: 'Creatinine',
      unit: 'mg/dL',
      min: 0,
      max: 20,
      step: 0.1
    },
    {
      id: 'heartRate',
      label: 'Heart rate',
      unit: '/min',
      min: 20,
      max: 300
    },
    {
      id: 'wbc',
      label: 'Leukocytes',
      unit: '×10⁹/L',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'platelets',
      label: 'Platelets',
      unit: '×10⁹/L',
      min: 0,
      max: 1000
    },
    {
      id: 'ph',
      label: 'Arterial pH',
      min: 6.5,
      max: 8,
      step: 0.01
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      unit: 'mmHg',
      min: 20,
      max: 300
    },
    {
      id: 'mechanicalVent',
      label: 'Mechanical ventilation?',
      type: 'boolean'
    },
    {
      id: 'pao2',
      label: 'PaO₂',
      unit: 'mmHg',
      min: 20,
      max: 800
    },
    {
      id: 'fio2',
      label: 'FiO₂',
      unit: '%',
      min: 21,
      max: 100
    }
  ],

  calculate(v) {
    const n = id => Number(v[id])

    const required = [
      'age',
      'preIcuDays',
      'gcs',
      'bilirubin',
      'temperature',
      'creatinine',
      'heartRate',
      'wbc',
      'platelets',
      'ph',
      'sbp',
      'pao2',
      'fio2'
    ]

    if (
      required.some(id => !Number.isFinite(n(id))) ||
      v.location === undefined ||
      v.surgicalStatus === undefined ||
      v.surgerySite === undefined
    ) {
      return {
        error: 'Please complete all SAPS III admission variables.'
      }
    }

    const age = n('age')
    const los = n('preIcuDays')
    const gcs = n('gcs')
    const bili = n('bilirubin')
    const temp = n('temperature')
    const cr = n('creatinine')
    const hr = n('heartRate')
    const wbc = n('wbc')
    const platelets = n('platelets')
    const ph = n('ph')
    const sbp = n('sbp')
    const pf = n('pao2') / (n('fio2') / 100)

    let score = 16

    // BOX I — patient characteristics
    score +=
      age < 40 ? 0 :
      age < 60 ? 5 :
      age < 70 ? 9 :
      age < 75 ? 13 :
      age < 80 ? 15 : 18

    score +=
      los < 14 ? 0 :
      los < 28 ? 6 : 7

    score +=
      v.location === 'operating' ? 0 :
      v.location === 'emergency' ? 5 :
      v.location === 'otherIcu' ? 7 : 8

    if (v.cancerTherapy) score += 3
    if (v.hematologicCancer) score += 6
    if (v.metastaticCancer) score += 11
    if (v.chfNyha4) score += 6
    if (v.cirrhosis) score += 8
    if (v.aids) score += 8
    if (v.vasoactiveBeforeIcu) score += 3

    // BOX II — circumstances of ICU admission
    if (v.unplanned) score += 3

    if (v.rhythm) score -= 5

    if (v.seizures) {
      score += -4

      // When both rhythm disturbance and seizures are present,
      // the original scoring sheet uses the seizure value rather
      // than adding the rhythm score separately.
      if (v.rhythm) score += 5
    }

    if (v.hypovolemicShock) score += 3
    if (v.septicShock) score += 5
    if (v.anaphylacticShock) score += 5
    if (v.liverFailure) score += 6
    if (v.severePancreatitis) score += 9
    if (v.acuteAbdomen) score += 3
    if (v.massEffect) score += 10
    if (v.focalNeurologic) score += 7
    if (v.coma) score += 4

    score +=
      v.surgicalStatus === 'scheduled' ? 0 :
      v.surgicalStatus === 'emergency' ? 6 : 5

    score +=
      v.surgerySite === 'transplant' ? -11 :
      v.surgerySite === 'traumaIsolated' ? -8 :
      v.surgerySite === 'traumaMultiple' ? -8 :
      v.surgerySite === 'cabg' ? -6 :
      v.surgerySite === 'neurosurgery' ? 5 : 0

    if (v.nosocomialInfection) score += 4
    if (v.respiratoryInfection) score += 5

    // BOX III — physiology at ICU admission
    score +=
      gcs <= 4 ? 15 :
      gcs === 5 ? 10 :
      gcs === 6 ? 7 :
      gcs <= 12 ? 2 : 0

    score +=
      bili < 2 ? 0 :
      bili < 6 ? 4 : 5

    score += temp < 35 ? 7 : 0

    score +=
      cr < 1.2 ? 0 :
      cr < 2 ? 2 :
      cr < 3.5 ? 7 : 8

    score +=
      hr < 120 ? 0 :
      hr < 160 ? 5 : 7

    score += wbc >= 15 ? 2 : 0

    score += ph <= 7.25 ? 3 : 0

    score +=
      platelets < 20 ? 13 :
      platelets < 50 ? 8 :
      platelets < 100 ? 5 : 0

    score +=
      sbp < 40 ? 11 :
      sbp < 70 ? 8 :
      sbp < 120 ? 3 : 0

    if (v.mechanicalVent) {
      score += pf < 100 ? 11 : 7
    } else if (n('pao2') < 60) {
      score += 5
    }

    const logit =
      -32.6659 +
      Math.log(score + 20.5958) * 7.3068

    const probability =
      100 * Math.exp(logit) / (1 + Math.exp(logit))

    return {
      value: score,
      displayValue: `${score}/217`,
      unit: 'points',
      category: 'SAPS III admission score',
      interpretation: `Estimated hospital mortality: ${probability.toFixed(1)}%.`,
      note: 'SAPS III is an ICU-admission severity model. The original model uses data recorded around ICU admission and provides a population-derived mortality estimate, not an individual clinical prediction.'
    }
  },

  references: [
    'Moreno RP, et al. Intensive Care Med. 2005;31:1345–1355.'
  ]
}

export default calc
