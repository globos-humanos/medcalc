const ipssR={
id:'ipss-r',
name:'IPSS-R for Myelodysplastic Syndromes',
shortName:'IPSS-R',
categoryId:'hematology',
description:'Revised International Prognostic Scoring System using cytogenetics, marrow blasts and cytopenias.',
type:'score',
inputs:[
{id:'cytogenetics',label:'Cytogenetic risk group',type:'choice',options:[
{value:0,label:'Very good'},
{value:1,label:'Good'},
{value:2,label:'Intermediate'},
{value:3,label:'Poor'},
{value:4,label:'Very poor'}
],optionsLayout:'stack'},
{id:'blasts',label:'Bone marrow blasts',type:'choice',options:[
{value:0,label:'≤2%'},
{value:1,label:'>2% to <5%'},
{value:2,label:'5–10%'},
{value:3,label:'>10%'}
],optionsLayout:'stack'},
{id:'hb',label:'Hemoglobin',type:'choice',options:[
{value:0,label:'≥10 g/dL'},
{value:1,label:'8 to <10 g/dL'},
{value:1.5,label:'<8 g/dL'}
],optionsLayout:'stack'},
{id:'platelets',label:'Platelets',type:'choice',options:[
{value:0,label:'≥100 ×10⁹/L'},
{value:0.5,label:'50 to <100 ×10⁹/L'},
{value:1,label:'<50 ×10⁹/L'}
],optionsLayout:'stack'},
{id:'anc',label:'ANC',type:'choice',options:[
{value:0,label:'≥0.8 ×10⁹/L'},
{value:0.5,label:'<0.8 ×10⁹/L'}
],optionsLayout:'stack'}
],
calculate(v){
const s=Number(v.cytogenetics)+Number(v.blasts)+Number(v.hb)+Number(v.platelets)+Number(v.anc);
return{
value:Number(s.toFixed(1)),
unit:'points',
interpretation:s<=1.5?'Very low risk':s<=3?'Low risk':s<=4.5?'Intermediate risk':s<=6?'High risk':'Very high risk',
note:'IPSS-R published risk groups: ≤1.5 very low, >1.5–3 low, >3–4.5 intermediate, >4.5–6 high, >6 very high.'
};
}
};
export default ipssR