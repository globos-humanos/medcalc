const duke = {
  id: 'duke',
  name: 'Duke Criteria',
  shortName: 'Duke Criteria',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'Duke Criteria from the MedCalc master calculator catalogue.',
  keywords: ['Duke Criteria', 'Infectious Disease'],
  aliases: ['Duke Criteria'],
  inputs: [{id:'major',label:'Major criteria',type:'number',min:0,step:1},{id:'minor',label:'Minor criteria',type:'number',min:0,step:1}],
  calculate(values) {
    const ma=Number(values.major),mi=Number(values.minor); if(![ma,mi].every(Number.isFinite)) return {error:'Enter major and minor criteria.'}
    return {value:ma+mi,displayValue:`${ma} major + ${mi} minor`,unit:'criteria',category:'Duke criteria'}
  },
  references: ['Original infectious disease score/criteria publication.']
}

export default duke
