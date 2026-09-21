const aims65 = {
  id: 'aims65',
  name: 'AIMS65 Score',
  shortName: 'AIMS65 Score',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description: 'AIMS65 Score from the MedCalc master calculator catalogue.',
  keywords: ['AIMS65 Score', 'Gastroenterology'],
  aliases: ['AIMS65 Score'],
  inputs: [
 {id:'albumin',label:'Albumin <3.0 g/dL',type:'boolean'},
 {id:'inr',label:'INR >1.5',type:'boolean'},
 {id:'mental',label:'Altered mental status',type:'boolean'},
 {id:'systolic',label:'Systolic BP ≤90 mmHg',type:'boolean'},
 {id:'age',label:'Age ≥65 years',type:'boolean'}
],
  calculate(values) {
    const k=['albumin','inr','mental','systolic','age']; if(k.some(x=>typeof values[x]!=='boolean')) return {error:'Complete AIMS65 inputs.'}
    const s=k.reduce((n,x)=>n+(values[x]?1:0),0)
    return {value:s,displayValue:String(s),unit:'/ 5 points',category:s===0?'0':String(s)}
  },
  references: ['Original validated gastroenterology score publication.']
}

export default aims65
