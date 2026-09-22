const ankle = {
  id: 'ottawa-ankle',
  name: 'Ottawa Ankle Rules',
  shortName: 'Ottawa Ankle',
  categoryId: 'emergency',
  category: 'Emergency / Trauma',
  description:
    'Clinical decision rule for ankle and midfoot radiography after acute injury.',
  type: 'decision',

  inputs: [
    {
      id: 'malleolarPain',
      label: 'Pain in the malleolar zone',
      type: 'boolean'
    },
    {
      id: 'medialMalleolus',
      label: 'Bone tenderness at posterior edge or tip of medial malleolus',
      type: 'boolean'
    },
    {
      id: 'lateralMalleolus',
      label: 'Bone tenderness at posterior edge or tip of lateral malleolus',
      type: 'boolean'
    },
    {
      id: 'midfootPain',
      label: 'Pain in the midfoot zone',
      type: 'boolean'
    },
    {
      id: 'navicular',
      label: 'Bone tenderness at navicular',
      type: 'boolean'
    },
    {
      id: 'base5',
      label: 'Bone tenderness at base of 5th metatarsal',
      type: 'boolean'
    },
    {
      id: 'weightBearing',
      label: 'Unable to bear weight both immediately after injury and in the ED',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const required = [
      'malleolarPain',
      'medialMalleolus',
      'lateralMalleolus',
      'midfootPain',
      'navicular',
      'base5',
      'weightBearing'
    ]

    if (required.some(id => typeof v[id] !== 'boolean')) {
      return {
        error: 'Please answer all Ottawa Ankle Rule criteria.'
      }
    }

    const anklePositive =
      v.malleolarPain &&
      (v.medialMalleolus ||
        v.lateralMalleolus ||
        v.weightBearing)

    const footPositive =
      v.midfootPain &&
      (v.navicular ||
        v.base5 ||
        v.weightBearing)

    if (anklePositive && footPositive) {
      return {
        value: 'Ankle + foot radiography',
        displayValue: 'Image ankle + foot',
        unit: 'Ottawa Ankle Rules',
        category: 'Radiography indicated',
        note:
          'Criteria are positive for both the malleolar and midfoot pathways.'
      }
    }

    if (anklePositive) {
      return {
        value: 'Ankle radiography',
        displayValue: 'Image ankle',
        unit: 'Ottawa Ankle Rules',
        category: 'Ankle radiography indicated',
        note:
          'The malleolar-zone pathway is positive.'
      }
    }

    if (footPositive) {
      return {
        value: 'Foot radiography',
        displayValue: 'Image foot',
        unit: 'Ottawa Ankle Rules',
        category: 'Foot radiography indicated',
        note:
          'The midfoot pathway is positive.'
      }
    }

    return {
      value: 'No radiography by rule',
      displayValue: 'No radiography',
      unit: 'Ottawa Ankle Rules',
      category: 'Rule negative',
      note:
        'Neither the malleolar nor midfoot radiography pathway is positive.'
    }
  },

  references: [
    'Stiell IG, et al. A study to develop clinical decision rules for the use of radiography in acute ankle injuries. Annals of Emergency Medicine. 1992;21:384–390.',
    'Stiell IG, et al. Implementation of the Ottawa ankle rules. JAMA. 1994;271:827–832.',
    'Bachmann LM, et al. A systematic review of the Ottawa ankle rules. BMJ. 2003;326:417.'
  ]
}

export default ankle
