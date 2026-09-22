const urr = {
  id:'urr',
  name:'Urea Reduction Ratio',
  shortName:'URR',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Percentage reduction in BUN across a hemodialysis session.',
  keywords:['URR','dialysis','BUN'],

  inputs:[
    {id:'pre',label:'Pre-dialysis BUN',type:'number',unit:'mg/dL',min:1,max:300,step:0.1},
    {id:'post',label:'Post-dialysis BUN',type:'number',unit:'mg/dL',min:0.1,max:300,step:0.1}
  ],

  calculate(v){
    const pre=Number(v.pre)
    const post=Number(v.post)

    if(pre<=0||post<0||post>pre)
      return {error:'Post-dialysis BUN must not exceed pre-dialysis BUN.'}

    const value=(1-post/pre)*100

    return {
      value,
      displayValue:value.toFixed(1),
      unit:'%',
      category:'Urea reduction ratio',
      interpretation:`URR = ${value.toFixed(1)}%.`,
      note:'For conventional hemodialysis, URR around 65% or higher is commonly used as a minimum adequacy benchmark. Kt/V provides a more complete dialysis-dose measure.'
    }
  },

  references:['Urea reduction ratio','National Kidney Foundation dialysis adequacy guidance']
}

export default urr
