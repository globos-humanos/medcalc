const mentzer={
id:'mentzer',
name:'Mentzer Index',
shortName:'Mentzer',
categoryId:'hematology',
description:'MCV divided by RBC count as a screening index for microcytic anemia.',
type:'calculation',
inputs:[
{id:'mcv',label:'MCV',unit:'fL',min:20,max:200,step:0.1},
{id:'rbc',label:'RBC count',unit:'Ã—10Â¹Â²/L',min:0.5,max:15,step:0.1}
],
calculate(v){
const mcv=Number(v.mcv);
const rbc=Number(v.rbc);
if(!Number.isFinite(mcv)||!Number.isFinite(rbc)||mcv<=0||rbc<=0){
return{error:'Please enter valid MCV and RBC values.'};
}
const value=mcv/rbc;
return{
value:Number(value.toFixed(2)),
unit:'ratio',
interpretation:value<13?'Pattern favors thalassemia trait':'Pattern favors iron deficiency',
note:'Mentzer Index is a screening/discrimination index and does not establish the diagnosis of either condition.'
};
}
};
export default mentzer
