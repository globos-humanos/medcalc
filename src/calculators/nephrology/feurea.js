const feurea = {
  id: 'feurea',
  name: 'Fractional Excretion of Urea',
  shortName: 'Fractional Excretion of Urea',
  type: 'score',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Fractional Excretion of Urea from the MedCalc master calculator catalogue.',
  keywords: ['Fractional Excretion of Urea', 'Nephrology'],
  aliases: ['Fractional Excretion of Urea'],
  inputs: [
 {id:'urineUrea',label:'Urine urea',type:'number',unit:'mg/dL',min:0,step:0.1},
 {id:'serumUrea',label:'Serum urea',type:'number',unit:'mg/dL',min:0,step:0.1},
 {id:'urineCreatinine',label:'Urine creatinine',type:'number',unit:'mg/dL',min:0,step:0.1},
 {id:'serumCreatinine',label:'Serum creatinine',type:'number',unit:'mg/dL',min:0,step:0.01}
],
  calculate(values) {
    const uU=Number(values.urineUrea),sU=Number(values.serumUrea),uC=Number(values.urineCreatinine),sC=Number(values.serumCreatinine)
    if(![uU,sU,uC,sC].every(Number.isFinite)||sU<=0||uC<=0) return {error:'Complete FEUrea inputs.'}
    const v=(uU*sC)/(sU*uC)*100
    return {value:v,displayValue:v.toFixed(1),unit:'%',category:v<35?'Low FEUrea':'Higher FEUrea'}
  },
  references: ['Standard renal/electrolyte equation reference.']
}

export default feurea
