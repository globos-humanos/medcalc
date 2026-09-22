const deltaGap = {
  id:'delta-gap',
  name:'Delta Gap / Delta Ratio',
  shortName:'Delta Ratio',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Compares the rise in anion gap with the fall in bicarbonate.',
  keywords:['delta gap','delta ratio','anion gap'],

  inputs:[
    {id:'na',label:'Sodium',type:'number',unit:'mEq/L',min:80,max:220,step:0.1},
    {id:'cl',label:'Chloride',type:'number',unit:'mEq/L',min:50,max:180,step:0.1},
    {id:'hco3',label:'Bicarbonate',type:'number',unit:'mEq/L',min:5,max:60,step:0.1},
    {id:'normalAg',label:'Reference anion gap',type:'number',unit:'mEq/L',min:5,max:20,step:0.1},
    {id:'normalHco3',label:'Reference bicarbonate',type:'number',unit:'mEq/L',min:15,max:30,step:0.1}
  ],

  calculate(v){
    const ag=Number(v.na)-Number(v.cl)-Number(v.hco3)
    const delta=ag-Number(v.normalAg)
    const denominator=Number(v.normalHco3)-Number(v.hco3)

    if(denominator===0)
      return {error:'Reference bicarbonate and measured bicarbonate cannot produce a zero denominator.'}

    const ratio=delta/denominator

    return {
      value:ratio,
      displayValue:ratio.toFixed(2),
      unit:'ratio',
      category:'Delta ratio',
      interpretation:
        `AG = ${ag.toFixed(1)}; delta gap = ${delta.toFixed(1)}; delta ratio = ${ratio.toFixed(2)}.`,
      note:'Delta-ratio interpretation depends on the clinical context and the reference values selected.'
    }
  },

  references:['Delta gap / delta ratio framework']
}

export default deltaGap
