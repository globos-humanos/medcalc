const qrisk3 = {
  id: 'qrisk3',
  name: 'QRISK3',
  shortName: 'QRISK3',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'QRISK3 from the MedCalc master calculator catalogue.',
  keywords: ['QRISK3', 'Cardiology'],
  aliases: ['QRISK3'],
  inputs: [{id:'risk',label:'QRISK3 10-year risk',type:'number',min:0,max:100,step:0.1,unit:'%'}],
  calculate(values) {
    const risk=Number(values.risk); if(!Number.isFinite(risk)) return {error:'Enter QRISK3 model output.'}
    return {value:risk,displayValue:risk.toFixed(1),unit:'% 10-year risk',category:'QRISK3'}
  },
  references: ['Original validated cardiovascular risk model publication.']
}

export default qrisk3
