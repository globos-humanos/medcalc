const rdwi={
id:'rdw-index',
name:'RDW Index',
shortName:'RDWI',
categoryId:'hematology',
description:'Red Cell Distribution Width Index for microcytic anemia discrimination.',
type:'calculation',
inputs:[
{id:'mcv',label:'MCV',unit:'fL',min:20,max:200,step:0.1},
{id:'rdw',label:'RDW',unit:'%',min:5,max:40,step:0.1},
{id:'rbc',label:'RBC count',unit:'×10¹²/L',min:0.5,max:15,step:0.1}
],
calculate(v){
const value=(Number(v.mcv)*Number(v.rdw))/Number(v.rbc);
return{
value:Number(value.toFixed(2)),
unit:'index',
interpretation:value<=220?'Pattern favors thalassemia trait':'Pattern favors iron deficiency',
note:'A commonly used screening cutoff is approximately 220. Performance varies by population and analyzer; this is not diagnostic.'
};
}
};
export default rdwi