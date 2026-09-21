const bmiForAge = {
  id: 'bmiForAge',
  name: 'BMI-for-age',
  shortName: 'BMI-for-age',
  type: 'score',
  categoryId: 'pediatrics',
  category: 'Pediatrics',
  description: 'BMI-for-age from the MedCalc master calculator catalogue.',
  keywords: ['BMI-for-age', 'Pediatrics'],
  aliases: ['BMI-for-age'],
  inputs: [{id:'bmi',label:'BMI',type:'number',unit:'kg/m²',min:0,step:0.1},{id:'z',label:'Validated BMI-for-age Z-score',type:'number',step:0.01}],
  calculate(values) {
    const b=Number(values.bmi),z=Number(values.z); if(![b,z].every(Number.isFinite)) return {error:'Enter BMI and validated age-specific Z-score.'}
    return {value:z,displayValue:z.toFixed(2),unit:'Z-score',category:`BMI ${b.toFixed(1)} kg/m²`}
  },
  references: ['Original pediatric score/assessment reference.']
}

export default bmiForAge
