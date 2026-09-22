const ipi={
id:'ipi',
name:'International Prognostic Index',
shortName:'IPI',
categoryId:'hematology',
description:'Five-factor International Prognostic Index for aggressive non-Hodgkin lymphoma.',
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
interpretation:s===0?'0 adverse factors':s<=2?'1–2 adverse factors':'3–5 adverse factors',
note:'The original IPI contains five equally weighted adverse factors. Prognostic performance depends on disease type and treatment era.'
};
}
};
export default ipi