const spesi = {
  id: 'spesi',
  name: 'Simplified PESI',
  shortName: 'Simplified PESI',
  type: 'score',
  categoryId: 'respiratory',
  category: 'Respiratory',
  description: 'Simplified PESI from the MedCalc master calculator catalogue.',
  keywords: ['Simplified PESI', 'Respiratory'],
  aliases: ['Simplified PESI'],
  inputs: [
 {id:'age80',label:'Age >80 years',type:'boolean'},
 {id:'cancer',label:'Cancer',type:'boolean'},
 {id:'cardiopulmonary',label:'Chronic cardiopulmonary disease',type:'boolean'},
 {id:'hr110',label:'Heart rate ≥110/min',type:'boolean'},
 {id:'sbp100',label:'Systolic BP <100 mmHg',type:'boolean'},
 {id:'spo290',label:'Oxygen saturation <90%',type:'boolean'}
],
  calculate(values) {
    const k=['age80','cancer','cardiopulmonary','hr110','sbp100','spo290']
    if(k.some(x=>typeof values[x]!=='boolean')) return {error:'Complete all sPESI inputs.'}
    const s=k.reduce((n,x)=>n+(values[x]?1:0),0)
    return {value:s,displayValue:String(s),unit:'points',category:s===0?'Low-risk':'Higher-risk'}
  },
  references: ['Original validated respiratory/PE score publication.']
}

export default spesi
