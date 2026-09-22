const gcs = {
  id:'gcs',
  name:'Glasgow Coma Scale',
  shortName:'GCS',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'Standardized assessment of eye, verbal and motor responses.',
  keywords:['GCS','Glasgow Coma Scale','consciousness'],

  inputs:[
    {id:'eye',label:'Eye opening',type:'choice',options:[
      {value:4,label:'4 — Spontaneous'},
      {value:3,label:'3 — To voice'},
      {value:2,label:'2 — To pressure'},
      {value:1,label:'1 — None'}
    ],optionsLayout:'stack'},

    {id:'verbal',label:'Verbal response',type:'choice',options:[
      {value:5,label:'5 — Oriented'},
      {value:4,label:'4 — Confused'},
      {value:3,label:'3 — Inappropriate words'},
      {value:2,label:'2 — Incomprehensible sounds'},
      {value:1,label:'1 — None'}
    ],optionsLayout:'stack'},

    {id:'motor',label:'Motor response',type:'choice',options:[
      {value:6,label:'6 — Obeys commands'},
      {value:5,label:'5 — Localizes'},
      {value:4,label:'4 — Normal flexion'},
      {value:3,label:'3 — Abnormal flexion'},
      {value:2,label:'2 — Extension'},
      {value:1,label:'1 — None'}
    ],optionsLayout:'stack'}
  ],

  calculate(v){
    const eye=Number(v.eye)
    const verbal=Number(v.verbal)
    const motor=Number(v.motor)

    const score=eye+verbal+motor

    return {
      value:score,
      displayValue:String(score),
      unit:'/15',
      category:
        score>=13?'Mild impairment range':
        score>=9?'Moderate impairment range':
        'Severe impairment range',
      interpretation:`GCS = ${score}/15 (E${eye} V${verbal} M${motor}).`,
      note:'Record the individual E, V and M components as well as the total. Intubation, sedation, aphasia and other factors can limit interpretation.'
    }
  },

  references:['Teasdale and Jennett. Glasgow Coma Scale']
}

export default gcs
