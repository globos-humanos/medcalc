const seattleHf = {
  id: 'seattleHf',
  name: 'Seattle Heart Failure Model',
  shortName: 'Seattle Heart Failure Model',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Seattle Heart Failure Model from the MedCalc master calculator catalogue.',
  keywords: ['Seattle Heart Failure Model', 'Cardiology'],
  aliases: ['Seattle Heart Failure Model'],
  inputs: [{id:'survival',label:'Validated model output',type:'number',min:0,step:0.1}],
  calculate(values) {
    const v=Number(values.survival); if(!Number.isFinite(v)) return {error:'Enter validated Seattle HF Model output.'}
    return {value:v,displayValue:String(v),unit:'model output',category:'Seattle HF Model'}
  },
  references: ['Original validated cardiovascular risk model publication.']
}

export default seattleHf
