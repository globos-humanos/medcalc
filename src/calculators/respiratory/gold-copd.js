const goldCopd = {
  id: 'goldCopd',
  name: 'GOLD COPD Assessment',
  shortName: 'GOLD COPD Assessment',
  type: 'score',
  categoryId: 'respiratory',
  category: 'Respiratory',
  description: 'GOLD COPD Assessment from the MedCalc master calculator catalogue.',
  keywords: ['GOLD COPD Assessment', 'Respiratory'],
  aliases: ['GOLD COPD Assessment'],
  inputs: [{id:'symptoms',label:'Symptom burden',type:'choice',options:[{value:'low',label:'Lower symptoms'},{value:'high',label:'Higher symptoms'}]},{id:'exacerbations',label:'Exacerbation risk',type:'choice',options:[{value:'low',label:'Lower risk'},{value:'high',label:'Higher risk'}]}],
  calculate(values) {
    if(!values.symptoms||!values.exacerbations) return {error:'Complete GOLD assessment.'}
    return {value:0,displayValue:'Assessment',unit:'',category:`Symptoms: ${values.symptoms}; exacerbation risk: ${values.exacerbations}`}
  },
  references: ['Original validated respiratory/PE score publication.']
}

export default goldCopd
