const ga={id:'gestational-age',name:'Gestational Age Calculator',shortName:'Gestational Age',categoryId:'obgyn',description:'Calculates gestational age from LMP.',type:'calculation',
inputs:[{id:'lmp',label:'First day of LMP',type:'date'},{id:'date',label:'Date of assessment',type:'date'}],
calculate(v){if(!v.lmp||!v.date)return{value:'',unit:''};const a=new Date(`${v.lmp}T00:00:00`),b=new Date(`${v.date}T00:00:00`);const days=Math.floor((b-a)/86400000);return{value:`${Math.floor(days/7)} weeks ${days%7} days`,unit:'gestational age'}}
};export default ga