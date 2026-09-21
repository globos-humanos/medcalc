const rIpi = {
  id: 'rIpi',
  name: 'Revised International Prognostic Index',
  shortName: 'Revised International Prognostic Index',
  type: 'score',
  categoryId: 'hematology',
  category: 'Hematology & Oncology',
  description: 'Revised International Prognostic Index from the MedCalc master calculator catalogue.',
  keywords: ['Revised International Prognostic Index', 'Hematology & Oncology'],
  aliases: ['Revised International Prognostic Index'],
  inputs: [{id:'score',label:'R-IPI score',type:'number',min:0,max:5,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter R-IPI score.'}
    return {value:s,displayValue:String(s),unit:'/ 5',category:'R-IPI'}
  },
  references: ['Original hematology/oncology score publication.']
}

export default rIpi
