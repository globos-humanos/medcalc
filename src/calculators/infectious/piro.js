const piro = {
  id: 'piro',
  name: 'PIRO Score',
  shortName: 'PIRO Score',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'PIRO Score from the MedCalc master calculator catalogue.',
  keywords: ['PIRO Score', 'Infectious Disease'],
  aliases: ['PIRO Score'],
  inputs: [{id:'score',label:'PIRO score',type:'number',min:0,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter PIRO score.'}
    return {value:s,displayValue:String(s),unit:'points',category:'PIRO'}
  },
  references: ['Original infectious disease score/criteria publication.']
}

export default piro
