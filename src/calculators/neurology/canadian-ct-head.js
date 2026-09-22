const canadianCtHead = {
  id:'canadian-ct-head',
  name:'Canadian CT Head Rule',
  shortName:'Canadian CT Head',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'Clinical decision rule for CT imaging in selected adults with minor head injury.',
  keywords:['Canadian CT Head Rule','head injury','CT'],

  inputs:[
    {id:'gcs',label:'GCS',type:'number',min:3,max:15,step:1},
    {id:'age65',label:'Age ≥65 years',type:'boolean'},
    {id:'vomiting',label:'≥2 episodes of vomiting',type:'boolean'},
    {id:'amnesia',label:'Retrograde amnesia ≥30 minutes',type:'boolean'},
    {id:'dangerous',label:'Dangerous mechanism',type:'boolean'},
    {id:'skullFracture',label:'Suspected open/depressed skull fracture',type:'boolean'},
    {id:'basalFracture',label:'Signs of basal skull fracture',type:'boolean'},
    {id:'neuro',label:'Focal neurological deficit',type:'boolean'},
    {id:'gcs2h',label:'GCS <15 at 2 hours after injury',type:'boolean'}
  ],

  calculate(v){
    const high=
      v.skullFracture||
      v.basalFracture||
      v.neuro||
      v.gcs2h||
      v.age65

    const medium=
      v.amnesia||
      v.vomiting||
      v.dangerous

    return {
      value:high||medium?'Positive criteria':'No listed criteria',
      displayValue:high||medium?'CT criteria present':'No criteria present',
      unit:'CCHR',
      category:high?'High-risk feature present':medium?'Medium-risk feature present':'No listed CCHR feature',
      interpretation:
        high
          ?'At least one high-risk feature is present.'
          :medium
            ?'At least one medium-risk feature is present.'
            :'No listed Canadian CT Head Rule criterion is present.',
      note:'The Canadian CT Head Rule has specific inclusion/exclusion criteria and should not be applied indiscriminately to every head-injury patient. Apply the original validated population and rule definitions.'
    }
  },

  references:['Stiell et al. Canadian CT Head Rule']
}

export default canadianCtHead
