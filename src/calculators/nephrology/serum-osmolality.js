const serumOsmolality = {
  id:'serum-osmolality',
  name:'Calculated Serum Osmolality',
  shortName:'Serum Osmolality',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Calculated serum osmolality from sodium, glucose and BUN.',
  keywords:['serum osmolality','osmolality','osmolarity'],

  inputs:[
    {id:'sodium',label:'Sodium',type:'number',unit:'mEq/L',min:80,max:220,step:0.1},
    {id:'glucose',label:'Glucose',type:'number',unit:'mg/dL',min:20,max:1000,step:1},
    {id:'bun',label:'BUN',type:'number',unit:'mg/dL',min:0,max:300,step:0.1}
  ],

  calculate(v){
    const value=
      2*Number(v.sodium)+
      Number(v.glucose)/18+
      Number(v.bun)/2.8

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'mOsm/kg',
      category:'Calculated serum osmolality',
      interpretation:`Calculated serum osmolality ≈ ${value.toFixed(1)} mOsm/kg.`,
      note:'Calculated osmolality can be compared with measured osmolality when assessing an osmolar gap.'
    }
  },

  references:['Standard calculated serum osmolality equation']
}

export default serumOsmolality
