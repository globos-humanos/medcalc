const wfns={id:'wfns',name:'WFNS Grade',shortName:'WFNS',categoryId:'neurology',description:'World Federation of Neurosurgical Societies grade for SAH.',type:'score',
inputs:[{id:'gcs',label:'GCS',min:3,max:15},{id:'deficit',label:'Motor deficit?',type:'boolean'}],
calculate(v){const g=Number(v.gcs);const grade=g===15&&!v.deficit?1:g>=13?2:g>=7?3:g<=6&&!v.deficit?4:5;return{value:grade,unit:'grade',interpretation:`WFNS grade ${grade}`}}
};export default wfns