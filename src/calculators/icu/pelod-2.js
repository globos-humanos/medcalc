const pelod2 = {
  id: 'pelod2',
  name: 'PELOD-2',
  shortName: 'PELOD-2',
  type: 'score',
  categoryId: 'icu',
  category: 'ICU',
  description: 'PELOD-2 from the MedCalc master calculator catalogue.',
  keywords: ['PELOD-2', 'ICU'],
  aliases: ['PELOD-2'],
  inputs: [{id:'score',label:'PELOD-2 score',type:'number',min:0,step:1}],
  calculate(values) {
    const score=Number(values.score); if(!Number.isFinite(score)) return {error:'Enter PELOD-2 score.'}
    return {value:score,displayValue:String(score),unit:'points',category:'PELOD-2'}
  },
  references: ['Original validated ICU score publication.']
}

export default pelod2
