const ttkg = {
  id:'ttkg',
  name:'Transtubular Potassium Gradient',
  shortName:'TTKG',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Traditional transtubular potassium gradient calculation.',
  keywords:['TTKG','potassium','renal potassium handling'],

  inputs:[
    {id:'urineK',label:'Urine potassium',type:'number',unit:'mmol/L',min:0,step:0.1},
    {id:'serumK',label:'Serum potassium',type:'number',unit:'mmol/L',min:0.5,max:15,step:0.1},
    {id:'urineOsm',label:'Urine osmolality',type:'number',unit:'mOsm/kg',min:50,max:2000,step:1},
    {id:'serumOsm',label:'Serum osmolality',type:'number',unit:'mOsm/kg',min:150,max:400,step:1}
  ],

  calculate(v){
    const uk=Number(v.urineK)
    const sk=Number(v.serumK)
    const uo=Number(v.urineOsm)
    const so=Number(v.serumOsm)

    const value=(uk/sk)/(uo/so)

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'gradient',
      category:'TTKG',
      interpretation:`TTKG ≈ ${value.toFixed(1)}.`,
      note:'TTKG is a traditional calculation with important physiologic assumptions and limitations. It should not be treated as an independent diagnostic test of renal potassium handling.'
    }
  },

  references:['Traditional TTKG equation']
}

export default ttkg
