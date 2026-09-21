const fullPiers = {
  id: 'fullPiers',
  name: 'FullPIERS Model',
  shortName: 'FullPIERS Model',
  type: 'score',
  categoryId: 'obgyn',
  category: 'Obstetrics & Gynecology',
  description: 'FullPIERS Model from the MedCalc master calculator catalogue.',
  keywords: ['FullPIERS Model', 'Obstetrics & Gynecology'],
  aliases: ['FullPIERS Model'],
  inputs: [{id:'risk',label:'Validated FullPIERS risk',type:'number',min:0,max:100,step:0.1,unit:'%'}],
  calculate(values) {
    const r=Number(values.risk); if(!Number.isFinite(r)) return {error:'Enter validated FullPIERS output.'}
    return {value:r,displayValue:r.toFixed(1),unit:'%',category:'FullPIERS predicted adverse outcome risk'}
  },
  references: ['Original obstetric/gynecologic model or classification publication.']
}

export default fullPiers
