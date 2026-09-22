const fek = {
  id:'fek',
  name:'Fractional Excretion of Potassium',
  shortName:'FEK',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Fractional excretion of potassium.',
  keywords:['FEK','potassium','renal potassium handling'],

  inputs:[
    {id:'urineK',label:'Urine potassium',type:'number',unit:'mmol/L',min:0,step:0.1},
    {id:'serumK',label:'Serum potassium',type:'number',unit:'mmol/L',min:0.5,max:15,step:0.1},
    {id:'urineCr',label:'Urine creatinine',type:'number',unit:'mg/dL',min:0.1,step:0.1},
    {id:'serumCr',label:'Serum creatinine',type:'number',unit:'mg/dL',min:0.1,step:0.01}
  ],

  calculate(v){
    const value=
      100*
      (Number(v.urineK)*Number(v.serumCr))/
      (Number(v.serumK)*Number(v.urineCr))

    return {
      value,
      displayValue:value.toFixed(2),
      unit:'%',
      category:'Fractional potassium excretion',
      interpretation:`FEK = ${value.toFixed(2)}%.`,
      note:'Interpret FEK together with serum potassium, acid-base status, urine flow, medications and renal function.'
    }
  },

  references:['Fractional excretion of potassium equation']
}

export default fek
