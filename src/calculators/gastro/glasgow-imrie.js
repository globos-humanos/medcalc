const glasgowImrie = {
  id: 'glasgowImrie',
  name: 'Glasgow-Imrie Score',
  shortName: 'Glasgow-Imrie Score',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description: 'Glasgow-Imrie Score from the MedCalc master calculator catalogue.',
  keywords: ['Glasgow-Imrie Score', 'Gastroenterology'],
  aliases: ['Glasgow-Imrie Score'],
  inputs: [{id:'score',label:'Glasgow-Imrie score',type:'number',min:0,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter Glasgow-Imrie score.'}
    return {value:s,displayValue:String(s),unit:'points',category:s>=3?'Severe pancreatitis':'Less severe range'}
  },
  references: ['Original validated gastroenterology score publication.']
}

export default glasgowImrie
