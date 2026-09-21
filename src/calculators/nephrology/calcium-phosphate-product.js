const calciumPhosphate = {
  id: 'calciumPhosphate',
  name: 'Calcium–Phosphate Product',
  shortName: 'Calcium–Phosphate Product',
  type: 'score',
  categoryId: 'nephrology',
  category: 'Nephrology',
  description: 'Calcium–Phosphate Product from the MedCalc master calculator catalogue.',
  keywords: ['Calcium–Phosphate Product', 'Nephrology'],
  aliases: ['Calcium–Phosphate Product'],
  inputs: [{id:'calcium',label:'Calcium',type:'number',unit:'mg/dL',min:0,step:0.1},{id:'phosphate',label:'Phosphate',type:'number',unit:'mg/dL',min:0,step:0.1}],
  calculate(values) {
    const c=Number(values.calcium),p=Number(values.phosphate); if(![c,p].every(Number.isFinite)) return {error:'Enter calcium and phosphate.'}
    const v=c*p; return {value:v,displayValue:v.toFixed(1),unit:'mg²/dL²',category:'Ca × phosphate product'}
  },
  references: ['Standard renal/electrolyte equation reference.']
}

export default calciumPhosphate
