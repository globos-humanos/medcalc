const fast = {
  id: 'fast',
  name: 'FAST / eFAST Assessment',
  shortName: 'FAST / eFAST',
  categoryId: 'emergency',
  category: 'Emergency / Trauma',
  description:
    'Structured documentation aid for focused trauma ultrasound assessment of pericardial, abdominal, pleural and pneumothorax findings.',
  type: 'assessment',

  inputs: [
    {
      id: 'pericardial',
      label: 'Pericardial free fluid',
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
      id: 'rightPleural',
      label: 'Right pleural free fluid',
      type: 'boolean'
    },
    {
      id: 'leftPleural',
      label: 'Left pleural free fluid',
      type: 'boolean'
    },
    {
      id: 'rightPneumothorax',
      label: 'Right pneumothorax finding',
      type: 'boolean'
    },
    {
      id: 'leftPneumothorax',
      label: 'Left pneumothorax finding',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const ids = [
      'pericardial',
      'ruq',
      'luq',
      'pelvis',
      'rightPleural',
      'leftPleural',
      'rightPneumothorax',
      'leftPneumothorax'
    ]

    if (ids.some(id => typeof v[id] !== 'boolean')) {
      return {
        error: 'Please complete all FAST/eFAST assessment fields.'
      }
    }

    const peritoneal =
      v.ruq ||
      v.luq ||
      v.pelvis

    const pericardial = v.pericardial

    const pleural =
      v.rightPleural ||
      v.leftPleural

    const pneumothorax =
      v.rightPneumothorax ||
      v.leftPneumothorax

    const findings = []

    if (pericardial) {
      findings.push('pericardial fluid')
    }

    if (peritoneal) {
      findings.push('intraperitoneal free fluid')
    }

    if (pleural) {
      findings.push('pleural free fluid')
    }

    if (pneumothorax) {
      findings.push('pneumothorax finding')
    }

    if (findings.length === 0) {
      return {
        value: 'No positive finding selected',
        displayValue: 'No positive finding',
        unit: 'FAST / eFAST',
        category: 'No positive finding entered',
        note:
          'A negative FAST/eFAST assessment does not independently exclude traumatic injury. Interpret the examination with the clinical picture and examination quality.'
      }
    }

    return {
      value: findings.length,
      displayValue: `${findings.length} positive finding${findings.length > 1 ? 's' : ''}`,
      unit: 'FAST / eFAST',
      category: 'Positive finding(s) documented',
      note:
        findings.join('; ') +
        '. This tool documents selected ultrasound findings; it does not perform or interpret the ultrasound examination itself.'
    }
  },

  references: [
    'American College of Emergency Physicians. Emergency Ultrasound Imaging Criteria: Trauma / FAST.',
    'Focused Assessment with Sonography in Trauma (FAST) and Extended FAST (eFAST).'
  ]
}

export default fast
