const correctedSodium = {
  id:'corrected-sodium',
  name:'Corrected Sodium for Hyperglycemia',
  shortName:'Corrected Na',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Estimates sodium corrected for hyperglycemia using the 1.6 mEq/L correction per 100 mg/dL glucose above 100.',
  keywords:['corrected sodium','hyperglycemia','glucose'],

  inputs:[
    {id:'sodium',label:'Measured sodium',type:'number',unit:'mEq/L',min:80,max:220,step:0.1},
    {id:'glucose',label:'Glucose',type:'number',unit:'mg/dL',min:40,max:1000,step:1}
  ],

  calculate(v){
    const na=Number(v.sodium)
    const glucose=Number(v.glucose)

    const correction=0.016*(glucose-100)
    const value=na+correction

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'mEq/L',
      category:'Glucose-corrected sodium',
      interpretation:`Corrected sodium ≈ ${value.toFixed(1)} mEq/L.`,
      note:'Uses a 1.6 mEq/L sodium change per 100 mg/dL glucose above 100 mg/dL. Alternative correction factors are published; clinical interpretation should consider the glucose level and overall context.'
    }
  },

  references:['Hyperglycemia-associated sodium correction framework']
}

export default correctedSodium
