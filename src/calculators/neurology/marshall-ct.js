const marshallCt = {
  id: 'marshallCt',
  name: 'Marshall CT Classification',
  shortName: 'Marshall CT Classification',
  type: 'score',
  categoryId: 'neurology',
  category: 'Neurology',
  description: 'Marshall CT Classification from the MedCalc master calculator catalogue.',
  keywords: ['Marshall CT Classification', 'Neurology'],
  aliases: ['Marshall CT Classification'],
  inputs: [{id:'class',label:'Marshall CT class',type:'number',min:1,max:6,step:1}],
  calculate(values) {
    const s=Number(values.class); if(!Number.isFinite(s)) return {error:'Enter Marshall CT class.'}
    return {value:s,displayValue:String(s),unit:'class',category:'Marshall CT classification'}
  },
  references: ['Original validated neurologic score/classification publication.']
}

export default marshallCt
