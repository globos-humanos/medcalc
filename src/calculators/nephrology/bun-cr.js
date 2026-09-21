const bunCr = {
  id: 'bunCr',
  name: 'BUN / Creatinine Ratio',
  shortName: 'BUN / Creatinine Ratio',
  type: 'score',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'BUN / Creatinine Ratio from the MedCalc master calculator catalogue.',
  keywords: ['BUN / Creatinine Ratio', 'Nephrology'],
  aliases: ['BUN / Creatinine Ratio'],
  inputs: [{id:'bun',label:'BUN',type:'number',unit:'mg/dL',min:0,step:0.1},{id:'creatinine',label:'Creatinine',type:'number',unit:'mg/dL',min:0,step:0.01}],
  calculate(values) {
    const b=Number(values.bun),c=Number(values.creatinine); if(![b,c].every(Number.isFinite)||c<=0) return {error:'Complete BUN/creatinine inputs.'}
    const r=b/c; return {value:r,displayValue:r.toFixed(1),unit:'ratio',category:'BUN/Cr ratio'}
  },
  references: ['Standard renal/electrolyte equation reference.']
}

export default bunCr
