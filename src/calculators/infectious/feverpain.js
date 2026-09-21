const feverpain = {
  id: 'feverpain',
  name: 'FeverPAIN Score',
  shortName: 'FeverPAIN Score',
  type: 'score',
  categoryId: 'infectious',
  category: 'Infectious Disease',
  description: 'FeverPAIN Score from the MedCalc master calculator catalogue.',
  keywords: ['FeverPAIN Score', 'Infectious Disease'],
  aliases: ['FeverPAIN Score'],
  inputs: [{id:'fever',label:'Fever in previous 24 h',type:'boolean'},{id:'purulence',label:'Purulence',type:'boolean'},{id:'attendRapid',label:'Attend rapidly / within 3 days',type:'boolean'},{id:'severelyInflamed',label:'Severely inflamed tonsils',type:'boolean'},{id:'noCough',label:'No cough or coryza',type:'boolean'}],
  calculate(values) {
    const k=['fever','purulence','attendRapid','severelyInflamed','noCough']; if(k.some(x=>typeof values[x]!=='boolean')) return {error:'Complete FeverPAIN inputs.'}
    const s=k.reduce((n,x)=>n+(values[x]?1:0),0); return {value:s,displayValue:String(s),unit:'/ 5',category:'FeverPAIN'}
  },
  references: ['Original infectious disease score/criteria publication.']
}

export default feverpain
