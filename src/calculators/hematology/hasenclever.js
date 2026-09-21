const hasenclever = {
  id: 'hasenclever',
  name: 'Hasenclever Index',
  shortName: 'Hasenclever Index',
  type: 'score',
  categoryId: 'hematology',
  category: 'Hematology & Oncology',
  description: 'Hasenclever Index from the MedCalc master calculator catalogue.',
  keywords: ['Hasenclever Index', 'Hematology & Oncology'],
  aliases: ['Hasenclever Index'],
  inputs: [{id:'score',label:'Hasenclever score',type:'number',min:0,max:7,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter Hasenclever score.'}
    return {value:s,displayValue:String(s),unit:'/ 7',category:'Hasenclever Index'}
  },
  references: ['Original hematology/oncology score publication.']
}

export default hasenclever
