const apacheIII = {
  id: 'apacheIII',
  name: 'APACHE III',
  shortName: 'APACHE III',
  type: 'score',
  categoryId: 'icu',
  category: 'ICU',
  description: 'APACHE III from the MedCalc master calculator catalogue.',
  keywords: ['APACHE III', 'ICU'],
  aliases: ['APACHE III'],
  inputs: [{id:'score',label:'APACHE III score',type:'number',min:0,step:1}],
  calculate(values) {
    const score=Number(values.score); if(!Number.isFinite(score)) return {error:'Enter APACHE III score.'}
    return {value:score,displayValue:String(score),unit:'points',category:'APACHE III'}
  },
  references: ['Original validated ICU score publication.']
}

export default apacheIII
