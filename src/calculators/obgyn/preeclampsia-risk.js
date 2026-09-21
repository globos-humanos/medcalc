const preeclampsiaRisk = {
  id: 'preeclampsiaRisk',
  name: 'Preeclampsia Risk Assessment',
  shortName: 'Preeclampsia Risk Assessment',
  type: 'score',
  categoryId: 'obgyn',
  category: 'Obstetrics & Gynecology',
  description: 'Preeclampsia Risk Assessment from the MedCalc master calculator catalogue.',
  keywords: ['Preeclampsia Risk Assessment', 'Obstetrics & Gynecology'],
  aliases: ['Preeclampsia Risk Assessment'],
  inputs: [{id:'riskFactors',label:'Number of major risk factors',type:'number',min:0,step:1}],
  calculate(values) {
    const s=Number(values.riskFactors); if(!Number.isFinite(s)) return {error:'Enter risk-factor count.'}
    return {value:s,displayValue:String(s),unit:'risk factors',category:s>0?'Risk factors present':'No entered major risk factors'}
  },
  references: ['Original obstetric/gynecologic model or classification publication.']
}

export default preeclampsiaRisk
