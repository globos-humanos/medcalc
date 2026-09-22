const lrinec = {
  id: 'lrinec',
  name: 'LRINEC Score',
  shortName: 'LRINEC',
  categoryId: 'emergency',
  category: 'Emergency / Trauma',
  description:
    'Laboratory Risk Indicator for Necrotizing Fasciitis score using six laboratory variables.',
  type: 'score',

  inputs: [
    {
      id: 'crp',
      label: 'C-reactive protein',
      unit: 'mg/L',
      min: 0,
      max: 1000,
      step: 1
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
      id: 'hb',
      label: 'Hemoglobin',
      unit: 'g/dL',
      min: 0,
      max: 25,
      step: 0.1
    },
    {
      id: 'na',
      label: 'Sodium',
      unit: 'mmol/L',
      min: 80,
      max: 180,
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
      id: 'glucose',
      label: 'Glucose',
      unit: 'mg/dL',
      min: 20,
      max: 1000,
      step: 1
    }
  ],

  calculate(v) {
    const crp = Number(v.crp)
    const wbc = Number(v.wbc)
    const hb = Number(v.hb)
    const na = Number(v.na)
    const creatinine = Number(v.creatinine)
    const glucose = Number(v.glucose)

    if (
      !Number.isFinite(crp) ||
      !Number.isFinite(wbc) ||
      !Number.isFinite(hb) ||
      !Number.isFinite(na) ||
      !Number.isFinite(creatinine) ||
      !Number.isFinite(glucose)
    ) {
      return {
        error: 'Please complete all LRINEC laboratory variables.'
      }
    }

    const score =
      (crp >= 150 ? 4 : 0) +
      (wbc > 25 ? 2 : wbc >= 15 ? 1 : 0) +
      (hb < 11 ? 2 : hb <= 13.5 ? 1 : 0) +
      (na < 135 ? 2 : 0) +
      (creatinine >= 1.6 ? 2 : 0) +
      (glucose > 180 ? 1 : 0)

    return {
      value: score,
      displayValue: String(score),
      unit: '/13',
      category:
        score < 6
          ? 'Low-risk range'
          : score < 8
            ? 'Intermediate-risk range'
            : 'High-risk range',
      note:
        'LRINEC is an adjunctive risk-stratification tool. A low score does not safely exclude necrotizing soft-tissue infection; clinical assessment remains essential.'
    }
  },

  references: [
    'Wong CH, et al. The LRINEC (Laboratory Risk Indicator for Necrotizing Fasciitis) score. Critical Care Medicine. 2004;32:1535–1541.',
    'LRINEC uses CRP, WBC, hemoglobin, sodium, creatinine and glucose.'
  ]
}

export default lrinec
