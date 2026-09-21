const correctedRetic = {
  id: 'corrected-retic',
  name: 'Corrected Reticulocyte Count & RPI',
  shortName: 'Retic / RPI',
  type: 'calculator',
  categoryId: 'hematology',
  category: 'Hematology',
  description: 'Calculates the corrected reticulocyte percentage and reticulocyte production index for anemia assessment.',
  keywords: ['reticulocyte', 'corrected retic', 'RPI', 'reticulocyte production index', 'anemia'],
  aliases: ['retic index', 'reticulocyte index', 'RPI'],
  inputs: [
    { id: 'retic', label: 'Reticulocyte Count', type: 'number', unit: '%', min: 0, step: 0.1 },
    { id: 'hematocrit', label: 'Patient Hematocrit', type: 'number', unit: '%', min: 1, max: 70, step: 0.1 },
    { id: 'normalHct', label: 'Reference Hematocrit', type: 'number', unit: '%', min: 20, max: 60, step: 0.1, placeholder: '45' }
  ],
  calculate(values) {
    const retic = Number(values.retic)
    const hct = Number(values.hematocrit)
    const normalHct = Number(values.normalHct || 45)

    if (!Number.isFinite(retic) || !Number.isFinite(hct) || !Number.isFinite(normalHct) || retic < 0 || hct <= 0 || normalHct <= 0) {
      return { error: 'Please enter valid reticulocyte and hematocrit values.' }
    }

    const corrected = retic * (hct / normalHct)
    const maturation =
      hct >= 45 ? 1 :
      hct >= 35 ? 1.5 :
      hct >= 25 ? 2 : 2.5

    const rpi = corrected / maturation

    return {
      value: rpi,
      displayValue: rpi.toFixed(2),
      unit: 'RPI',
      category: `Corrected retic ${corrected.toFixed(1)}% • maturation factor ${maturation}`
    }
  },
  references: [
    'MDCalc — Corrected Reticulocyte Percentage / Reticulocyte Production Index.',
    'Clinical hematology convention: corrected reticulocyte percentage = retic % × patient Hct / reference Hct; RPI additionally adjusts for maturation.'
  ]
}

export default correctedRetic
