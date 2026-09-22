const cisne={
id:'cisne',
name:'CISNE Score',
shortName:'CISNE',
categoryId:'hematology',
description:'Clinical Index of Stable Febrile Neutropenia for risk stratification in apparently stable adults with febrile neutropenia.',
type:'score',
inputs:[
{id:'ecog',label:'ECOG performance status ≥2?',type:'boolean'},
{id:'copd',label:'Chronic obstructive pulmonary disease?',type:'boolean'},
{id:'cardiac',label:'Chronic cardiovascular disease?',type:'boolean'},
{id:'mucositis',label:'Oral mucositis grade ≥2?',type:'boolean'},
{id:'monocytes',label:'Monocyte count <200/µL?',type:'boolean'},
{id:'glucose',label:'Stress-induced hyperglycemia?',type:'boolean'}
],
calculate(v){
const s=(v.ecog?2:0)+(v.copd?1:0)+(v.cardiac?1:0)+(v.mucositis?1:0)+(v.monocytes?1:0)+(v.glucose?2:0);
return{
value:s,
unit:'/8',
interpretation:s===0?'CISNE I — low-risk group':s<=2?'CISNE II — intermediate-risk group':'CISNE III — high-risk group',
note:'CISNE was developed for apparently stable adults with febrile neutropenia. It should not replace clinical assessment of instability.'
};
}
};
export default cisne