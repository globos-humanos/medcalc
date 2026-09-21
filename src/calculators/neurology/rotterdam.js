const rotterdam = {
  id: 'rotterdam',
  name: 'Rotterdam CT Score',
  shortName: 'Rotterdam CT Score',
  type: 'score',
  categoryId: 'neurology',
  category: 'Neurology',
  description: 'Rotterdam CT Score from the MedCalc master calculator catalogue.',
  keywords: ['Rotterdam CT Score', 'Neurology'],
  aliases: ['Rotterdam CT Score'],
  inputs: [{id:'score',label:'Rotterdam CT score',type:'number',min:1,max:6,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter Rotterdam score.'}
    return {value:s,displayValue:String(s),unit:'/ 6',category:'Rotterdam CT score'}
  },
  references: ['Original validated neurologic score/classification publication.']
}

export default rotterdam
