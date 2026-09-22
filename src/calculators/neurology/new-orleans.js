const newOrleans = {
  id:'new-orleans',
  name:'New Orleans Criteria',
  shortName:'New Orleans Criteria',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'Clinical criteria used in selected adults with minor head injury and normal neurologic examination.',
  keywords:['New Orleans Criteria','head injury','CT'],

  inputs:[
    {id:'headache',label:'Headache',type:'boolean'},
    {id:'vomiting',label:'Vomiting',type:'boolean'},
    {id:'age60',label:'Age >60 years',type:'boolean'},
    {id:'intoxication',label:'Drug or alcohol intoxication',type:'boolean'},
    {id:'amnesia',label:'Persistent anterograde amnesia',type:'boolean'},
    {id:'seizure',label:'Seizure',type:'boolean'},
    {id:'trauma',label:'Visible trauma above the clavicles',type:'boolean'}
  ],

  calculate(v){
    const positive=[
      'headache',
      'vomiting',
      'age60',
      'intoxication',
      'amnesia',
      'seizure',
      'trauma'
    ].filter(k=>v[k]===true).length

    return {
      value:positive,
      displayValue:String(positive),
      unit:'criteria',
      category:positive>0?'New Orleans criterion present':'No listed criterion present',
      interpretation:
        positive>0
          ?`${positive} New Orleans criterion(s) present.`
          :'No listed New Orleans criterion present.',
      note:'The New Orleans Criteria apply to a specific minor-head-injury population and should be used only when the original rule inclusion criteria are satisfied.'
    }
  },

  references:['Haydel et al. Prediction of intracranial injury in patients with minor head injury']
}

export default newOrleans
