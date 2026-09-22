const improveVte={
id:'improve-vte',
name:'IMPROVE VTE Score',
shortName:'IMPROVE VTE',
categoryId:'hematology',
description:'Risk assessment model for venous thromboembolism in hospitalized medical patients.',
type:'score',
inputs:[
{id:'previousVte',label:'Previous VTE?',type:'boolean'},
{id:'thrombophilia',label:'Known thrombophilia?',type:'boolean'},
{id:'cancer',label:'Active cancer?',type:'boolean'},
{id:'paralysis',label:'Current lower-limb paralysis?',type:'boolean'},
{id:'immobility',label:'Immobilization ≥7 days?',type:'boolean'},
{id:'icu',label:'ICU/CCU stay?',type:'boolean'},
{id:'age',label:'Age >60 years?',type:'boolean'}
],
calculate(v){
const s=(v.previousVte?3:0)+(v.thrombophilia?2:0)+(v.cancer?2:0)+(v.paralysis?2:0)+(v.immobility?1:0)+(v.icu?1:0)+(v.age?1:0);
return{
value:s,
unit:'points',
interpretation:s<=1?'Low VTE risk':s<=3?'Moderate VTE risk':'High VTE risk',
note:'IMPROVE VTE categories commonly used: 0–1 low, 2–3 moderate, ≥4 high.'
};
}
};
export default improveVte