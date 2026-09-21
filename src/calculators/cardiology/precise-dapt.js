const preciseDapt = {
  id: 'preciseDapt',
  name: 'PRECISE-DAPT',
  shortName: 'PRECISE-DAPT',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'PRECISE-DAPT from the MedCalc master calculator catalogue.',
  keywords: ['PRECISE-DAPT', 'Cardiology'],
  aliases: ['PRECISE-DAPT'],
  inputs: [{id:'score',label:'PRECISE-DAPT score',type:'number',min:0,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter PRECISE-DAPT score.'}
    return {value:s,displayValue:String(s),unit:'points',category:s>=25?'High bleeding-risk score':'Lower bleeding-risk score'}
  },
  references: ['Original validated cardiovascular risk model publication.']
}

export default preciseDapt
