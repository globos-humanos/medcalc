const ipssR = {
  id: 'ipssR',
  name: 'IPSS-R',
  shortName: 'IPSS-R',
  type: 'score',
  categoryId: 'hematology',
  category: 'Hematology & Oncology',
  description: 'IPSS-R from the MedCalc master calculator catalogue.',
  keywords: ['IPSS-R', 'Hematology & Oncology'],
  aliases: ['IPSS-R'],
  inputs: [{id:'score',label:'IPSS-R score',type:'number',min:0,step:0.1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter IPSS-R score.'}
    return {value:s,displayValue:String(s),unit:'points',category:'IPSS-R'}
  },
  references: ['Original hematology/oncology score publication.']
}

export default ipssR
