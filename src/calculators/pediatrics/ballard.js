const ballard = {
  id: 'ballard',
  name: 'Ballard Score',
  shortName: 'Ballard Score',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Ballard Score from the MedCalc master calculator catalogue.',
  keywords: ['Ballard Score', 'Pediatrics'],
  aliases: ['Ballard Score'],
  inputs: [{id:'score',label:'New Ballard score',type:'number',min:-10,max:50,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter Ballard score.'}
    return {value:s,displayValue:String(s),unit:'points',category:'New Ballard score'}
  },
  references: ['Original pediatric score/assessment reference.']
}

export default ballard
