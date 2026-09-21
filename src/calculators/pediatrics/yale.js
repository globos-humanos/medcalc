const yale = {
  id: 'yale',
  name: 'Yale Observation Scale',
  shortName: 'Yale Observation Scale',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Yale Observation Scale from the MedCalc master calculator catalogue.',
  keywords: ['Yale Observation Scale', 'Pediatrics'],
  aliases: ['Yale Observation Scale'],
  inputs: [{id:'score',label:'Yale Observation Scale score',type:'number',min:6,max:30,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter Yale Observation Scale score.'}
    return {value:s,displayValue:String(s),unit:'/ 30',category:s>=16?'Higher-risk observation score':'Lower-risk observation score'}
  },
  references: ['Original pediatric score/assessment reference.']
}

export default yale
