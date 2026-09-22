const ich = {
  id:'ich',
  name:'ICH Score',
  shortName:'ICH Score',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'Original Intracerebral Hemorrhage Score.',
  keywords:['ICH score','intracerebral hemorrhage'],

  inputs:[
    {id:'gcs',label:'GCS',type:'number',unit:'points',min:3,max:15,step:1},
    {id:'age',label:'Age',type:'number',unit:'years',min:18,max:120,step:1},
    {id:'volume',label:'ICH volume',type:'number',unit:'mL',min:0,max:300,step:1},
    {id:'ivh',label:'Intraventricular hemorrhage',type:'boolean'},
    {
      id:'location',
      label:'Infratentorial origin',
      type:'boolean'
    }
  ],

  calculate(v){
    const gcs=Number(v.gcs)
    const age=Number(v.age)
    const volume=Number(v.volume)

    let score=0

    if(gcs>=3&&gcs<=4) score+=2
    else if(gcs>=5&&gcs<=12) score+=1

    if(age>=80) score+=1
    if(volume>=30) score+=1
    if(v.ivh===true) score+=1
    if(v.location===true) score+=1

    return {
      value:score,
      displayValue:String(score),
      unit:'/6',
      category:'ICH severity score',
      interpretation:`ICH Score = ${score}/6.`,
      note:'The ICH Score is a prognostic severity score. It should not be used as a stand-alone prediction of an individual patient’s outcome or to determine limitation of care.'
    }
  },

  references:['Hemphill et al. The ICH Score']
}

export default ich
