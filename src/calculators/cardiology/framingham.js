const framingham = {
  id: 'framingham',
  name: 'Framingham Risk Score',
  shortName: 'Framingham Risk Score',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Framingham Risk Score from the MedCalc master calculator catalogue.',
  keywords: ['Framingham Risk Score', 'Cardiology'],
  aliases: ['Framingham Risk Score'],
  inputs: [
 {id:'age',label:'Age',type:'number',unit:'years',min:20,step:1},
 {id:'sex',label:'Sex',type:'choice',options:[{value:'male',label:'Male'},{value:'female',label:'Female'}]},
 {id:'totalCholesterol',label:'Total cholesterol',type:'number',unit:'mg/dL',min:0,step:1},
 {id:'hdl',label:'HDL cholesterol',type:'number',unit:'mg/dL',min:0,step:1},
 {id:'sbp',label:'Systolic BP',type:'number',unit:'mmHg',min:0,step:1},
 {id:'smoker',label:'Current smoker',type:'boolean'},
 {id:'treated',label:'Treated hypertension',type:'boolean'}
],
  calculate(values) {
    return {error:'Framingham has multiple published endpoints/models. Select the validated endpoint-specific model before clinical deployment.'}
  },
  references: ['Original validated cardiovascular risk model publication.']
}

export default framingham
