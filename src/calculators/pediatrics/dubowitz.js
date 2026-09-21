const dubowitz = {
  id: 'dubowitz',
  name: 'Dubowitz Score',
  shortName: 'Dubowitz Score',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Dubowitz Score from the MedCalc master calculator catalogue.',
  keywords: ['Dubowitz Score', 'Pediatrics'],
  aliases: ['Dubowitz Score'],
  inputs: [{id:'score',label:'Dubowitz score',type:'number',step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter Dubowitz score.'}
    return {value:s,displayValue:String(s),unit:'points',category:'Dubowitz score'}
  },
  references: ['Original pediatric score/assessment reference.']
}

export default dubowitz
