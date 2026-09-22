const fourTs={
id:'4ts',
name:'4Ts Score',
shortName:'4Ts',
categoryId:'hematology',
description:'Clinical pretest probability score for heparin-induced thrombocytopenia.',
type:'score',
inputs:[
{id:'thrombocytopenia',label:'Thrombocytopenia magnitude',type:'choice',options:[
{value:2,label:'Platelet fall >50% and nadir ≥20 ×10⁹/L'},
{value:1,label:'Platelet fall 30–50% or nadir 10–19 ×10⁹/L'},
{value:0,label:'Platelet fall <30% or nadir <10 ×10⁹/L'}
],optionsLayout:'stack'},
{id:'timing',label:'Timing of platelet fall',type:'choice',options:[
{value:2,label:'Clear onset day 5–10, or ≤1 day with recent heparin exposure'},
{value:1,label:'Consistent but not definite; onset after day 10, or timing unclear'},
{value:0,label:'Platelet fall ≤4 days without recent heparin exposure'}
],optionsLayout:'stack'},
{id:'thrombosis',label:'Thrombosis or other HIT sequelae',type:'choice',options:[
{value:2,label:'New thrombosis, skin necrosis, acute systemic reaction after IV heparin'},
{value:1,label:'Progressive/recurrent thrombosis, non-necrotizing skin lesions, or suspected thrombosis'},
{value:0,label:'None'}
],optionsLayout:'stack'},
{id:'other',label:'Other causes of thrombocytopenia',type:'choice',options:[
{value:2,label:'No apparent alternative cause'},
{value:1,label:'Possible alternative cause'},
{value:0,label:'Definite alternative cause'}
],optionsLayout:'stack'}
],
calculate(v){
const s=Number(v.thrombocytopenia)+Number(v.timing)+Number(v.thrombosis)+Number(v.other);
return{
value:s,
unit:'/8',
interpretation:s<=3?'Low pretest probability':s<=5?'Intermediate pretest probability':'High pretest probability',
note:'The 4Ts score estimates pretest probability of HIT and is not itself a laboratory diagnosis.'
};
}
};
export default fourTs