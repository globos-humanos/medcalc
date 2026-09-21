const ipi = {
  id: 'ipi',
  name: 'International Prognostic Index',
  shortName: 'International Prognostic Index',
  type: 'score',
  categoryId: 'hematology',
  category: 'Hematology & Oncology',
  description: 'International Prognostic Index from the MedCalc master calculator catalogue.',
  keywords: ['International Prognostic Index', 'Hematology & Oncology'],
  aliases: ['International Prognostic Index'],
  inputs: [{id:'score',label:'IPI score',type:'number',min:0,max:5,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter IPI score.'}
    return {value:s,displayValue:String(s),unit:'/ 5',category:'IPI'}
  },
  references: ['Original hematology/oncology score publication.']
}

export default ipi
