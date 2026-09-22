const calciumPhosphate = {
  id:'calcium-phosphate-product',
  name:'Calcium–Phosphate Product',
  shortName:'Ca × P',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Product of serum calcium and phosphate concentrations.',
  keywords:['calcium phosphate product','CKD-MBD'],

  inputs:[
    {id:'calcium',label:'Calcium',type:'number',unit:'mg/dL',min:0,max:20,step:0.1},
    {id:'phosphate',label:'Phosphate',type:'number',unit:'mg/dL',min:0,max:20,step:0.1}
  ],

  calculate(v){
    const value=Number(v.calcium)*Number(v.phosphate)

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'mg²/dL²',
      category:'Calcium × phosphate product',
      interpretation:`Ca × P = ${value.toFixed(1)} mg²/dL².`,
      note:'The calcium-phosphate product is a derived laboratory measure and should not be interpreted as a standalone treatment target.'
    }
  },

  references:['Calcium-phosphate product']
}

export default calciumPhosphate
