const fek = {
  id: 'fek',
  name: 'Fractional Excretion of Potassium',
  shortName: 'Fractional Excretion of Potassium',
  type: 'score',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Fractional Excretion of Potassium from the MedCalc master calculator catalogue.',
  keywords: ['Fractional Excretion of Potassium', 'Nephrology'],
  aliases: ['Fractional Excretion of Potassium'],
  inputs: [
 {id:'urineK',label:'Urine potassium',type:'number',unit:'mmol/L',min:0,step:0.1},
 {id:'serumK',label:'Serum potassium',type:'number',unit:'mmol/L',min:0,step:0.1},
 {id:'urineCreatinine',label:'Urine creatinine',type:'number',unit:'mg/dL',min:0,step:0.1},
 {id:'serumCreatinine',label:'Serum creatinine',type:'number',unit:'mg/dL',min:0,step:0.01}
],
  calculate(values) {
    const uK=Number(values.urineK),sK=Number(values.serumK),uC=Number(values.urineCreatinine),sC=Number(values.serumCreatinine)
    if(![uK,sK,uC,sC].every(Number.isFinite)||sK<=0||uC<=0) return {error:'Complete FEK inputs.'}
    const v=(uK*sC)/(sK*uC)*100
    return {value:v,displayValue:v.toFixed(1),unit:'%',category:'Fractional excretion of potassium'}
  },
  references: ['Standard renal/electrolyte equation reference.']
}

export default fek
