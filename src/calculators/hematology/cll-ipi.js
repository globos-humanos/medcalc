const cllIpi={
id:'cll-ipi',
name:'CLL International Prognostic Index',
shortName:'CLL-IPI',
categoryId:'hematology',
description:'Five-factor prognostic index for previously untreated chronic lymphocytic leukemia.',
type:'score',
inputs:[
{id:'tp53',label:'TP53 abnormality — del(17p) and/or TP53 mutation?',type:'boolean'},
{id:'ighv',label:'Unmutated IGHV?',type:'boolean'},
{id:'beta2',label:'β2-microglobulin >3.5 mg/L?',type:'boolean'},
{id:'stage',label:'Advanced clinical stage — Binet B/C or Rai I–IV?',type:'boolean'},
{id:'age',label:'Age >65 years?',type:'boolean'}
],
calculate(v){
const s=(v.tp53?4:0)+(v.ighv?2:0)+(v.beta2?2:0)+(v.stage?1:0)+(v.age?1:0);
return{
value:s,
unit:'points',
interpretation:s<=1?'Low-risk CLL-IPI group':s<=3?'Intermediate-risk CLL-IPI group':s<=6?'High-risk CLL-IPI group':'Very-high-risk CLL-IPI group',
note:'The original CLL-IPI weights TP53 abnormality 4 points, unmutated IGHV 2, β2-microglobulin >3.5 mg/L 2, advanced stage 1, and age >65 years 1.'
};
}
};
export default cllIpi