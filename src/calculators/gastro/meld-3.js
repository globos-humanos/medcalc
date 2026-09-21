const meld3 = {
  id: 'meld3',
  name: 'MELD 3.0',
  shortName: 'MELD 3.0',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description: 'MELD 3.0 from the MedCalc master calculator catalogue.',
  keywords: ['MELD 3.0', 'Gastroenterology'],
  aliases: ['MELD 3.0'],
  inputs: [{id:'score',label:'MELD 3.0 score',type:'number',min:0,max:40,step:0.1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter MELD 3.0 score.'}
    return {value:s,displayValue:s.toFixed(1),unit:'points',category:'MELD 3.0'}
  },
  references: ['Original validated gastroenterology score publication.']
}

export default meld3
