const figo = {
  id: 'figo',
  name: 'FIGO Staging',
  shortName: 'FIGO Staging',
  type: 'score',
  categoryId: 'obgyn',
  category: 'Obstetrics & Gynecology',
  description: 'FIGO Staging from the MedCalc master calculator catalogue.',
  keywords: ['FIGO Staging', 'Obstetrics & Gynecology'],
  aliases: ['FIGO Staging'],
  inputs: [{id:'stage',label:'FIGO stage',type:'choice',options:[{value:'I',label:'I'},{value:'II',label:'II'},{value:'III',label:'III'},{value:'IV',label:'IV'}]}],
  calculate(values) {
    if(!values.stage) return {error:'Select FIGO stage.'}
    return {value:0,displayValue:values.stage,unit:'stage',category:'FIGO stage'}
  },
  references: ['Original obstetric/gynecologic model or classification publication.']
}

export default figo
