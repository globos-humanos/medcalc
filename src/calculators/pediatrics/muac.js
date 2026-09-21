const muac = {
  id: 'muac',
  name: 'Mid-Upper Arm Circumference',
  shortName: 'Mid-Upper Arm Circumference',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Mid-Upper Arm Circumference from the MedCalc master calculator catalogue.',
  keywords: ['Mid-Upper Arm Circumference', 'Pediatrics'],
  aliases: ['Mid-Upper Arm Circumference'],
  inputs: [{id:'muac',label:'MUAC',type:'number',unit:'cm',min:0,step:0.1},{id:'age',label:'Age',type:'number',unit:'months',min:0,step:1}],
  calculate(values) {
    const m=Number(values.muac),a=Number(values.age); if(![m,a].every(Number.isFinite)) return {error:'Enter MUAC and age.'}
    return {value:m,displayValue:m.toFixed(1),unit:'cm',category:'MUAC measurement; interpret using age-specific standards'}
  },
  references: ['Original pediatric score/assessment reference.']
}

export default muac
