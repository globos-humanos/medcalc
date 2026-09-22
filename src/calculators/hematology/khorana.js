const khorana={
id:'khorana',
name:'Khorana Score',
shortName:'Khorana',
categoryId:'hematology',
description:'Cancer-associated thrombosis risk score for ambulatory patients with cancer receiving systemic therapy.',
type:'score',
inputs:[
{id:'site',label:'Primary cancer site',type:'choice',options:[
{value:2,label:'Very high risk — stomach or pancreas'},
{value:1,label:'High risk — lung, lymphoma, gynecologic, bladder or testicular/genitourinary cancer'},
{value:0,label:'Other site'}
],optionsLayout:'stack'},
{id:'platelets',label:'Platelets ≥350 ×10⁹/L?',type:'boolean'},
{id:'hb',label:'Hemoglobin <10 g/dL or erythropoiesis-stimulating agent use?',type:'boolean'},
{id:'wbc',label:'WBC >11 ×10⁹/L?',type:'boolean'},
{id:'bmi',label:'BMI ≥35 kg/m²?',type:'boolean'}
],
calculate(v){
const s=Number(v.site)+(v.platelets?1:0)+(v.hb?1:0)+(v.wbc?1:0)+(v.bmi?1:0);
return{
value:s,
unit:'/6',
interpretation:s===0?'Low score':s===1||s===2?'Intermediate score':'Higher score',
note:'Khorana score ranges from 0–6 and was developed for ambulatory patients with cancer. It estimates thrombosis risk; it does not itself prescribe anticoagulation.'
};
}
};
export default khorana