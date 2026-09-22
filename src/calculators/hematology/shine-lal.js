const shineLal={
id:'shine-lal',
name:'Shine and Lal Index',
shortName:'Shine-Lal',
categoryId:'hematology',
description:'Microcytic anemia discrimination index for beta-thalassemia trait screening.',
type:'calculation',
inputs:[
{id:'mcv',label:'MCV',unit:'fL',min:20,max:200,step:0.1},
{id:'mch',label:'MCH',unit:'pg',min:5,max:50,step:0.1}
],
calculate(v){
const mcv=Number(v.mcv);
const mch=Number(v.mch);
const value=(mcv*mcv*mch)/100;
return{
value:Number(value.toFixed(1)),
unit:'index',
interpretation:value<=1530?'Pattern favors beta-thalassemia trait':'Pattern favors iron deficiency',
note:'Classic formula: (MCV² × MCH) / 100. This is a screening index, not a diagnostic test.'
};
}
};
export default shineLal