const cockcroftGault = {
  id:'cockcroft-gault',
  name:'Creatinine Clearance — Cockcroft-Gault',
  shortName:'Cockcroft-Gault',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Estimates creatinine clearance using the Cockcroft-Gault equation.',
  keywords:['Cockcroft-Gault','creatinine clearance','CrCl'],

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
    {id:'weight',label:'Body weight',type:'number',unit:'kg',min:1,max:300,step:0.1},
    {id:'creatinine',label:'Serum creatinine',type:'number',unit:'mg/dL',min:0.1,max:20,step:0.01}
  ],

  calculate(v){
    const age=Number(v.age)
    const weight=Number(v.weight)
    const cr=Number(v.creatinine)

    if(!age||!weight||!cr||cr<=0)
      return {error:'Complete all inputs.'}

    const value=((140-age)*weight)/(72*cr)*
      (v.sex==='female'?0.85:1)

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'mL/min',
      category:'Estimated creatinine clearance',
      interpretation:`Estimated CrCl = ${value.toFixed(1)} mL/min.`,
      note:'Cockcroft-Gault estimates creatinine clearance and is not the same as race-free CKD-EPI eGFR. Weight selection may require clinical judgment, particularly with obesity or edema.'
    }
  },

  references:['Cockcroft-Gault equation']
}

export default cockcroftGault
