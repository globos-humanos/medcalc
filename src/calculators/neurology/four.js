const four = {
  id:'four',
  name:'FOUR Score',
  shortName:'FOUR',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'Full Outline of UnResponsiveness score assessing eye, motor, brainstem and respiration.',
  keywords:['FOUR','coma','consciousness'],

  inputs:[
    {id:'eye',label:'Eye response',type:'choice',options:[
      {value:4,label:'4 — Eyelids open or opened, tracking or blinking to command'},
      {value:3,label:'3 — Eyelids open, but not tracking'},
      {value:2,label:'2 — Eyelids closed, opened to loud voice'},
      {value:1,label:'1 — Eyelids closed, opened to pain'},
      {value:0,label:'0 — Eyelids remain closed with pain'}
    ],optionsLayout:'stack'},

    {id:'motor',label:'Motor response',type:'choice',options:[
      {value:4,label:'4 — Thumbs up, fist or peace sign'},
      {value:3,label:'3 — Localizes to pain'},
      {value:2,label:'2 — Flexion response to pain'},
      {value:1,label:'1 — Extension response to pain'},
      {value:0,label:'0 — No response to pain'}
    ],optionsLayout:'stack'},

    {id:'brainstem',label:'Brainstem reflexes',type:'choice',options:[
      {value:4,label:'4 — Pupil and corneal reflexes present'},
      {value:3,label:'3 — One pupil wide and fixed'},
      {value:2,label:'2 — Pupil or corneal reflex absent'},
      {value:1,label:'1 — Pupil and corneal reflexes absent'},
      {value:0,label:'0 — Pupil, corneal and cough reflexes absent'}
    ],optionsLayout:'stack'},

    {id:'respiration',label:'Respiration',type:'choice',options:[
      {value:4,label:'4 — Not intubated, regular breathing pattern'},
      {value:3,label:'3 — Not intubated, Cheyne-Stokes pattern'},
      {value:2,label:'2 — Not intubated, irregular breathing'},
      {value:1,label:'1 — Breathes above ventilator rate'},
      {value:0,label:'0 — Breathes at ventilator rate or apnea'}
    ],optionsLayout:'stack'}
  ],

  calculate(v){
    const score=
      Number(v.eye)+
      Number(v.motor)+
      Number(v.brainstem)+
      Number(v.respiration)

    return {
      value:score,
      displayValue:String(score),
      unit:'/16',
      category:'FOUR Score',
      interpretation:`FOUR Score = ${score}/16.`,
      note:'FOUR Score provides neurologic assessment without requiring a verbal response and may be useful in intubated patients.'
    }
  },

  references:['Wijdicks et al. FOUR Score']
}

export default four
