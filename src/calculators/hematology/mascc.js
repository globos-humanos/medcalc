const calc={
 id:'mascc',name:'MASCC Febrile Neutropenia Score',shortName:'MASCC',categoryId:'hematology',
 description:'Published MASCC risk index for febrile neutropenia.',type:'score',
 inputs:[
  {id:'burden',label:'Burden of illness',type:'choice',options:[{value:5,label:'No or mild symptoms'},{value:3,label:'Moderate symptoms'},{value:0,label:'Severe symptoms'}],optionsLayout:'stack'},
  {id:'hypotension',label:'No hypotension (SBP >90 mmHg)',type:'boolean'},{id:'copd',label:'No COPD',type:'boolean'},
  {id:'tumor',label:'Solid tumor OR hematologic malignancy without prior fungal infection',type:'boolean'},
  {id:'dehydration',label:'No dehydration requiring IV fluids',type:'boolean'},{id:'outpatient',label:'Outpatient at fever onset',type:'boolean'},{id:'age',label:'Age <60 years',type:'boolean'}
 ],
 calculate(v){const value=Number(v.burden)+(v.hypotension?5:0)+(v.copd?4:0)+(v.tumor?4:0)+(v.dehydration?3:0)+(v.outpatient?3:0)+(v.age?2:0);return{value,unit:'/26',interpretation:value>=21?'Low-risk MASCC group':'Higher-risk MASCC group'}}
};
export default calc;