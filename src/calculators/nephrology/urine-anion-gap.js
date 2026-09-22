const urineAnionGap = {
  id:'urine-anion-gap',
  name:'Urine Anion Gap',
  shortName:'UAG',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Urinary sodium plus potassium minus urinary chloride.',
  keywords:['urine anion gap','UAG','metabolic acidosis'],

  inputs:[
    {id:'na',label:'Urine sodium',type:'number',unit:'mmol/L',min:0,step:0.1},
    {id:'k',label:'Urine potassium',type:'number',unit:'mmol/L',min:0,step:0.1},
    {id:'cl',label:'Urine chloride',type:'number',unit:'mmol/L',min:0,step:0.1}
  ],

  calculate(v){
    const value=Number(v.na)+Number(v.k)-Number(v.cl)

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'mEq/L',
      category:
        value<0?'Negative UAG':
        value>0?'Positive UAG':
        'Zero UAG',
      interpretation:`Urine anion gap = ${value.toFixed(1)} mEq/L.`,
      note:'UAG is mainly used as an indirect marker of urinary ammonium excretion in selected metabolic acidosis settings and has important limitations.'
    }
  },

  references:['Urine anion gap framework']
}

export default urineAnionGap
