const mrs = {
  id:'mrs',
  name:'Modified Rankin Scale',
  shortName:'mRS',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'Functional disability scale commonly used after stroke.',
  keywords:['mRS','modified Rankin','stroke disability'],

  inputs:[
    {
      id:'score',
      label:'Functional status',
      type:'choice',
      options:[
        {value:0,label:'0 — No symptoms'},
        {value:1,label:'1 — No significant disability; able to carry out usual activities'},
        {value:2,label:'2 — Slight disability; unable to perform all previous activities but independent'},
        {value:3,label:'3 — Moderate disability; requires some help but able to walk independently'},
        {value:4,label:'4 — Moderately severe disability; unable to walk or attend to bodily needs without assistance'},
        {value:5,label:'5 — Severe disability; bedridden, incontinent, requires constant care'},
        {value:6,label:'6 — Death'}
      ],
      optionsLayout:'stack'
    }
  ],

  calculate(v){
    const score=Number(v.score)

    return {
      value:score,
      displayValue:String(score),
      unit:'mRS',
      category:
        score===0?'No symptoms':
        score<=2?'Functionally independent range':
        score<=5?'Dependent range':
        'Death',
      interpretation:`Modified Rankin Scale = ${score}.`,
      note:'mRS is a global functional outcome scale. Structured assessment and standardized interviewing can improve inter-rater reliability.'
    }
  },

  references:['Modified Rankin Scale']
}

export default mrs
