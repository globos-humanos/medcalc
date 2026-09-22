const knee={id:'ottawa-knee',name:'Ottawa Knee Rules',shortName:'Ottawa Knee',categoryId:'emergency',description:'Assesses need for knee radiographs after acute injury.',type:'score',
inputs:[{id:'age55',label:'Age â‰¥55?',type:'boolean'},{id:'fibula',label:'Isolated fibular head tenderness?',type:'boolean'},{id:'patella',label:'Patellar tenderness with no other bone tenderness?',type:'boolean'},{id:'flexion',label:'Unable to flex knee to 90Â°?',type:'boolean'},{id:'weight',label:'Unable to bear weight for four steps both immediately and in ED?',type:'boolean'}],
calculate(v) {
    const ids = [
      'age55',
      'fibula',
      'patella',
      'flexion',
      'weight'
    ]

    if (ids.some(id => typeof v[id] !== 'boolean')) {
      return {
        error: 'Please answer all Ottawa Knee Rule criteria.'
      }
    }

    const positive =
      v.age55 ||
      v.fibula ||
      v.patella ||
      v.flexion ||
      v.weight

    return {
      value: positive
        ? 'Radiography indicated by rule'
        : 'No radiography by rule',
      displayValue: positive
        ? 'Image'
        : 'No imaging',
      unit: 'Ottawa Knee Rules',
      category: positive
        ? 'Radiography indicated'
        : 'Rule negative',
      note:
        'Radiography is indicated when any Ottawa Knee Rule criterion is present.'
    }
  }
};export default knee
