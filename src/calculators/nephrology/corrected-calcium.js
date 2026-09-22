const correctedCalcium = {
  id:'corrected-calcium',
  name:'Corrected Calcium',
  shortName:'Corrected Ca',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Albumin-adjusted total serum calcium.',
  keywords:['corrected calcium','albumin','calcium'],

  inputs:[
    {id:'calcium',label:'Measured total calcium',type:'number',unit:'mg/dL',min:2,max:20,step:0.1},
    {id:'albumin',label:'Albumin',type:'number',unit:'g/dL',min:0.5,max:8,step:0.1}
  ],

  calculate(v){
    const ca=Number(v.calcium)
    const albumin=Number(v.albumin)

    const value=ca+0.8*(4-albumin)

    return {
      value,
      displayValue:value.toFixed(2),
      unit:'mg/dL',
      category:'Albumin-corrected calcium',
      interpretation:`Corrected calcium ≈ ${value.toFixed(2)} mg/dL.`,
      note:'Albumin correction is an estimate. Ionized calcium may be preferable when clinically important calcium abnormalities are suspected.'
    }
  },

  references:['Albumin-corrected calcium equation']
}

export default correctedCalcium
