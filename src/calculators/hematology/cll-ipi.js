const cllIpi = {
  id: 'cllIpi',
  name: 'CLL-IPI',
  shortName: 'CLL-IPI',
  type: 'score',
  categoryId: 'hematology',
  category: 'Hematology & Oncology',
  description: 'CLL-IPI from the MedCalc master calculator catalogue.',
  keywords: ['CLL-IPI', 'Hematology & Oncology'],
  aliases: ['CLL-IPI'],
  inputs: [{id:'score',label:'CLL-IPI score',type:'number',min:0,max:10,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter CLL-IPI score.'}
    return {value:s,displayValue:String(s),unit:'points',category:'CLL-IPI'}
  },
  references: ['Original hematology/oncology score publication.']
}

export default cllIpi
