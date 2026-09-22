const modifiedFisher = {
  id:'modified-fisher',
  name:'Modified Fisher Scale',
  shortName:'Modified Fisher',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'Modified CT grading of subarachnoid hemorrhage incorporating intraventricular hemorrhage.',
  keywords:['modified Fisher','SAH','IVH','CT'],

  inputs:[
    {
      id:'sah',
      label:'Subarachnoid hemorrhage',
      type:'choice',
      options:[
        {value:'none',label:'None'},
        {value:'thin',label:'Thin SAH'},
        {value:'thick',label:'Thick SAH'}
      ],
      optionsLayout:'stack'
    },
    {id:'ivh',label:'Intraventricular hemorrhage',type:'boolean'}
  ],

  calculate(v){
    let score=0

    if(v.sah==='thin'&&!v.ivh) score=1
    else if(v.sah==='thin'&&v.ivh) score=2
    else if(v.sah==='thick'&&!v.ivh) score=3
    else if(v.sah==='thick'&&v.ivh) score=4

    return {
      value:score,
      displayValue:String(score),
      unit:'grade',
      category:`Modified Fisher Grade ${score}`,
      interpretation:`Modified Fisher Grade ${score}.`,
      note:'Modified Fisher grading incorporates both subarachnoid blood thickness and intraventricular hemorrhage.'
    }
  },

  references:['Frisullo et al. Modified Fisher scale']
}

export default modifiedFisher
