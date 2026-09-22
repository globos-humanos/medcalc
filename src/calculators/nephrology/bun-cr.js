const bunCr = {
  id:'bun-cr',
  name:'BUN / Creatinine Ratio',
  shortName:'BUN/Cr Ratio',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Ratio of blood urea nitrogen to serum creatinine.',
  keywords:['BUN creatinine ratio','BUN/Cr'],

  inputs:[
    {id:'bun',label:'BUN',type:'number',unit:'mg/dL',min:0,max:300,step:0.1},
    {id:'creatinine',label:'Serum creatinine',type:'number',unit:'mg/dL',min:0.1,max:20,step:0.01}
  ],

  calculate(v){
    const value=Number(v.bun)/Number(v.creatinine)

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'ratio',
      category:'BUN / creatinine ratio',
      interpretation:`BUN/Cr ratio = ${value.toFixed(1)}.`,
      note:'The ratio is nonspecific and must be interpreted with volume status, gastrointestinal bleeding, protein intake, catabolic state, medications and renal function.'
    }
  },

  references:['BUN/creatinine ratio']
}

export default bunCr
