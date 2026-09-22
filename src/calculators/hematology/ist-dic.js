const dic={
id:'ist-dic',
name:'ISTH Overt DIC Score',
shortName:'ISTH DIC',
categoryId:'hematology',
description:'International Society on Thrombosis and Haemostasis score for overt disseminated intravascular coagulation.',
type:'score',
inputs:[
{id:'platelets',label:'Platelet count',type:'choice',options:[
{value:0,label:'≥100 ×10⁹/L'},
{value:1,label:'50–99 ×10⁹/L'},
{value:2,label:'<50 ×10⁹/L'}
],optionsLayout:'stack'},
{id:'pt',label:'Prothrombin-time prolongation',type:'choice',options:[
{value:0,label:'<3 seconds'},
{value:1,label:'3 to <6 seconds'},
{value:2,label:'≥6 seconds'}
],optionsLayout:'stack'},
{id:'ddimer',label:'D-dimer / fibrin degradation products',type:'choice',options:[
{value:0,label:'No increase'},
{value:2,label:'Moderate increase'},
{value:3,label:'Strong/marked increase'}
],optionsLayout:'stack'},
{id:'fibrinogen',label:'Fibrinogen',type:'choice',options:[
{value:0,label:'≥1 g/L'},
{value:1,label:'<1 g/L'}
],optionsLayout:'stack'}
],
calculate(v){
const s=Number(v.platelets)+Number(v.pt)+Number(v.ddimer)+Number(v.fibrinogen);
return{
value:s,
unit:'/8',
interpretation:s>=5?'Compatible with overt DIC by ISTH scoring threshold':'Does not reach overt-DIC threshold',
note:'An ISTH score ≥5 is compatible with overt DIC in an appropriate clinical setting. DIC scoring requires an underlying disorder capable of causing DIC.'
};
}
};
export default dic