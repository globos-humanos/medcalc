const ctsi = {
  id: 'ctsi',
  name: 'CT Severity Index',
  shortName: 'CT Severity Index',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description: 'CT Severity Index from the MedCalc master calculator catalogue.',
  keywords: ['CT Severity Index', 'Gastroenterology'],
  aliases: ['CT Severity Index'],
  inputs: [{id:'score',label:'CT Severity Index',type:'number',min:0,max:10,step:1}],
  calculate(values) {
    const s=Number(values.score); if(!Number.isFinite(s)) return {error:'Enter CTSI.'}
    return {value:s,displayValue:String(s),unit:'/ 10 points',category:s<=3?'Mild':s<=6?'Moderate':'Severe'}
  },
  references: ['Original validated gastroenterology score publication.']
}

export default ctsi
