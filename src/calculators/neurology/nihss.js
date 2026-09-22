const nihss = {
  id:'nihss',
  name:'NIH Stroke Scale',
  shortName:'NIHSS',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'Structured neurological deficit assessment for acute stroke.',
  keywords:['NIHSS','stroke','neurological deficit'],

  inputs:[
    {id:'loc',label:'1a. Level of consciousness',type:'choice',options:[
      {value:0,label:'0 — Alert'},
      {value:1,label:'1 — Not alert; arousable by minor stimulation'},
      {value:2,label:'2 — Requires repeated stimulation'},
      {value:3,label:'3 — Responds only with reflex motor/autonomic effects or totally unresponsive'}
    ],optionsLayout:'stack'},

    {id:'locQuestions',label:'1b. LOC questions',type:'choice',options:[
      {value:0,label:'0 — Both correct'},
      {value:1,label:'1 — One correct'},
      {value:2,label:'2 — Neither correct'}
    ],optionsLayout:'stack'},

    {id:'commands',label:'1c. LOC commands',type:'choice',options:[
      {value:0,label:'0 — Both tasks correctly performed'},
      {value:1,label:'1 — One task correctly performed'},
      {value:2,label:'2 — Neither task correctly performed'}
    ],optionsLayout:'stack'},

    {id:'gaze',label:'2. Best gaze',type:'choice',options:[
      {value:0,label:'0 — Normal'},
      {value:1,label:'1 — Partial gaze palsy'},
      {value:2,label:'2 — Forced deviation or total gaze paresis'}
    ],optionsLayout:'stack'},

    {id:'visual',label:'3. Visual',type:'choice',options:[
      {value:0,label:'0 — No visual loss'},
      {value:1,label:'1 — Partial hemianopia'},
      {value:2,label:'2 — Complete hemianopia'},
      {value:3,label:'3 — Bilateral hemianopia/blindness'}
    ],optionsLayout:'stack'},

    {id:'face',label:'4. Facial palsy',type:'choice',options:[
      {value:0,label:'0 — Normal'},
      {value:1,label:'1 — Minor paralysis'},
      {value:2,label:'2 — Partial paralysis'},
      {value:3,label:'3 — Complete paralysis'}
    ],optionsLayout:'stack'},

    {id:'armLeft',label:'5a. Left arm',type:'choice',options:[
      {value:0,label:'0 — No drift'},
      {value:1,label:'1 — Drift'},
      {value:2,label:'2 — Some effort against gravity'},
      {value:3,label:'3 — No effort against gravity'},
      {value:4,label:'4 — No movement'}
    ],optionsLayout:'stack'},

    {id:'armRight',label:'5b. Right arm',type:'choice',options:[
      {value:0,label:'0 — No drift'},
      {value:1,label:'1 — Drift'},
      {value:2,label:'2 — Some effort against gravity'},
      {value:3,label:'3 — No effort against gravity'},
      {value:4,label:'4 — No movement'}
    ],optionsLayout:'stack'},

    {id:'legLeft',label:'6a. Left leg',type:'choice',options:[
      {value:0,label:'0 — No drift'},
      {value:1,label:'1 — Drift'},
      {value:2,label:'2 — Some effort against gravity'},
      {value:3,label:'3 — No effort against gravity'},
      {value:4,label:'4 — No movement'}
    ],optionsLayout:'stack'},

    {id:'legRight',label:'6b. Right leg',type:'choice',options:[
      {value:0,label:'0 — No drift'},
      {value:1,label:'1 — Drift'},
      {value:2,label:'2 — Some effort against gravity'},
      {value:3,label:'3 — No effort against gravity'},
      {value:4,label:'4 — No movement'}
    ],optionsLayout:'stack'},

    {id:'ataxia',label:'7. Limb ataxia',type:'choice',options:[
      {value:0,label:'0 — Absent'},
      {value:1,label:'1 — Present in one limb'},
      {value:2,label:'2 — Present in two limbs'}
    ],optionsLayout:'stack'},

    {id:'sensory',label:'8. Sensory',type:'choice',options:[
      {value:0,label:'0 — Normal'},
      {value:1,label:'1 — Mild-to-moderate sensory loss'},
      {value:2,label:'2 — Severe or total sensory loss'}
    ],optionsLayout:'stack'},

    {id:'language',label:'9. Best language',type:'choice',options:[
      {value:0,label:'0 — No aphasia'},
      {value:1,label:'1 — Mild-to-moderate aphasia'},
      {value:2,label:'2 — Severe aphasia'},
      {value:3,label:'3 — Mute/global aphasia'}
    ],optionsLayout:'stack'},

    {id:'dysarthria',label:'10. Dysarthria',type:'choice',options:[
      {value:0,label:'0 — Normal'},
      {value:1,label:'1 — Mild-to-moderate'},
      {value:2,label:'2 — Severe/anarthric'}
    ],optionsLayout:'stack'},

    {id:'extinction',label:'11. Extinction/inattention',type:'choice',options:[
      {value:0,label:'0 — No abnormality'},
      {value:1,label:'1 — Inattention/extinction in one modality'},
      {value:2,label:'2 — Profound hemi-inattention or extinction in more than one modality'}
    ],optionsLayout:'stack'}
  ],

  calculate(v){
    const ids=[
      'loc','locQuestions','commands','gaze','visual','face',
      'armLeft','armRight','legLeft','legRight','ataxia',
      'sensory','language','dysarthria','extinction'
    ]

    const score=ids.reduce((sum,id)=>sum+Number(v[id]||0),0)

    return {
      value:score,
      displayValue:String(score),
      unit:'/42',
      category:
        score===0?'No measurable deficit on NIHSS':
        score<=4?'Minor stroke severity range':
        score<=15?'Moderate stroke severity range':
        score<=24?'Moderate-to-severe range':
        'Severe stroke severity range',
      interpretation:`NIHSS = ${score}/42.`,
      note:'NIHSS quantifies neurological deficit but does not capture every clinically important stroke deficit, particularly some posterior-circulation findings. Use the standardized examination.'
    }
  },

  references:['National Institutes of Health Stroke Scale','AHA/ASA acute ischemic stroke guideline']
}

export default nihss
