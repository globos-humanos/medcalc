const kfre = {
  id: 'kfre',
  name: 'Kidney Failure Risk Equation',
  shortName: 'Kidney Failure Risk Equation',
  type: 'score',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Kidney Failure Risk Equation from the MedCalc master calculator catalogue.',
  keywords: ['Kidney Failure Risk Equation', 'Nephrology'],
  aliases: ['Kidney Failure Risk Equation'],
  inputs: [{id:'risk',label:'Validated KFRE risk',type:'number',min:0,max:100,step:0.1,unit:'%'}],
  calculate(values) {
    const r=Number(values.risk); if(!Number.isFinite(r)) return {error:'Enter validated KFRE output.'}
    return {value:r,displayValue:r.toFixed(1),unit:'%',category:'KFRE risk'}
  },
  references: ['Standard renal/electrolyte equation reference.']
}

export default kfre
