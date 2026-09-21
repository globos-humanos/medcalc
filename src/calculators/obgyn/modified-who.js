const modifiedWho = {
  id: 'modifiedWho',
  name: 'Modified WHO Maternal Cardiac Risk',
  shortName: 'Modified WHO Maternal Cardiac Risk',
  type: 'score',
  categoryId: 'obgyn',
  category: 'Obstetrics & Gynecology',
  description: 'Modified WHO Maternal Cardiac Risk from the MedCalc master calculator catalogue.',
  keywords: ['Modified WHO Maternal Cardiac Risk', 'Obstetrics & Gynecology'],
  aliases: ['Modified WHO Maternal Cardiac Risk'],
  inputs: [{id:'class',label:'Modified WHO class',type:'choice',options:[{value:'I',label:'I'},{value:'II',label:'II'},{value:'II-III',label:'II–III'},{value:'III',label:'III'},{value:'IV',label:'IV'}]}],
  calculate(values) {
    if(!values.class) return {error:'Select a WHO class.'}
    return {value:0,displayValue:values.class,unit:'class',category:'Modified WHO maternal cardiac risk class'}
  },
  references: ['Original obstetric/gynecologic model or classification publication.']
}

export default modifiedWho
