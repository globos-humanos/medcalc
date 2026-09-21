const haps = {
  id: 'haps',
  name: 'Harmless Acute Pancreatitis Score',
  shortName: 'Harmless Acute Pancreatitis Score',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description: 'Harmless Acute Pancreatitis Score from the MedCalc master calculator catalogue.',
  keywords: ['Harmless Acute Pancreatitis Score', 'Gastroenterology'],
  aliases: ['Harmless Acute Pancreatitis Score'],
  inputs: [
 {id:'peritonitis',label:'Peritonitis',type:'boolean'},
 {id:'creatinine',label:'Creatinine >2 mg/dL',type:'boolean'},
 {id:'hematocrit',label:'Hematocrit abnormal / elevated',type:'boolean'}
],
  calculate(values) {
    const k=['peritonitis','creatinine','hematocrit']; if(k.some(x=>typeof values[x]!=='boolean')) return {error:'Complete HAPS inputs.'}
    const abnormal=k.reduce((n,x)=>n+(values[x]?1:0),0)
    return {value:abnormal,displayValue:String(abnormal),unit:'abnormal criteria',category:abnormal===0?'HAPS-negative / potentially harmless course':'HAPS-positive'}
  },
  references: ['Original validated gastroenterology score publication.']
}

export default haps
