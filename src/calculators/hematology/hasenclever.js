const hasenclever={
id:'hasenclever',
name:'Hasenclever International Prognostic Score',
shortName:'Hasenclever IPS',
categoryId:'hematology',
description:'Seven-factor International Prognostic Score for advanced Hodgkin lymphoma.',
type:'score',
inputs:[
{id:'albumin',label:'Albumin <4.0 g/dL?',type:'boolean'},
{id:'hb',label:'Hemoglobin <10.5 g/dL?',type:'boolean'},
{id:'male',label:'Male sex?',type:'boolean'},
{id:'age',label:'Age ≥45 years?',type:'boolean'},
{id:'stage',label:'Stage IV disease?',type:'boolean'},
{id:'wbc',label:'WBC ≥15 ×10⁹/L?',type:'boolean'},
{id:'lymphopenia',label:'Lymphocytes <600/µL or <8% of WBC?',type:'boolean'}
],
calculate(v){
const s=(v.albumin?1:0)+(v.hb?1:0)+(v.male?1:0)+(v.age?1:0)+(v.stage?1:0)+(v.wbc?1:0)+(v.lymphopenia?1:0);
return{
value:s,
unit:'/7',
interpretation:s<=2?'Favorable factor-count group':s<=4?'Intermediate factor-count group':'Higher factor-count group',
note:'Original Hasenclever IPS counts seven adverse factors. The original study reported freedom-from-progression estimates by exact score; this calculator does not convert the score into an individualized probability.'
};
}
};
export default hasenclever