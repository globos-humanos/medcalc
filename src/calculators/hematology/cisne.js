const calc={
 id:'cisne',name:'CISNE Score',shortName:'CISNE',categoryId:'hematology',
 description:'Clinical Index of Stable Febrile Neutropenia.',type:'score',
 inputs:[
  {id:'ecog',label:'ECOG performance status ≥2',type:'boolean'},{id:'hyperglycemia',label:'Stress-induced hyperglycemia',type:'boolean'},
  {id:'copd',label:'COPD',type:'boolean'},{id:'cardio',label:'Chronic cardiovascular disease',type:'boolean'},
  {id:'mucositis',label:'NCI mucositis grade ≥2',type:'boolean'},{id:'monocytes',label:'Monocytes <200/µL',type:'boolean'}
 ],
 calculate(v){const value=(v.ecog?2:0)+(v.hyperglycemia?2:0)+(v.copd?1:0)+(v.cardio?1:0)+(v.mucositis?1:0)+(v.monocytes?1:0);return{value,unit:'/8',interpretation:value===0?'Low-risk class':value<=2?'Intermediate-risk class':'High-risk class'}}
};
export default calc;