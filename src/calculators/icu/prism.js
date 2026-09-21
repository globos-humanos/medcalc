const prism = {
  id: 'prism',
  name: 'PRISM',
  shortName: 'PRISM',
  type: 'score',
  categoryId: 'icu',
  category: 'ICU',
  description: 'PRISM from the MedCalc master calculator catalogue.',
  keywords: ['PRISM', 'ICU'],
  aliases: ['PRISM'],
  inputs: [{id:'score',label:'PRISM score',type:'number',min:0,step:1}],
  calculate(values) {
    const score=Number(values.score); if(!Number.isFinite(score)) return {error:'Enter PRISM score.'}
    return {value:score,displayValue:String(score),unit:'points',category:'PRISM'}
  },
  references: ['Original validated ICU score publication.']
}

export default prism
