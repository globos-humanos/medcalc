const lille = {
  id: 'lille',
  name: 'Lille Score',
  shortName: 'Lille Score',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description: 'Lille Score from the MedCalc master calculator catalogue.',
  keywords: ['Lille Score', 'Gastroenterology'],
  aliases: ['Lille Score'],
  inputs: [{id:'score',label:'Lille model output',type:'number',min:0,max:1,step:0.01}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter Lille model output.'}
    return {value:s,displayValue:s.toFixed(2),unit:'model score',category:s>=0.45?'Higher predicted mortality / poor response':'Lower predicted mortality / response'}
  },
  references: ['Original validated gastroenterology score publication.']
}

export default lille
