const alveolarGas = {
  id: 'alveolarGas',
  name: 'Alveolar Gas Equation',
  shortName: 'Alveolar Gas Equation',
  type: 'score',
  categoryId: 'respiratory',
  category: 'Respiratory',
  description: 'Alveolar Gas Equation from the MedCalc master calculator catalogue.',
  keywords: ['Alveolar Gas Equation', 'Respiratory'],
  aliases: ['Alveolar Gas Equation'],
  inputs: [{id:'fio2',label:'FiO₂',type:'number',min:0,max:1,step:0.01},{id:'patm',label:'Atmospheric pressure',type:'number',unit:'mmHg',step:1},{id:'ph2o',label:'Water vapor pressure',type:'number',unit:'mmHg',step:1},{id:'paco2',label:'PaCO₂',type:'number',unit:'mmHg',step:1},{id:'rq',label:'Respiratory quotient',type:'number',step:0.01}],
  calculate(values) {
    const f=Number(values.fio2),p=Number(values.patm),w=Number(values.ph2o),c=Number(values.paco2),r=Number(values.rq)
    if(![f,p,w,c,r].every(Number.isFinite)||r<=0) return {error:'Complete alveolar gas equation inputs.'}
    const v=f*(p-w)-c/r; return {value:v,displayValue:v.toFixed(1),unit:'mmHg',category:'Estimated PAO₂'}
  },
  references: ['Original validated respiratory/PE score publication.']
}

export default alveolarGas
