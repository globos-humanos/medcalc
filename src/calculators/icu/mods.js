const calc = {
  id: 'mods',
  name: 'Multiple Organ Dysfunction Score',
  shortName: 'MODS',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Marshall Multiple Organ Dysfunction Score.',
  type: 'score',

  inputs: [
    {
      id: 'pao2fio2',
      label: 'PaO₂/FiO₂ ratio',
      min: 0,
      max: 800
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
      id: 'bilirubin',
      label: 'Bilirubin',
      unit: 'mg/dL',
      min: 0,
      max: 50,
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
      id: 'hr',
      label: 'Heart rate',
      unit: '/min',
      min: 20,
      max: 300
    },
    {
      id: 'cvp',
      label: 'Central venous pressure',
      unit: 'mmHg',
      min: 0,
      max: 50,
      step: 0.1
    },
    {
      id: 'map',
      label: 'Mean arterial pressure',
      unit: 'mmHg',
      min: 20,
      max: 250
    },
    {
      id: 'gcs',
      label: 'Glasgow Coma Scale',
      min: 3,
      max: 15
    }
  ],

  calculate(v) {
    const pf = Number(v.pao2fio2)
    const cr = Number(v.creatinine)
    const bili = Number(v.bilirubin)
    const platelets = Number(v.platelets)
    const hr = Number(v.hr)
    const cvp = Number(v.cvp)
    const map = Number(v.map)
    const gcs = Number(v.gcs)

    const required = [
      pf, cr, bili, platelets,
      hr, cvp, map, gcs
    ]

    if (required.some(value => !Number.isFinite(value))) {
      return {
        error: 'Please complete all MODS inputs.'
      }
    }

    if (map <= 0) {
      return {
        error: 'Mean arterial pressure must be greater than zero.'
      }
    }

    const par = (hr * cvp) / map

    const respiratory =
      pf > 300 ? 0 :
      pf >= 226 ? 1 :
      pf >= 151 ? 2 :
      pf >= 76 ? 3 : 4

    const renal =
      cr <= 1.2 ? 0 :
      cr <= 2.0 ? 1 :
      cr <= 3.5 ? 2 :
      cr <= 5.7 ? 3 : 4

    const hepatic =
      bili <= 1.2 ? 0 :
      bili <= 3.5 ? 1 :
      bili <= 7.0 ? 2 :
      bili <= 14.0 ? 3 : 4

    const cardiovascular =
      par <= 10 ? 0 :
      par <= 15 ? 1 :
      par <= 20 ? 2 :
      par <= 30 ? 3 : 4

    const hematologic =
      platelets > 120 ? 0 :
      platelets >= 81 ? 1 :
      platelets >= 51 ? 2 :
      platelets >= 21 ? 3 : 4

    const neurologic =
      gcs === 15 ? 0 :
      gcs >= 13 ? 1 :
      gcs >= 10 ? 2 :
      gcs >= 7 ? 3 : 4

    const total =
      respiratory +
      renal +
      hepatic +
      cardiovascular +
      hematologic +
      neurologic

    return {
      value: total,
      displayValue: `${total}/24`,
      unit: 'points',
      category: 'Multiple organ dysfunction',
      interpretation: `MODS ${total}/24.`,
      note: `Pressure-adjusted heart rate (PAR) = ${par.toFixed(1)}. MODS uses six organ-system components scored 0–4 each.`
    }
  },

  references: [
    'Marshall JC, et al. Crit Care Med. 1995;23:1638-1652.'
  ]
}

export default calc
