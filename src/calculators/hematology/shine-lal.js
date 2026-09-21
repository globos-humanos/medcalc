const shineLal = {
  id: 'shineLal',
  name: 'Shine-Lal Index',
  shortName: 'Shine-Lal Index',
  type: 'score',
  categoryId: 'hematology',
  category: 'Hematology & Oncology',
  description: 'Shine-Lal Index from the MedCalc master calculator catalogue.',
  keywords: ['Shine-Lal Index', 'Hematology & Oncology'],
  aliases: ['Shine-Lal Index'],
  inputs: [{id:'mcv',label:'MCV',type:'number',unit:'fL',step:0.1},{id:'hb',label:'Hemoglobin',type:'number',unit:'g/dL',step:0.1}],
  calculate(values) {
    const m=Number(values.mcv),h=Number(values.hb); if(![m,h].every(Number.isFinite)) return {error:'Enter MCV and hemoglobin.'}
    const s=m*m*h/100; return {value:s,displayValue:s.toFixed(1),unit:'index',category:'Shine-Lal index'}
  },
  references: ['Original hematology/oncology score publication.']
}

export default shineLal
