const pesi = {
  id: 'pesi',
  name: 'PESI Score',
  shortName: 'PESI Score',
  type: 'score',
  categoryId: 'respiratory',
  category: 'Respiratory',
  description: 'PESI Score from the MedCalc master calculator catalogue.',
  keywords: ['PESI Score', 'Respiratory'],
  aliases: ['PESI Score'],
  inputs: [{id:'score',label:'PESI score',type:'number',min:0,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter PESI score.'}
    const c=s<=65?'I':s<=85?'II':s<=105?'III':s<=125?'IV':'V'
    return {value:s,displayValue:String(s),unit:'points',category:`Class ${c}`}
  },
  references: ['Original validated respiratory/PE score publication.']
}

export default pesi
