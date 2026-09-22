const fisher = {
  id:'fisher',
  name:'Fisher Grade',
  shortName:'Fisher',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'CT-based Fisher grading of subarachnoid blood.',
  keywords:['Fisher','SAH','CT'],

  inputs:[
    {
      id:'pattern',
      label:'CT appearance',
      type:'choice',
      options:[
        {value:1,label:'Grade 1 — No blood detected'},
        {value:2,label:'Grade 2 — Diffuse thin SAH <1 mm'},
        {value:3,label:'Grade 3 — Localized clot and/or thick SAH ≥1 mm'},
        {value:4,label:'Grade 4 — Intracerebral or intraventricular clot with diffuse or absent SAH'}
      ],
      optionsLayout:'stack'
    }
  ],

  calculate(v){
    const score=Number(v.pattern)

    return {
      value:score,
      displayValue:String(score),
      unit:'grade',
      category:`Fisher Grade ${score}`,
      interpretation:`Fisher Grade ${score}.`,
      note:'Fisher grading is based on CT appearance of subarachnoid blood. Modified Fisher provides a different CT classification incorporating intraventricular hemorrhage.'
    }
  },

  references:['Fisher et al. CT grading of subarachnoid hemorrhage']
}

export default fisher
