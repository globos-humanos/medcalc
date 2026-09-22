const calc = {
  id: 'lods',
  name: 'Logistic Organ Dysfunction System',
  shortName: 'LODS',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Six-organ-system assessment of acute organ dysfunction.',
  type: 'score',

  inputs: [
    {
      id: 'gcs',
      label: 'Glasgow Coma Scale',
      min: 3,
      max: 15
    },
    {
      id: 'hr',
      label: 'Heart rate',
      unit: '/min',
      min: 20,
      max: 300
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      unit: 'mmHg',
      min: 0,
      max: 350
    },
    {
      id: 'urea',
      label: 'Serum urea',
      unit: 'mmol/L',
      min: 0,
      max: 100,
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
      id: 'urine',
      label: 'Urine output',
      unit: 'L/day',
      min: 0,
      max: 20,
      step: 0.01
    },
    {
      id: 'ventilated',
      label: 'Mechanical ventilation / CPAP / IPAP?',
      type: 'boolean'
    },
    {
      id: 'pao2fio2',
      label: 'PaO₂/FiO₂ ratio',
      min: 0,
      max: 800
    },
    {
      id: 'wbc',
      label: 'White blood cell count',
      unit: '×10⁹/L',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'platelets',
      label: 'Platelet count',
      unit: '×10⁹/L',
      min: 0,
      max: 1000
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
      id: 'prothrombin',
      label: 'Prothrombin activity',
      type: 'choice',
      options: [
        { value: 0, label: '≥25% of standard / ≤3 sec above control' },
        { value: 1, label: '<25% of standard / >3 sec above control' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const gcs = Number(v.gcs)
    const hr = Number(v.hr)
    const sbp = Number(v.sbp)
    const urea = Number(v.urea)
    const creatinine = Number(v.creatinine)
    const urine = Number(v.urine)
    const pf = Number(v.pao2fio2)
    const wbc = Number(v.wbc)
    const platelets = Number(v.platelets)
    const bilirubin = Number(v.bilirubin)

    const required = [
      gcs, hr, sbp, urea, creatinine,
      urine, wbc, platelets, bilirubin
    ]

    if (
      required.some(value => !Number.isFinite(value)) ||
      v.ventilated === undefined ||
      v.prothrombin === undefined
    ) {
      return {
        error: 'Please complete all LODS inputs.'
      }
    }

    if (v.ventilated && !Number.isFinite(pf)) {
      return {
        error: 'Please enter the PaO₂/FiO₂ ratio when respiratory support is present.'
      }
    }

    const neurologic =
      gcs >= 14 ? 0 :
      gcs >= 9 ? 1 :
      gcs >= 6 ? 3 : 5

    const cardiovascularHR =
      hr < 30 ? 5 :
      hr <= 39 ? 3 :
      hr <= 69 ? 1 :
      hr <= 139 ? 0 :
      hr <= 239 ? 1 :
      hr <= 269 ? 3 :
      5

    const cardiovascularSBP =
      sbp >= 90 && sbp <= 239 ? 0 :
      sbp >= 70 && sbp <= 89 ? 1 :
      sbp >= 40 && sbp <= 69 ? 3 :
      sbp >= 270 ? 5 :
      sbp < 40 ? 5 : 3

    const cardiovascular = Math.max(
      cardiovascularHR,
      cardiovascularSBP
    )

    const renalUrea =
      urea < 6 ? 0 :
      urea < 10 ? 1 :
      urea < 20 ? 3 : 5

    const renalCreatinine =
      creatinine < 1.2 ? 0 :
      creatinine < 1.6 ? 1 : 3

    const renalUrine =
      urine >= 0.75 && urine < 10 ? 0 :
      urine >= 0.5 && urine < 0.75 ? 3 :
      urine >= 10 ? 3 : 5

    const renal = Math.max(
      renalUrea,
      renalCreatinine,
      renalUrine
    )

    const pulmonary = !v.ventilated
      ? 0
      : pf >= 150
        ? 1
        : 3

    const hematologicWbc =
      wbc >= 2.5 && wbc < 50 ? 0 :
      wbc >= 1 && wbc < 2.5 ? 1 :
      wbc >= 50 ? 1 : 3

    const hematologicPlatelets =
      platelets >= 50 ? 0 : 1

    const hematologic = Math.max(
      hematologicWbc,
      hematologicPlatelets
    )

    const hepaticBilirubin =
      bilirubin < 2 ? 0 : 1

    const hepaticProthrombin =
      Number(v.prothrombin)

    const hepatic = Math.max(
      hepaticBilirubin,
      hepaticProthrombin
    )

    const total =
      neurologic +
      cardiovascular +
      renal +
      pulmonary +
      hematologic +
      hepatic

    const mortalityLogit = -3.4043 + (0.4173 * total)
    const mortality =
      100 / (1 + Math.exp(-mortalityLogit))

    return {
      value: total,
      displayValue: `${total}/22`,
      unit: 'points',
      category: 'Organ dysfunction burden',
      interpretation: `LODS ${total}/22. Estimated hospital mortality by the original LODS model: ${mortality.toFixed(1)}%.`,
      note: 'LODS uses the worst value in each of six organ systems during the first ICU day. The mortality estimate is a model estimate and should not be treated as an individual prediction.'
    }
  }
}

export default calc

