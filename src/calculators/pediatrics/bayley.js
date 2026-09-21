const bayley = {
  id: 'bayley',
  name: 'Bayley Scales',
  shortName: 'Bayley Scales',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'Bayley Scales from the MedCalc master calculator catalogue.',
  keywords: ['Bayley Scales', 'Pediatrics'],
  aliases: ['Bayley Scales'],
  inputs: [{id:'standardScore',label:'Validated standard score',type:'number',step:0.1}],
  calculate(values) {
    const s=Number(values.standardScore); if(!Number.isFinite(s)) return {error:'Enter validated Bayley standard score.'}
    return {value:s,displayValue:String(s),unit:'standard score',category:'Bayley result'}
  },
  references: ['Original pediatric score/assessment reference.']
}

export default bayley
