const calc = {
  id: 'pediatric-sofa',
  name: 'Pediatric SOFA (pSOFA)',
  shortName: 'pSOFA',
  categoryId: 'pediatrics',
  description: 'Age-adjusted Pediatric Sequential Organ Failure Assessment score.',

  inputs: [
    {
      id: 'ageMonths',
      label: 'Age',
      type: 'number',
      unit: 'months',
      min: 0,
      max: 240,
      step: 1
    },
    {
      id: 'respiratoryMode',
      label: 'Respiratory measurement',
      type: 'choice',
      options: [
        {
          value: 'pao2fio2',
          label: 'PaO₂ / FiO₂'
        },
        {
          value: 'spo2fio2',
          label: 'SpO₂ / FiO₂'
        }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'respiratoryRatio',
      label: 'Respiratory ratio',
      type: 'number',
      min: 1,
      step: 1
    },
    {
      id: 'respSupport',
      label: 'Respiratory support present',
      type: 'boolean'
    },
    {
      id: 'platelets',
      label: 'Platelets',
      type: 'number',
      unit: '×10³/µL',
      min: 0,
      step: 1
    },
    {
      id: 'bilirubin',
      label: 'Total bilirubin',
      type: 'number',
      unit: 'mg/dL',
      min: 0,
      step: 0.1
    },
    {
      id: 'map',
      label: 'Mean arterial pressure',
      type: 'number',
      unit: 'mmHg',
      min: 0,
      step: 1
    },
    {
      id: 'vasoactiveScore',
      label: 'Vasoactive support',
      type: 'choice',
      options: [
        {
          value: 0,
          label: 'None'
        },
        {
          value: 2,
          label: 'Dopamine ≤5 or dobutamine any dose'
        },
        {
          value: 3,
          label: 'Dopamine >5 or epinephrine/norepinephrine ≤0.1'
        },
        {
          value: 4,
          label: 'Dopamine >15 or epinephrine/norepinephrine >0.1'
        }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'gcs',
      label: 'Glasgow Coma Scale',
      type: 'number',
      min: 3,
      max: 15,
      step: 1
    },
    {
      id: 'creatinine',
      label: 'Serum creatinine',
      type: 'number',
      unit: 'mg/dL',
      min: 0,
      step: 0.01
    }
  ],

  calculate(v) {
    const age = Number(v.ageMonths)
    const ratio = Number(v.respiratoryRatio)
    const platelets = Number(v.platelets)
    const bilirubin = Number(v.bilirubin)
    const map = Number(v.map)
    const gcs = Number(v.gcs)
    const creatinine = Number(v.creatinine)
    const vasoactive = Number(v.vasoactiveScore)

    if (
      !Number.isFinite(age) ||
      !Number.isFinite(ratio) ||
      !Number.isFinite(platelets) ||
      !Number.isFinite(bilirubin) ||
      !Number.isFinite(map) ||
      !Number.isFinite(gcs) ||
      !Number.isFinite(creatinine) ||
      !Number.isFinite(vasoactive)
    ) {
      return {
        error: 'Please complete all pSOFA inputs.'
      }
    }

    let respiratory = 0

    if (v.respiratoryMode === 'pao2fio2') {
      if (ratio >= 400) respiratory = 0
      else if (ratio >= 300) respiratory = 1
      else if (ratio >= 200) respiratory = 2
      else if (ratio >= 100 && v.respSupport === true) respiratory = 3
      else if (ratio < 100 && v.respSupport === true) respiratory = 4
      else respiratory = 2
    } else {
      if (ratio >= 292) respiratory = 0
      else if (ratio >= 264) respiratory = 1
      else if (ratio >= 221) respiratory = 2
      else if (ratio >= 148 && v.respSupport === true) respiratory = 3
      else if (ratio < 148 && v.respSupport === true) respiratory = 4
      else respiratory = 2
    }

    let coagulation = 0

    if (platelets >= 150) coagulation = 0
    else if (platelets >= 100) coagulation = 1
    else if (platelets >= 50) coagulation = 2
    else if (platelets >= 20) coagulation = 3
    else coagulation = 4

    let hepatic = 0

    if (bilirubin < 1.2) hepatic = 0
    else if (bilirubin < 2) hepatic = 1
    else if (bilirubin < 6) hepatic = 2
    else if (bilirubin < 12) hepatic = 3
    else hepatic = 4

    let ageMap = 70

    if (age < 1) ageMap = 46
    else if (age < 12) ageMap = 55
    else if (age < 24) ageMap = 60
    else if (age < 60) ageMap = 62
    else if (age < 144) ageMap = 65
    else if (age <= 216) ageMap = 67

    let cardiovascular =
      map >= ageMap
        ? 0
        : 1

    cardiovascular =
      Math.max(
        cardiovascular,
        vasoactive
      )

    let neurologic = 0

    if (gcs === 15) neurologic = 0
    else if (gcs >= 13) neurologic = 1
    else if (gcs >= 10) neurologic = 2
    else if (gcs >= 6) neurologic = 3
    else neurologic = 4

    let renal = 0

    if (age < 1) {
      if (creatinine < 0.8) renal = 0
      else if (creatinine < 1.0) renal = 1
      else if (creatinine < 1.2) renal = 2
      else if (creatinine < 1.6) renal = 3
      else renal = 4
    } else if (age < 12) {
      if (creatinine < 0.3) renal = 0
      else if (creatinine < 0.5) renal = 1
      else if (creatinine < 0.8) renal = 2
      else if (creatinine < 1.2) renal = 3
      else renal = 4
    } else if (age < 24) {
      if (creatinine < 0.4) renal = 0
      else if (creatinine < 0.6) renal = 1
      else if (creatinine < 1.1) renal = 2
      else if (creatinine < 1.5) renal = 3
      else renal = 4
    } else if (age < 60) {
      if (creatinine < 0.6) renal = 0
      else if (creatinine < 0.9) renal = 1
      else if (creatinine < 1.6) renal = 2
      else if (creatinine < 2.3) renal = 3
      else renal = 4
    } else if (age < 144) {
      if (creatinine < 0.7) renal = 0
      else if (creatinine < 1.1) renal = 1
      else if (creatinine < 1.8) renal = 2
      else if (creatinine < 2.6) renal = 3
      else renal = 4
    } else if (age <= 216) {
      if (creatinine < 1.0) renal = 0
      else if (creatinine < 1.7) renal = 1
      else if (creatinine < 2.9) renal = 2
      else if (creatinine < 4.2) renal = 3
      else renal = 4
    } else {
      if (creatinine < 1.2) renal = 0
      else if (creatinine < 2.0) renal = 1
      else if (creatinine < 3.5) renal = 2
      else if (creatinine < 5.0) renal = 3
      else renal = 4
    }

    const total =
      respiratory +
      coagulation +
      hepatic +
      cardiovascular +
      neurologic +
      renal

    return {
      value: total,
      unit: '/24',
      interpretation:
        total === 0
          ? 'No organ dysfunction points'
          : total < 2
            ? 'Low pSOFA score'
            : 'Organ dysfunction present',
      note: 'pSOFA is the sum of six organ-system subscores, each 0–4. Use the worst relevant values over the assessment period according to the intended application.'
    }
  },

  references: [
    'Matics TJ, Sanchez-Pinto LN. Adaptation and Validation of a Pediatric Sequential Organ Failure Assessment Score. JAMA Pediatrics. 2017.'
  ]
}

export default calc