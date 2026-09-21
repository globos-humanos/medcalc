const deltaGap = {
  id: 'deltaGap',
  name: 'Delta Gap / Delta Ratio',
  shortName: 'Delta Gap / Delta Ratio',
  type: 'score',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Delta Gap / Delta Ratio from the MedCalc master calculator catalogue.',
  keywords: ['Delta Gap / Delta Ratio', 'Nephrology'],
  aliases: ['Delta Gap / Delta Ratio'],
  inputs: [
 {id:'na',label:'Sodium',type:'number',unit:'mmol/L',step:0.1},
 {id:'cl',label:'Chloride',type:'number',unit:'mmol/L',step:0.1},
 {id:'hco3',label:'Bicarbonate',type:'number',unit:'mmol/L',step:0.1}
],
  calculate(values) {
    const na=Number(values.na),cl=Number(values.cl),h=Number(values.hco3)
    if(![na,cl,h].every(Number.isFinite)) return {error:'Complete anion-gap inputs.'}
    const ag=na-cl-h, delta=ag-12, ratio=delta/(24-h)
    return {value:ratio,displayValue:ratio.toFixed(2),unit:'delta ratio',category:`AG ${ag.toFixed(1)}; delta gap ${delta.toFixed(1)}`}
  },
  references: ['Standard renal/electrolyte equation reference.']
}

export default deltaGap
