const ktv = {
  id: 'ktv',
  name: 'Kt/V Dialysis Adequacy',
  shortName: 'Kt/V Dialysis Adequacy',
  type: 'score',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Kt/V Dialysis Adequacy from the MedCalc master calculator catalogue.',
  keywords: ['Kt/V Dialysis Adequacy', 'Nephrology'],
  aliases: ['Kt/V Dialysis Adequacy'],
  inputs: [{id:'preBun',label:'Pre-dialysis BUN',type:'number',unit:'mg/dL',step:0.1},{id:'postBun',label:'Post-dialysis BUN',type:'number',unit:'mg/dL',step:0.1},{id:'weight',label:'Post-dialysis weight',type:'number',unit:'kg',min:0,step:0.1},{id:'ultrafiltration',label:'Ultrafiltration volume',type:'number',unit:'L',min:0,step:0.01},{id:'v',label:'Post-dialysis urea distribution volume',type:'number',unit:'L',min:0,step:0.1},{id:'t',label:'Dialysis duration',type:'hours',min:0,step:0.1}],
  calculate(values) {
    const pre=Number(values.preBun),post=Number(values.postBun),uf=Number(values.ultrafiltration),v=Number(values.v),t=Number(values.t)
    if(![pre,post,uf,v,t].every(Number.isFinite)||pre<=0||post<=0||v<=0||t<=0) return {error:'Complete Kt/V inputs.'}
    const r=post/pre, ktv=-Math.log(r-0.008*t)+(4-3.5*r)*uf/v
    return {value:ktv,displayValue:ktv.toFixed(2),unit:'Kt/V',category:'Dialysis adequacy'}
  },
  references: ['Standard renal/electrolyte equation reference.']
}

export default ktv
