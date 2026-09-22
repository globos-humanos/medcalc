const mdrd = {
  id:'mdrd',
  name:'eGFR — MDRD',
  shortName:'MDRD',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Four-variable re-expressed MDRD equation using standardized creatinine.',
  keywords:['MDRD','eGFR','kidney function'],

  inputs:[
    {
      id:'sex',
      label:'Sex',
      type:'choice',
      options:[
        {value:'male',label:'Male'},
        {value:'female',label:'Female'}
      ],
      optionsLayout:'stack'
    },
    {id:'age',label:'Age',type:'number',unit:'years',min:18,max:120,step:1},
    {id:'creatinine',label:'Serum creatinine',type:'number',unit:'mg/dL',min:0.1,max:20,step:0.01}
  ],

  calculate(v){
    const age=Number(v.age)
    const cr=Number(v.creatinine)

    if(age<18||cr<=0)
      return {error:'Enter valid adult age and creatinine.'}

    const value=
      175*
      Math.pow(cr,-1.154)*
      Math.pow(age,-0.203)*
      (v.sex==='female'?0.742:1)

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'mL/min/1.73 m²',
      category:'MDRD eGFR',
      interpretation:`MDRD eGFR = ${value.toFixed(1)} mL/min/1.73 m².`,
      note:'MDRD is a legacy eGFR equation and is less accurate at higher GFR values. This implementation does not use a race coefficient.'
    }
  },

  references:['Re-expressed MDRD Study equation','National Kidney Foundation']
}

export default mdrd
