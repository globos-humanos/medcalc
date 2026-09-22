const kfre = {
  id:'kfre',
  name:'Kidney Failure Risk Equation',
  shortName:'KFRE',
  type:'score',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Kidney Failure Risk Equation input framework for CKD G3–G5.',
  keywords:['KFRE','kidney failure risk','CKD','ACR','eGFR'],

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
    {id:'egfr',label:'eGFR',type:'number',unit:'mL/min/1.73 m²',min:1,max:120,step:0.1},
    {id:'acr',label:'Urine ACR',type:'number',unit:'mg/g',min:0.1,max:30000,step:0.1}
  ],

  calculate(v){
    return {
      value:'Input set',
      displayValue:'KFRE inputs ready',
      category:'Validated KFRE model required',
      interpretation:'Age, sex, eGFR and urine ACR have been entered.',
      note:'The validated 4-variable KFRE estimates 2- and 5-year treated kidney-failure risk in appropriate CKD populations. Exact probability calculation requires the validated KFRE equation/calibration for the applicable population; MedCalc does not fabricate a probability from an unverified coefficient set.'
    }
  },

  references:['Kidney Failure Risk Equation','kidneyfailurerisk.com']
}

export default kfre
