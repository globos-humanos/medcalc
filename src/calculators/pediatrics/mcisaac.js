const pediatricMcIsaac = {
  id: 'pediatricMcIsaac',
  name: 'McIsaac Score',
  shortName: 'McIsaac Score',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'McIsaac Score from the MedCalc master calculator catalogue.',
  keywords: ['McIsaac Score', 'Pediatrics'],
  aliases: ['McIsaac Score'],
  inputs: [{id:'fever',label:'Fever >38°C',type:'boolean'},{id:'tonsillarExudate',label:'Tonsillar exudate/swelling',type:'boolean'},{id:'tenderNodes',label:'Tender anterior cervical nodes',type:'boolean'},{id:'noCough',label:'No cough',type:'boolean'},{id:'age',label:'Age',type:'number',unit:'years',min:0,step:1}],
  calculate(values) {
    const b=['fever','tonsillarExudate','tenderNodes','noCough']; const age=Number(values.age)
    if(b.some(x=>typeof values[x]!=='boolean')||!Number.isFinite(age)) return {error:'Complete McIsaac inputs.'}
    let s=b.reduce((n,x)=>n+(values[x]?1:0),0); if(age<15)s+=1; else if(age>=45)s-=1
    return {value:s,displayValue:String(s),unit:'/ 5',category:'McIsaac score'}
  },
  references: ['Original pediatric score/assessment reference.']
}

export default pediatricMcIsaac
