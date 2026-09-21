const ttkg = {
  id: 'ttkg',
  name: 'Transtubular Potassium Gradient',
  shortName: 'Transtubular Potassium Gradient',
  type: 'score',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Transtubular Potassium Gradient from the MedCalc master calculator catalogue.',
  keywords: ['Transtubular Potassium Gradient', 'Nephrology'],
  aliases: ['Transtubular Potassium Gradient'],
  inputs: [{id:'urineK',label:'Urine potassium',type:'number',unit:'mmol/L',step:0.1},{id:'serumK',label:'Serum potassium',type:'number',unit:'mmol/L',step:0.1},{id:'urineOsm',label:'Urine osmolality',type:'number',unit:'mOsm/kg',step:1},{id:'serumOsm',label:'Serum osmolality',type:'number',unit:'mOsm/kg',step:1}],
  calculate(values) {
    const uk=Number(values.urineK),sk=Number(values.serumK),uo=Number(values.urineOsm),so=Number(values.serumOsm)
    if(![uk,sk,uo,so].every(Number.isFinite)||sk<=0||so<=0) return {error:'Complete TTKG inputs.'}
    const v=(uk/sk)/(uo/so); return {value:v,displayValue:v.toFixed(1),unit:'gradient',category:'TTKG'}
  },
  references: ['Standard renal/electrolyte equation reference.']
}

export default ttkg
