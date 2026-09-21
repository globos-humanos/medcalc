const ipssM = {
  id: 'ipssM',
  name: 'IPSS-M',
  shortName: 'IPSS-M',
  type: 'score',
  categoryId: 'hematology',
  category: 'Hematology & Oncology',
  description: 'IPSS-M from the MedCalc master calculator catalogue.',
  keywords: ['IPSS-M', 'Hematology & Oncology'],
  aliases: ['IPSS-M'],
  inputs: [{id:'score',label:'IPSS-M score',type:'number',step:0.01}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter IPSS-M score.'}
    return {value:s,displayValue:String(s),unit:'model score',category:'IPSS-M'}
  },
  references: ['Original hematology/oncology score publication.']
}

export default ipssM
