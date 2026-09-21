const calc={id:'killip',name:'Killip Class',shortName:'Killip',categoryId:'cardiology',description:'Clinical classification of heart failure in acute myocardial infarction.',type:'score',
inputs:[{id:'class',label:'Clinical findings',type:'choice',options:[{value:1,label:'I — No heart failure'},{value:2,label:'II — S3, rales, or JVP elevation'},{value:3,label:'III — Pulmonary edema'},{value:4,label:'IV — Cardiogenic shock'}],optionsLayout:'stack'}],
calculate(v){return{value:Number(v.class),unit:'class',interpretation:`Killip class ${v.class}`}}
};export default calc