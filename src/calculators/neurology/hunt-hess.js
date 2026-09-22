const huntHess = {
  id:'hunt-hess',
  name:'Hunt & Hess Grade',
  shortName:'Hunt & Hess',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'Clinical grading system for subarachnoid hemorrhage severity.',
  keywords:['Hunt Hess','SAH','subarachnoid hemorrhage'],

  inputs:[
    {
      id:'grade',
      label:'Clinical grade',
      type:'choice',
      options:[
        {value:1,label:'Grade I — Asymptomatic or mild headache and slight nuchal rigidity'},
        {value:2,label:'Grade II — Moderate/severe headache, nuchal rigidity, no neurological deficit other than cranial nerve palsy'},
        {value:3,label:'Grade III — Drowsiness/confusion or mild focal deficit'},
        {value:4,label:'Grade IV — Stupor, moderate/severe hemiparesis, possible early decerebrate rigidity'},
        {value:5,label:'Grade V — Deep coma, decerebrate rigidity'}
      ],
      optionsLayout:'stack'
    }
  ],

  calculate(v){
    const score=Number(v.grade)

    return {
      value:score,
      displayValue:String(score),
      unit:'grade',
      category:`Hunt & Hess Grade ${score}`,
      interpretation:`Hunt & Hess Grade ${score}.`,
      note:'The grade describes clinical severity in subarachnoid hemorrhage and should be interpreted alongside the neurological examination and imaging.'
    }
  },

  references:['Hunt and Hess grading system']
}

export default huntHess
