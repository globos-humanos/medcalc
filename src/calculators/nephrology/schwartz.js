const schwartz = {
  id:'schwartz',
  name:'Bedside Schwartz eGFR',
  shortName:'Schwartz',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Bedside Schwartz equation for pediatric estimated GFR.',
  keywords:['Schwartz','pediatric eGFR','children'],

  inputs:[
    {id:'height',label:'Height',type:'number',unit:'cm',min:40,max:220,step:0.1},
    {id:'creatinine',label:'Serum creatinine',type:'number',unit:'mg/dL',min:0.1,max:15,step:0.01}
  ],

  calculate(v){
    const height=Number(v.height)
    const cr=Number(v.creatinine)

    if(height<=0||cr<=0)
      return {error:'Complete all inputs.'}

    const value=0.413*(height/cr)

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'mL/min/1.73 m²',
      category:'Estimated pediatric GFR',
      interpretation:`Estimated GFR = ${value.toFixed(1)} mL/min/1.73 m².`,
      note:'Bedside Schwartz equation. Pediatric GFR estimation should use an equation validated for the patient population and laboratory creatinine assay.'
    }
  },

  references:['Schwartz et al. 2009 bedside equation']
}

export default schwartz
