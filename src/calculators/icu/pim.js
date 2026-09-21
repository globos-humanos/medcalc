const pim = {
  id: 'pim',
  name: 'Pediatric Index of Mortality',
  shortName: 'Pediatric Index of Mortality',
  type: 'score',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Pediatric Index of Mortality from the MedCalc master calculator catalogue.',
  keywords: ['Pediatric Index of Mortality', 'ICU'],
  aliases: ['Pediatric Index of Mortality'],
  inputs: [{id:'score',label:'PIM score / model output',type:'number',step:0.01}],
  calculate(values) {
    const score=Number(values.score); if(!Number.isFinite(score)) return {error:'Enter PIM model output.'}
    return {value:score,displayValue:String(score),unit:'model output',category:'PIM'}
  },
  references: ['Original validated ICU score publication.']
}

export default pim
