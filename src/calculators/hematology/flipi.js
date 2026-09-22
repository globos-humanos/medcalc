const flipi={
id:'flipi',
name:'FLIPI — Follicular Lymphoma International Prognostic Index',
shortName:'FLIPI',
categoryId:'hematology',
description:'Five-factor prognostic index for follicular lymphoma.',
type:'score',
inputs:[
{id:'age',label:'Age ≥60 years?',type:'boolean'},
{id:'stage',label:'Ann Arbor stage III–IV?',type:'boolean'},
{id:'hb',label:'Hemoglobin <12 g/dL?',type:'boolean'},
{id:'ldh',label:'LDH above upper limit of normal?',type:'boolean'},
{id:'nodes',label:'More than 4 nodal areas involved?',type:'boolean'}
],
calculate(v){
const s=(v.age?1:0)+(v.stage?1:0)+(v.hb?1:0)+(v.ldh?1:0)+(v.nodes?1:0);
return{
value:s,
unit:'/5',
interpretation:s<=1?'Low-risk FLIPI group':s===2?'Intermediate-risk FLIPI group':'High-risk FLIPI group',
note:'Original FLIPI uses five adverse factors: age ≥60, stage III/IV, Hb <12 g/dL, elevated LDH, and >4 nodal areas.'
};
}
};
export default flipi