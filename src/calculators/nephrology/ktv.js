const ktv = {
  id:'ktv',
  name:'Single-Pool Kt/V',
  shortName:'Kt/V',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Daugirdas II single-pool Kt/V estimate for hemodialysis.',
  keywords:['Kt/V','dialysis','hemodialysis'],

  inputs:[
    {id:'pre',label:'Pre-dialysis BUN',type:'number',unit:'mg/dL',min:1,max:300,step:0.1},
    {id:'post',label:'Post-dialysis BUN',type:'number',unit:'mg/dL',min:0.1,max:300,step:0.1},
    {id:'time',label:'Dialysis time',type:'number',unit:'hours',min:1,max:12,step:0.1},
    {id:'uf',label:'Ultrafiltration volume',type:'number',unit:'L',min:0,max:20,step:0.1},
    {id:'v',label:'Post-dialysis urea distribution volume (V)',type:'number',unit:'L',min:1,max:100,step:0.1}
  ],

  calculate(v){
    const pre=Number(v.pre)
    const post=Number(v.post)
    const t=Number(v.time)
    const uf=Number(v.uf)
    const volume=Number(v.v)

    if(post<=0||pre<=0||post>=pre||volume<=0)
      return {error:'Check pre/post BUN and volume inputs.'}

    const ratio=post/pre
    const ktv=
      -Math.log(ratio-0.008*t)+
      (4-3.5*ratio)*(uf/volume)

    return {
      value:ktv,
      displayValue:ktv.toFixed(2),
      unit:'Kt/V',
      category:'Dialysis adequacy',
      interpretation:`Single-pool Kt/V ≈ ${ktv.toFixed(2)}.`,
      note:'For conventional thrice-weekly hemodialysis, KDOQI/NKF commonly uses a delivered spKt/V target around 1.2 or higher; adequacy assessment should follow the applicable dialysis prescription and guideline framework.'
    }
  },

  references:['Daugirdas II Kt/V equation','National Kidney Foundation dialysis adequacy guidance']
}

export default ktv
