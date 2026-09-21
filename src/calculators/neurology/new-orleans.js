const newOrleans = {
  id: 'newOrleans',
  name: 'New Orleans Criteria',
  shortName: 'New Orleans Criteria',
  type: 'score',
  categoryId: 'neurology',
  category: 'Neurology',
  description: 'New Orleans Criteria from the MedCalc master calculator catalogue.',
  keywords: ['New Orleans Criteria', 'Neurology'],
  aliases: ['New Orleans Criteria'],
  inputs: [{id:'criteria',label:'Number of positive criteria',type:'number',min:0,max:7,step:1}],
  calculate(values) {
    const s=Number(values.criteria); if(!Number.isFinite(s)) return {error:'Enter number of positive criteria.'}
    return {value:s,displayValue:String(s),unit:'/ 7',category:s===0?'No listed NOC trigger':'NOC positive'}
  },
  references: ['Original validated neurologic score/classification publication.']
}

export default newOrleans
