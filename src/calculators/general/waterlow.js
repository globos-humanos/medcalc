const waterlow = {
  id: 'waterlow',
  name: 'Waterlow Score',
  shortName: 'Waterlow Score',
  type: 'score',
  categoryId: 'general',
  category: 'General Medicine',
  description: 'Waterlow Score from the MedCalc master calculator catalogue.',
  keywords: ['Waterlow Score', 'General Medicine'],
  aliases: ['Waterlow Score'],
  inputs: [
 {id:'build',label:'Build / BMI',type:'number',min:0,step:1},
 {id:'skin',label:'Skin type score',type:'number',min:0,step:1},
 {id:'sexAge',label:'Sex / age score',type:'number',min:0,step:1},
 {id:'continence',label:'Continence score',type:'number',min:0,step:1},
 {id:'mobility',label:'Mobility score',type:'number',min:0,step:1},
 {id:'appetite',label:'Appetite / nutrition score',type:'number',min:0,step:1},
 {id:'tissue',label:'Tissue malnutrition score',type:'number',min:0,step:1},
 {id:'neurologic',label:'Neurological deficit score',type:'number',min:0,step:1},
 {id:'surgeryTrauma',label:'Surgery / trauma score',type:'number',min:0,step:1},
 {id:'medications',label:'Medication score',type:'number',min:0,step:1}
],
  calculate(values) {
    const keys=['build','skin','sexAge','continence','mobility','appetite','tissue','neurologic','surgeryTrauma','medications']
    if(keys.some(k=>!Number.isFinite(Number(values[k])))) return {error:'Enter all Waterlow component scores.'}
    const score=keys.reduce((s,k)=>s+Number(values[k]),0)
    return {value:score,displayValue:String(score),unit:'points',category:score<10?'At risk':score<15?'High risk':score<20?'High risk':'Very high risk'}
  },
  references: ['Waterlow J. Pressure sore risk assessment.']
}

export default waterlow
