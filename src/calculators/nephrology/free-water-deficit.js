const freeWaterDeficit = {
  id:'free-water-deficit',
  name:'Free Water Deficit',
  shortName:'Free Water Deficit',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Estimates free water deficit in hypernatremia.',
  keywords:['free water deficit','hypernatremia'],

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
    {id:'weight',label:'Body weight',type:'number',unit:'kg',min:1,max:300,step:0.1},
    {id:'sodium',label:'Serum sodium',type:'number',unit:'mEq/L',min:140,max:220,step:0.1}
  ],

  calculate(v){
    const factor=v.sex==='female'?0.5:0.6
    const tbw=factor*Number(v.weight)
    const sodium=Number(v.sodium)
    const deficit=tbw*((sodium/140)-1)

    return {
      value:deficit,
      displayValue:deficit.toFixed(2),
      unit:'L',
      category:'Estimated free water deficit',
      interpretation:`Estimated free water deficit ≈ ${deficit.toFixed(2)} L.`,
      note:'This is an estimate, not a fluid prescription. Age, body composition, ongoing losses, volume status and the desired correction rate must be considered.'
    }
  },

  references:['Free-water deficit equation in hypernatremia']
}

export default freeWaterDeficit
