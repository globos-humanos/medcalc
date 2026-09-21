const flipi = {
  id: 'flipi',
  name: 'FLIPI',
  shortName: 'FLIPI',
  type: 'score',
  categoryId: 'hematology',
  category: 'Hematology & Oncology',
  description: 'FLIPI from the MedCalc master calculator catalogue.',
  keywords: ['FLIPI', 'Hematology & Oncology'],
  aliases: ['FLIPI'],
  inputs: [{id:'score',label:'FLIPI score',type:'number',min:0,max:5,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter FLIPI score.'}
    return {value:s,displayValue:String(s),unit:'/ 5',category:s<=1?'Low-risk group':s<=2?'Intermediate-risk group':'High-risk group'}
  },
  references: ['Original hematology/oncology score publication.']
}

export default flipi
