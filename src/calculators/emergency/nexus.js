const nexus={id:'nexus',name:'NEXUS C-Spine Criteria',shortName:'NEXUS',categoryId:'emergency',description:'Clinical criteria for cervical-spine imaging after trauma.',type:'score',
inputs:[{id:'midline',label:'Posterior midline cervical tenderness?',type:'boolean'},{id:'intox',label:'Intoxication?',type:'boolean'},{id:'neuro',label:'Focal neurologic deficit?',type:'boolean'},{id:'distracting',label:'Painful distracting injury?',type:'boolean'},{id:'alert',label:'Normal alertness?',type:'boolean'}],
calculate(v) {
    const ids = [
      'midline',
      'intox',
      'neuro',
      'distracting',
      'alert'
    ]

    if (ids.some(id => typeof v[id] !== 'boolean')) {
      return {
        error: 'Please answer all NEXUS criteria.'
      }
    }

    const positive =
      v.midline ||
      v.intox ||
      v.neuro ||
      v.distracting ||
      !v.alert

    return {
      value: positive
        ? 'NEXUS positive'
        : 'NEXUS negative',
      displayValue: positive
        ? 'Positive'
        : 'Negative',
      unit: 'NEXUS',
      category: positive
        ? 'Cervical-spine imaging rule positive'
        : 'NEXUS negative',
      note:
        'NEXUS is intended for appropriate alert trauma patients and should be interpreted within the rule’s validated population.'
    }
  }
};export default nexus
