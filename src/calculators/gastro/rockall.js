const rockall = {
  id: 'rockall',
  name: 'Rockall Score',
  shortName: 'Rockall Score',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description: 'Rockall Score from the MedCalc master calculator catalogue.',
  keywords: ['Rockall Score', 'Gastroenterology'],
  aliases: ['Rockall Score'],
  inputs: [{id:'score',label:'Rockall score',type:'number',min:0,max:11,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter Rockall score.'}
    return {value:s,displayValue:String(s),unit:'points',category:'Rockall'}
  },
  references: ['Original validated gastroenterology score publication.']
}

export default rockall
