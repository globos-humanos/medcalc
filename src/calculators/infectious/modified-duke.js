const modifiedDuke = {
  id: 'modifiedDuke',
  name: 'Modified Duke Criteria',
  shortName: 'Modified Duke Criteria',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'Modified Duke Criteria from the MedCalc master calculator catalogue.',
  keywords: ['Modified Duke Criteria', 'Infectious Disease'],
  aliases: ['Modified Duke Criteria'],
  inputs: [{id:'major',label:'Major criteria',type:'number',min:0,step:1},{id:'minor',label:'Minor criteria',type:'number',min:0,step:1}],
  calculate(values) {
    const ma=Number(values.major),mi=Number(values.minor); if(![ma,mi].every(Number.isFinite)) return {error:'Enter major and minor criteria.'}
    const definite=(ma>=2)||(ma===1&&mi>=3)||(ma===1&&mi>=3); return {value:ma*2+mi,displayValue:`${ma} major + ${mi} minor`,unit:'criteria',category:definite?'Definite IE criteria pattern':'Does not meet definite pattern'}
  },
  references: ['Original infectious disease score/criteria publication.']
}

export default modifiedDuke
