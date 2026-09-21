const urr = {
  id: 'urr',
  name: 'Urea Reduction Ratio',
  shortName: 'Urea Reduction Ratio',
  type: 'score',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Urea Reduction Ratio from the MedCalc master calculator catalogue.',
  keywords: ['Urea Reduction Ratio', 'Nephrology'],
  aliases: ['Urea Reduction Ratio'],
  inputs: [{id:'pre',label:'Pre-dialysis BUN',type:'number',unit:'mg/dL',step:0.1},{id:'post',label:'Post-dialysis BUN',type:'number',unit:'mg/dL',step:0.1}],
  calculate(values) {
    const pre=Number(values.pre),post=Number(values.post); if(![pre,post].every(Number.isFinite)||pre<=0) return {error:'Complete URR inputs.'}
    const v=(1-post/pre)*100; return {value:v,displayValue:v.toFixed(1),unit:'%',category:'Urea reduction ratio'}
  },
  references: ['Standard renal/electrolyte equation reference.']
}

export default urr
