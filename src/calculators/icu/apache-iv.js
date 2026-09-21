const apacheIV = {
  id: 'apacheIV',
  name: 'APACHE IV',
  shortName: 'APACHE IV',
  type: 'score',
  categoryId: 'icu',
  category: 'ICU',
  description: 'APACHE IV from the MedCalc master calculator catalogue.',
  keywords: ['APACHE IV', 'ICU'],
  aliases: ['APACHE IV'],
  inputs: [{id:'score',label:'APACHE IV model score',type:'number',min:0,step:1}],
  calculate(values) {
    const score=Number(values.score); if(!Number.isFinite(score)) return {error:'Enter APACHE IV model score.'}
    return {value:score,displayValue:String(score),unit:'points',category:'APACHE IV'}
  },
  references: ['Original validated ICU score publication.']
}

export default apacheIV
