const anc={
id:'anc',
name:'Absolute Neutrophil Count',
shortName:'ANC',
categoryId:'hematology',
description:'Absolute neutrophil count calculated from total WBC and neutrophil/band percentages.',
type:'calculation',
inputs:[
{id:'wbc',label:'WBC',unit:'Ã—10â¹/L',min:0.1,max:100,step:0.1},
{id:'neut',label:'Neutrophils',unit:'%',min:0,max:100,step:0.1},
{id:'bands',label:'Bands',unit:'%',min:0,max:100,step:0.1}
],
calculate(v){
const w=Number(v.wbc);
const n=Number(v.neut);
const b=Number(v.bands);
if(n+b>100)return{value:'Invalid',unit:'',interpretation:'Neutrophil + band percentage cannot exceed 100%.',note:'Check the differential count.'};
if (!Number.isFinite(w) || !Number.isFinite(n) || !Number.isFinite(b) || w < 0 || n < 0 || b < 0) {
return{value:'Invalid',unit:'',interpretation:'Please enter valid WBC, neutrophil and band values.',note:'Check the differential count.'};
}
const value=w*(n+b)/100;
return{
value:Number(value.toFixed(2)),
unit:'Ã—10â¹/L',
interpretation:value<0.5?'Severe neutropenia':value<1?'Moderate neutropenia':value<1.5?'Mild neutropenia':'Not neutropenic by common ANC thresholds',
note:'ANC is a laboratory-derived measure; clinical significance depends on context, duration and patient factors.'
};
}
};
export default anc
