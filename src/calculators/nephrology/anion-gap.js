const anionGap = {
  id:'anion-gap',
  name:'Serum Anion Gap',
  shortName:'Anion Gap',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Calculates the serum anion gap without potassium.',
  keywords:['anion gap','metabolic acidosis'],

  inputs:[
    {id:'na',label:'Sodium',type:'number',unit:'mEq/L',min:80,max:220,step:0.1},
    {id:'cl',label:'Chloride',type:'number',unit:'mEq/L',min:50,max:180,step:0.1},
    {id:'hco3',label:'Bicarbonate',type:'number',unit:'mEq/L',min:5,max:60,step:0.1},
    {id:'albumin',label:'Albumin',type:'number',unit:'g/dL',min:0.5,max:8,step:0.1}
  ],

  calculate(v){
    const ag=Number(v.na)-Number(v.cl)-Number(v.hco3)
    const corrected=ag+2.5*(4-Number(v.albumin))

    return {
      value:ag,
      displayValue:ag.toFixed(1),
      unit:'mEq/L',
      category:'Serum anion gap',
      interpretation:
        `Measured AG = ${ag.toFixed(1)} mEq/L; albumin-corrected AG = ${corrected.toFixed(1)} mEq/L.`,
      note:'Albumin is a major unmeasured anion. The albumin-corrected value can be useful when albumin is below the usual reference concentration.'
    }
  },

  references:['Serum anion gap equation','Albumin-corrected anion gap']
}

export default anionGap
