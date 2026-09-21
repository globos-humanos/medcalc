const sapsIII = {
  id: 'sapsIII',
  name: 'SAPS III',
  shortName: 'SAPS III',
  type: 'score',
  categoryId: 'icu',
  category: 'ICU',
  description: 'SAPS III from the MedCalc master calculator catalogue.',
  keywords: ['SAPS III', 'ICU'],
  aliases: ['SAPS III'],
  inputs: [{id:'score',label:'SAPS III score',type:'number',min:0,max:217,step:1}],
  calculate(values) {
    const score=Number(values.score); if(!Number.isFinite(score)) return {error:'Enter SAPS III score.'}
    return {value:score,displayValue:String(score),unit:'points',category:'SAPS III'}
  },
  references: ['Original validated ICU score publication.']
}

export default sapsIII
