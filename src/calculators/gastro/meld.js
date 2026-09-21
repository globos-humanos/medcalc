const meld = {
  id: 'meld',
  name: 'MELD Score',
  shortName: 'MELD Score',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description: 'MELD Score from the MedCalc master calculator catalogue.',
  keywords: ['MELD Score', 'Gastroenterology'],
  aliases: ['MELD Score'],
  inputs: [{id:'score',label:'MELD score',type:'number',min:0,max:40,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter MELD score.'}
    return {value:s,displayValue:String(s),unit:'points',category:'MELD'}
  },
  references: ['Original validated gastroenterology score publication.']
}

export default meld
