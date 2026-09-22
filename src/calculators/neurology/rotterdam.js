const rotterdam = {
  id:'rotterdam',
  name:'Rotterdam CT Score',
  shortName:'Rotterdam CT',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'CT scoring system for traumatic brain injury prognosis.',
  keywords:['Rotterdam CT','TBI','traumatic brain injury'],

  inputs:[
    {
      id:'basalCisterns',
      label:'Basal cisterns',
      type:'choice',
      options:[
        {value:'normal',label:'Normal'},
        {value:'compressed',label:'Compressed'},
        {value:'absent',label:'Absent'}
      ],
      optionsLayout:'stack'
    },
    {
      id:'midline',
      label:'Midline shift',
      type:'choice',
      options:[
        {value:'none',label:'≤5 mm'},
        {value:'more5',label:'>5 mm'}
      ],
      optionsLayout:'stack'
    },
    {
      id:'epidural',
      label:'Epidural mass lesion',
      type:'choice',
      options:[
        {value:'present',label:'Present'},
        {value:'absent',label:'Absent'}
      ],
      optionsLayout:'stack'
    },
    {
      id:'ivh',
      label:'Intraventricular or traumatic subarachnoid hemorrhage',
      type:'choice',
      options:[
        {value:'present',label:'Present'},
        {value:'absent',label:'Absent'}
      ],
      optionsLayout:'stack'
    }
  ],

  calculate(v){
    let score=1

    if(v.basalCisterns==='compressed') score+=1
    if(v.basalCisterns==='absent') score+=2
    if(v.midline==='more5') score+=1
    if(v.epidural==='absent') score+=1
    if(v.ivh==='present') score+=1

    return {
      value:score,
      displayValue:String(score),
      unit:'points',
      category:'Rotterdam CT Score',
      interpretation:`Rotterdam CT Score = ${score}.`,
      note:'The Rotterdam score is based on specific CT findings. This implementation captures the core CT variables; prognosis should not be inferred from the score alone.'
    }
  },

  references:['Maas et al. Rotterdam CT scoring system']
}

export default rotterdam
