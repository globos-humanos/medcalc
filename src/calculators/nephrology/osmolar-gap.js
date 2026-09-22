const osmolarGap = {
  id:'osmolar-gap',
  name:'Osmolar Gap',
  shortName:'Osmolar Gap',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Difference between measured serum osmolality and calculated serum osmolality.',
  keywords:['osmolar gap','toxic alcohol','osmolality'],

  inputs:[
    {id:'measured',label:'Measured serum osmolality',type:'number',unit:'mOsm/kg',min:150,max:500,step:0.1},
    {id:'sodium',label:'Sodium',type:'number',unit:'mEq/L',min:80,max:220,step:0.1},
    {id:'glucose',label:'Glucose',type:'number',unit:'mg/dL',min:20,max:1000,step:1},
    {id:'bun',label:'BUN',type:'number',unit:'mg/dL',min:0,max:300,step:0.1}
  ],

  calculate(v){
    const measured=Number(v.measured)

    const calculated=
      2*Number(v.sodium)+
      Number(v.glucose)/18+
      Number(v.bun)/2.8

    const value=measured-calculated

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'mOsm/kg',
      category:'Osmolar gap',
      interpretation:`Osmolar gap ≈ ${value.toFixed(1)} mOsm/kg.`,
      note:'An elevated osmolar gap is nonspecific and should be interpreted with the clinical context, timing and possible exogenous osmoles.'
    }
  },

  references:['Calculated serum osmolality and osmolar gap']
}

export default osmolarGap
