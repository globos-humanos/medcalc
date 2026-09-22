const hscore={
id:'hscore',
name:'HScore',
shortName:'HScore',
categoryId:'hematology',
description:'Probability score for reactive hemophagocytic syndrome / secondary HLH.',
type:'score',
inputs:[
{id:'immunosuppression',label:'Known immunosuppression?',type:'boolean'},
{id:'temperature',label:'Temperature',unit:'Â°C',min:34,max:43,step:0.1},
{id:'organomegaly',label:'Organomegaly',type:'choice',options:[
{value:0,label:'None'},
{value:23,label:'Hepatomegaly or splenomegaly'},
{value:38,label:'Hepatomegaly and splenomegaly'}
],optionsLayout:'stack'},
{id:'cytopenias',label:'Number of cytopenic lineages',type:'choice',options:[
{value:0,label:'1 lineage'},
{value:24,label:'2 lineages'},
{value:34,label:'3 lineages'}
],optionsLayout:'stack'},
{id:'ferritin',label:'Ferritin',unit:'ng/mL',min:0,max:100000,step:10},
{id:'triglyceride',label:'Triglycerides',unit:'mmol/L',min:0,max:20,step:0.1},
{id:'fibrinogen',label:'Fibrinogen',unit:'g/L',min:0,max:10,step:0.1},
{id:'ast',label:'AST',unit:'U/L',min:0,max:5000},
{id:'hemophagocytosis',label:'Hemophagocytosis on bone marrow aspirate?',type:'boolean'}
],
calculate(v){
const t=Number(v.temperature);
const ferr=Number(v.ferritin);
const tg=Number(v.triglyceride);
const fib=Number(v.fibrinogen);
const ast=Number(v.ast);
const tempPts=t<38.4?0:t<=39.4?33:49;
const ferrPts=ferr<2000?0:ferr<=6000?35:50;
const tgPts=tg<1.5?0:tg<=4?44:64;
const fibPts=fib>2.5?0:30;
const astPts=ast<30?0:19;
const s=(v.immunosuppression?18:0)+tempPts+Number(v.organomegaly)+Number(v.cytopenias)+ferrPts+tgPts+fibPts+astPts+(v.hemophagocytosis?35:0);
return{
value:s,
unit:'points',
interpretation:HScore =  points,
note:'HScore estimates the probability of reactive hemophagocytic syndrome. The original model maps the score to a nonlinear probability; this calculator reports the validated score without inventing probability bands.'
};
}
};
export default hscore
