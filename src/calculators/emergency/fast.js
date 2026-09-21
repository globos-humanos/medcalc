const calc = {
  id: 'fast',
  name: 'FAST / eFAST Assessment',
  shortName: 'FAST / eFAST',
  categoryId: 'emergency',
  description: 'Focused assessment with sonography for trauma, including extended thoracic assessment.',

  inputs: [
    {
      id: 'pericardial',
      label: 'Pericardial fluid',
      type: 'boolean'
    },
    {
      id: 'ruq',
      label: 'Free fluid in right upper quadrant',
      type: 'boolean'
    },
    {
      id: 'luq',
      label: 'Free fluid in left upper quadrant',
      type: 'boolean'
    },
    {
      id: 'pelvis',
      label: 'Free fluid in pelvis',
      type: 'boolean'
    },
    {
      id: 'rightChest',
      label: 'Right thoracic abnormality / pneumothorax',
      type: 'boolean'
    },
    {
      id: 'leftChest',
      label: 'Left thoracic abnormality / pneumothorax',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const abdominalOrPericardial =
      v.pericardial === true ||
      v.ruq === true ||
      v.luq === true ||
      v.pelvis === true

    const thoracic =
      v.rightChest === true ||
      v.leftChest === true

    if (abdominalOrPericardial || thoracic) {
      return {
        value: 'Abnormal',
        unit: 'FAST / eFAST',
        interpretation:
          abdominalOrPericardial && thoracic
            ? 'Positive findings in abdominal/pericardial and thoracic views'
            : abdominalOrPericardial
              ? 'Positive FAST finding'
              : 'Positive eFAST thoracic finding',
        note: 'This is a structured assessment aid, not a substitute for real-time ultrasound examination or clinical judgment.'
      }
    }

    return {
      value: 'No positive finding selected',
      unit: 'FAST / eFAST',
      interpretation: 'No positive finding entered',
      note: 'A negative FAST/eFAST assessment does not independently exclude injury.'
    }
  },

  references: [
    'Focused Assessment with Sonography in Trauma (FAST).',
    'Extended FAST (eFAST) trauma ultrasound assessment.'
  ]
}

export default calc