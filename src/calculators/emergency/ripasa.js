const ripasa = {
  id: 'ripasa',
  name: 'RIPASA Score',
  shortName: 'RIPASA',
  categoryId: 'emergency',
  category: 'Emergency / Trauma',
  description:
    'Raja Isteri Pengiran Anak Saleha Appendicitis score for suspected acute appendicitis.',
  type: 'score',

  inputs: [
    {
      id: 'male',
      label: 'Male sex',
      type: 'boolean'
    },
    {
      id: 'ageUnder40',
      label: 'Age <40 years',
      type: 'boolean'
    },
    {
      id: 'foreignNic',
      label: 'Foreign national registration identity card',
      type: 'boolean'
    },
    {
      id: 'rifPain',
      label: 'Right iliac fossa pain',
      type: 'boolean'
    },
    {
      id: 'migration',
      label: 'Migration of pain to right iliac fossa',
      type: 'boolean'
    },
    {
      id: 'anorexia',
      label: 'Anorexia',
      type: 'boolean'
    },
    {
      id: 'nauseaVomiting',
      label: 'Nausea and vomiting',
      type: 'boolean'
    },
    {
      id: 'symptomsUnder48',
      label: 'Duration of symptoms <48 hours',
      type: 'boolean'
    },
    {
      id: 'rifTenderness',
      label: 'Right iliac fossa tenderness',
      type: 'boolean'
    },
    {
      id: 'guarding',
      label: 'Guarding',
      type: 'boolean'
    },
    {
      id: 'rebound',
      label: 'Rebound tenderness',
      type: 'boolean'
    },
    {
      id: 'rovsing',
      label: 'Rovsing sign',
      type: 'boolean'
    },
    {
      id: 'fever',
      label: 'Fever',
      type: 'boolean'
    },
    {
      id: 'raisedWbc',
      label: 'Raised white blood cell count',
      type: 'boolean'
    },
    {
      id: 'negativeUrinalysis',
      label: 'Negative urinalysis',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const ids = [
      'male',
      'ageUnder40',
      'foreignNic',
      'rifPain',
      'migration',
      'anorexia',
      'nauseaVomiting',
      'symptomsUnder48',
      'rifTenderness',
      'guarding',
      'rebound',
      'rovsing',
      'fever',
      'raisedWbc',
      'negativeUrinalysis'
    ]

    if (ids.some(id => typeof v[id] !== 'boolean')) {
      return {
        error: 'Please complete all RIPASA variables.'
      }
    }

    const score =
      (v.male ? 1 : 0.5) +
      (v.ageUnder40 ? 1 : 0.5) +
      (v.rifPain ? 0.5 : 0) +
      (v.migration ? 0.5 : 0) +
      (v.anorexia ? 1 : 0) +
      (v.nauseaVomiting ? 1 : 0) +
      (v.symptomsUnder48 ? 1 : 0.5) +
      (v.rifTenderness ? 1 : 0) +
      (v.guarding ? 2 : 0) +
      (v.rebound ? 1 : 0) +
      (v.rovsing ? 2 : 0) +
      (v.fever ? 1 : 0) +
      (v.raisedWbc ? 1 : 0) +
      (v.negativeUrinalysis ? 1 : 0) +
      (v.foreignNic ? 1 : 0)

    const roundedScore = Number(score.toFixed(1))

    let category

    if (roundedScore < 5) {
      category = 'Appendicitis unlikely'
    } else if (roundedScore <= 7) {
      category = 'Low probability'
    } else if (roundedScore <= 11.5) {
      category = 'High probability'
    } else {
      category = 'Very high probability'
    }

    return {
      value: roundedScore,
      displayValue: String(roundedScore),
      unit: '/17.5',
      category,
      note:
        'The original RIPASA score includes the foreign-national-registration variable because it was derived in Singapore. That variable may be omitted or handled differently in external validations, so local implementation should be considered.'
    }
  },

  references: [
    'Chong CF, et al. Development of the RIPASA score: a new appendicitis scoring system for the diagnosis of acute appendicitis. Singapore Medical Journal. 2010;51:220–225.',
    'RIPASA score validation studies using a 7.5 cutoff.'
  ]
}

export default ripasa
