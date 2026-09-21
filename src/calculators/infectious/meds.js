const meds = {
  id: 'meds',
  name: 'MEDS Score',
  shortName: 'MEDS Score',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'MEDS Score from the MedCalc master calculator catalogue.',
  keywords: ['MEDS Score', 'Infectious Disease'],
  aliases: ['MEDS Score'],
  inputs: [{id:'score',label:'MEDS score',type:'number',min:0,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter MEDS score.'}
    return {value:s,displayValue:String(s),unit:'points',category:'MEDS'}
  },
  references: ['Original infectious disease score/criteria publication.']
}

export default meds
