const ckdEpi = {
  id:'ckd-epi',
  name:'eGFR — CKD-EPI 2021',
  shortName:'CKD-EPI 2021',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Race-free 2021 CKD-EPI creatinine equation for adults.',
  keywords:['CKD-EPI','eGFR','kidney function'],

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
      return {error:'CKD-EPI 2021 is an adult equation. Enter valid age and creatinine.'}

    const female=v.sex==='female'
    const k=female?0.7:0.9
    const alpha=female?-0.241:-0.302
    const ratio=cr/k

    const value=
      142*
      Math.pow(Math.min(ratio,1),alpha)*
      Math.pow(Math.max(ratio,1),-1.2)*
      Math.pow(0.9938,age)*
      (female?1.012:1)

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'mL/min/1.73 m²',
      category:'eGFR',
      interpretation:`Estimated GFR = ${value.toFixed(1)} mL/min/1.73 m².`,
      note:'Race-free 2021 CKD-EPI creatinine equation. Requires standardized creatinine. eGFR equations are less reliable in non-steady-state kidney function such as acute kidney injury.'
    }
  },

  references:['Inker et al. 2021 CKD-EPI equation','National Kidney Foundation CKD-EPI 2021']
}

export default ckdEpi
