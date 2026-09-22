const calc = {
  id: 'hacor',
  name: 'HACOR Score',
  shortName: 'HACOR',
  categoryId: 'respiratory',
  description: 'Predicts non-invasive ventilation failure using heart rate, acidosis, consciousness, oxygenation and respiratory rate.',
  type: 'score',
  inputs: [
    { id: 'hr', label: 'Heart rate', type: 'number', unit: '/min', min: 20, max: 250, step: 1 },
    { id: 'ph', label: 'Arterial pH', type: 'number', unit: '', min: 6.5, max: 8, step: 0.01 },
    { id: 'gcs', label: 'Glasgow Coma Scale', type: 'number', unit: '/15', min: 3, max: 15, step: 1 },
    { id: 'pf', label: 'PaO2/FiO2 ratio', type: 'number', unit: 'mmHg', min: 20, max: 800, step: 1 },
    { id: 'rr', label: 'Respiratory rate', type: 'number', unit: '/min', min: 0, max: 100, step: 1 }
  ],
  calculate(v) {
    const hr = Number(v.hr)
    const ph = Number(v.ph)
    const gcs = Number(v.gcs)
    const pf = Number(v.pf)
    const rr = Number(v.rr)

    const hrScore = hr <= 120 ? 0 : 1

    const phScore =
      ph >= 7.35 ? 0 :
      ph >= 7.30 ? 2 :
      ph >= 7.25 ? 3 : 4

    const gcsScore =
      gcs === 15 ? 0 :
      gcs >= 13 ? 2 :
      gcs >= 11 ? 5 : 10

    const pfScore =
      pf >= 201 ? 0 :
      pf >= 176 ? 2 :
      pf >= 151 ? 3 :
      pf >= 126 ? 4 :
      pf >= 101 ? 5 : 6

    const rrScore =
      rr <= 30 ? 0 :
      rr <= 35 ? 1 :
      rr <= 40 ? 2 :
      rr <= 45 ? 3 : 4

    const score = hrScore + phScore + gcsScore + pfScore + rrScore

    return {
      value: score,
      unit: 'points',
      interpretation:
        score <= 5
          ? 'HACOR is at or below the original >5 high-risk threshold.'
          : 'HACOR is above 5; the original validation study found increased NIV failure risk above this threshold.',
      note: 'Timing matters: HACOR is commonly assessed after NIV initiation, particularly around 1 hour.'
    }
  }
}

export default calc
