const calc = {
  id: 'saps-ii',
  name: 'SAPS II',
  shortName: 'SAPS II',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Simplified Acute Physiology Score II.',
  type: 'score',

  inputs: [
    { id: 'age', label: 'Age', unit: 'years', min: 18, max: 120 },
    { id: 'hr', label: 'Heart rate', unit: '/min', min: 20, max: 300 },
    { id: 'sbp', label: 'Systolic blood pressure', unit: 'mmHg', min: 20, max: 300 },
    { id: 'temp', label: 'Temperature', unit: '°C', min: 25, max: 45, step: 0.1 },
    { id: 'vent', label: 'Mechanical ventilation / CPAP within 24 h?', type: 'boolean' },
    { id: 'pf', label: 'PaO₂/FiO₂ ratio', min: 0, max: 800 },
    { id: 'urine', label: 'Urine output', unit: 'mL/day', min: 0, max: 10000 },
    { id: 'bun', label: 'BUN', unit: 'mg/dL', min: 0, max: 300 },
    { id: 'wbc', label: 'WBC', unit: '×10⁹/L', min: 0, max: 100 },
    { id: 'k', label: 'Potassium', unit: 'mmol/L', min: 0, max: 15, step: 0.1 },
    { id: 'na', label: 'Sodium', unit: 'mmol/L', min: 50, max: 220 },
    { id: 'hco3', label: 'Bicarbonate', unit: 'mmol/L', min: 0, max: 60, step: 0.1 },
    { id: 'bilirubin', label: 'Bilirubin', unit: 'mg/dL', min: 0, max: 50, step: 0.1 },
    { id: 'gcs', label: 'GCS', min: 3, max: 15 },

    {
      id: 'chronic',
      label: 'Chronic disease',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 9, label: 'Metastatic cancer' },
        { value: 10, label: 'Hematologic malignancy' },
        { value: 17, label: 'AIDS' }
      ],
      optionsLayout: 'stack'
    },

    {
      id: 'admission',
      label: 'Type of admission',
      type: 'choice',
      options: [
        { value: 0, label: 'Scheduled surgical' },
        { value: 6, label: 'Medical' },
        { value: 8, label: 'Unscheduled surgical' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const age = Number(v.age)
    const hr = Number(v.hr)
    const sbp = Number(v.sbp)
    const temp = Number(v.temp)
    const pf = Number(v.pf)
    const urine = Number(v.urine)
    const bun = Number(v.bun)
    const wbc = Number(v.wbc)
    const k = Number(v.k)
    const na = Number(v.na)
    const hco3 = Number(v.hco3)
    const bilirubin = Number(v.bilirubin)
    const gcs = Number(v.gcs)

    const required = [
      age, hr, sbp, temp, urine,
      bun, wbc, k, na, hco3,
      bilirubin, gcs
    ]

    if (
      required.some(value => !Number.isFinite(value)) ||
      v.chronic === undefined ||
      v.admission === undefined
    ) {
      return {
        error: 'Please complete all SAPS II inputs.'
      }
    }

    if (v.vent && !Number.isFinite(pf)) {
      return {
        error: 'Please enter the PaO₂/FiO₂ ratio when mechanical ventilation or CPAP is present.'
      }
    }

    const agePts =
      age < 40 ? 0 :
      age < 60 ? 7 :
      age < 70 ? 12 :
      age < 75 ? 15 :
      age < 80 ? 16 : 18

    const hrPts =
      hr < 40 ? 11 :
      hr < 70 ? 2 :
      hr < 120 ? 0 :
      hr < 160 ? 4 : 7

    const sbpPts =
      sbp < 70 ? 13 :
      sbp < 100 ? 5 :
      sbp < 200 ? 0 : 2

    const tempPts = temp >= 39 ? 3 : 0

    const pfPts = !v.vent
      ? 0
      : pf < 100
        ? 11
        : pf < 200
          ? 9
          : 6

    const urinePts =
      urine < 500 ? 11 :
      urine < 1000 ? 4 : 0

    const bunPts =
      bun < 28 ? 0 :
      bun < 84 ? 6 : 10

    const wbcPts =
      wbc < 1 ? 12 :
      wbc < 20 ? 0 : 3

    const kPts =
      k < 3 ? 3 :
      k < 5 ? 0 : 3

    const naPts =
      na < 125 ? 5 :
      na < 145 ? 0 : 1

    const hco3Pts =
      hco3 < 15 ? 6 :
      hco3 < 20 ? 3 : 0

    const bilirubinPts =
      bilirubin < 4 ? 0 :
      bilirubin < 6 ? 4 : 9

    const gcsPts =
      gcs >= 14 ? 0 :
      gcs >= 11 ? 5 :
      gcs >= 9 ? 7 :
      gcs >= 6 ? 13 : 26

    const total =
      agePts +
      hrPts +
      sbpPts +
      tempPts +
      pfPts +
      urinePts +
      bunPts +
      wbcPts +
      kPts +
      naPts +
      hco3Pts +
      bilirubinPts +
      gcsPts +
      Number(v.chronic) +
      Number(v.admission)

    const logit =
      -7.7631 +
      (0.0737 * total) +
      (0.9971 * Math.log(total + 1))

    const mortality =
      100 * Math.exp(logit) / (1 + Math.exp(logit))

    return {
      value: total,
      displayValue: `${total}/163`,
      unit: 'points',
      category: 'SAPS II severity score',
      interpretation: `Original SAPS II model estimate of hospital mortality: ${mortality.toFixed(1)}%.`,
      note: 'SAPS II uses the worst values during the first 24 hours of ICU admission. The mortality estimate is a population-derived model estimate and should not be interpreted as an individual patient prediction.'
    }
  },

  references: [
    'Le Gall JR, Lemeshow S, Saulnier F. JAMA. 1993;270:2957-2963.'
  ]
}

export default calc
