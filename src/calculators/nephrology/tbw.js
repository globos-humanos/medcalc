const tbw = {
  id:'tbw',
  name:'Total Body Water',
  shortName:'TBW',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Estimated total body water using standard sex-based coefficients.',
  keywords:['TBW','total body water','fluid'],

  inputs:[
    {
      id:'sex',
      label:'Sex',
      type:'choice',
      options:[
        {value:'male',label:'Male'},
        {value:'female',label:'Female'}
      ],
      optionsLayout:'stack'
    },
    {id:'weight',label:'Body weight',type:'number',unit:'kg',min:1,max:300,step:0.1}
  ],

  calculate(v){
    const factor=v.sex==='female'?0.5:0.6
    const value=factor*Number(v.weight)

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'L',
      category:'Estimated total body water',
      interpretation:`Estimated TBW ≈ ${value.toFixed(1)} L.`,
      note:'Standard coefficients are approximations. Age, body composition, obesity, dehydration and critical illness can materially change actual TBW.'
    }
  },

  references:['Standard total body water estimation']
}

export default tbw
