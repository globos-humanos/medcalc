const ipssM={
id:'ipss-m',
name:'IPSS-M for Myelodysplastic Neoplasms',
shortName:'IPSS-M',
categoryId:'hematology',
description:'Structured IPSS-M input framework. The validated molecular model requires molecular and cytogenetic data with the published model implementation.',
type:'score',
inputs:[
{id:'hb',label:'Hemoglobin',unit:'g/dL',min:2,max:20,step:0.1},
{id:'platelets',label:'Platelets',unit:'Ã—10â¹/L',min:1,max:1000},
{id:'anc',label:'ANC',unit:'Ã—10â¹/L',min:0,max:30,step:0.1},
{id:'blasts',label:'Bone marrow blasts',unit:'%',min:0,max:100,step:0.1},
{id:'cytogenetics',label:'IPSS-R cytogenetic risk group',type:'choice',options:[
{value:'very-good',label:'Very good'},
{value:'good',label:'Good'},
{value:'intermediate',label:'Intermediate'},
{value:'poor',label:'Poor'},
{value:'very-poor',label:'Very poor'}
],optionsLayout:'stack'},
{id:'molecular',label:'Molecular sequencing data available?',type:'boolean'},
{id:'tp53',label:'TP53 mutation status available?',type:'boolean'},
{id:'sf3b1',label:'SF3B1 mutation status available?',type:'boolean'},
{id:'asxl1',label:'ASXL1 mutation status available?',type:'boolean'},
{id:'srsf2',label:'SRSF2 mutation status available?',type:'boolean'},
{id:'u2af1',label:'U2AF1 mutation status available?',type:'boolean'},
{id:'runx1',label:'RUNX1 mutation status available?',type:'boolean'},
{id:'ezh2',label:'EZH2 mutation status available?',type:'boolean'},
{id:'kras',label:'KRAS mutation status available?',type:'boolean'},
{id:'nras',label:'NRAS mutation status available?',type:'boolean'}
],
calculate(v){
return{
value:'Validated IPSS-M engine required',
unit:'',
interpretation:'IPSS-M clinical and molecular inputs captured',
note:'IPSS-M is a molecularly integrated prognostic model. A validated implementation is required to calculate the published IPSS-M score/risk category; this interface intentionally does not substitute an invented coefficient system.'
};
}
};
export default ipssM

