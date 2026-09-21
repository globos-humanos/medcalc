const partograph = {
  id: 'partograph',
  name: 'Partograph',
  shortName: 'Partograph',
  type: 'score',
  categoryId: 'obgyn',
  category: 'Obstetrics & Gynecology',
  description: 'Partograph from the MedCalc master calculator catalogue.',
  keywords: ['Partograph', 'Obstetrics & Gynecology'],
  aliases: ['Partograph'],
  inputs: [{id:'cervicalDil',label:'Cervical dilatation',type:'number',unit:'cm',min:0,max:10,step:0.5},{id:'hours',label:'Hours since labour assessment',type:'number',min:0,step:0.1}],
  calculate(values) {
    const d=Number(values.cervicalDil),h=Number(values.hours); if(![d,h].every(Number.isFinite)) return {error:'Enter partograph values.'}
    return {value:d,displayValue:`${d} cm`,unit:'cervical dilatation',category:`Time: ${h} h`}
  },
  references: ['Original obstetric/gynecologic model or classification publication.']
}

export default partograph
