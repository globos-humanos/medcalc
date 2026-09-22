const rIpi={
id:'r-ipi',
name:'Revised International Prognostic Index',
shortName:'R-IPI',
categoryId:'hematology',
description:'Revised IPI grouping using the original five IPI adverse factors.',
type:'score',
inputs:[
{id:'age',label:'Age >60 years?',type:'boolean'},
{id:'ldh',label:'LDH above normal?',type:'boolean'},
{id:'stage',label:'Ann Arbor stage III–IV?',type:'boolean'},
{id:'ecog',label:'ECOG performance status ≥2?',type:'boolean'},
{id:'extranodal',label:'≥2 extranodal disease sites?',type:'boolean'}
],
calculate(v){
const s=(v.age?1:0)+(v.ldh?1:0)+(v.stage?1:0)+(v.ecog?1:0)+(v.extranodal?1:0);
return{
value:s,
unit:'/5',
interpretation:s===0?'Very good R-IPI group':s<=2?'Good R-IPI group':'Poor R-IPI group',
note:'R-IPI groups patients according to the number of original IPI adverse factors: 0, 1–2, or 3–5.'
};
}
};
export default rIpi