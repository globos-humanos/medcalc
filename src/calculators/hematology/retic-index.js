const rpi={
id:'retic-index',
name:'Reticulocyte Production Index',
shortName:'RPI',
categoryId:'hematology',
description:'Corrects the reticulocyte response for anemia severity and reticulocyte maturation.',
type:'calculation',
inputs:[
{id:'retic',label:'Reticulocyte count',unit:'%',min:0,max:30,step:0.1},
{id:'hct',label:'Patient hematocrit',unit:'%',min:5,max:70,step:0.1},
{id:'sex',label:'Reference hematocrit',type:'choice',options:[
{value:45,label:'Male reference — 45%'},
{value:40,label:'Female reference — 40%'}
],optionsLayout:'stack'}
],
calculate(v){
const r=Number(v.retic);
const h=Number(v.hct);
const normal=Number(v.sex);
const corrected=r*(h/normal);
const maturation=h>=36?1:h>=26?1.5:h>=16?2:2.5;
const value=corrected/maturation;
return{
value:Number(value.toFixed(2)),
unit:'RPI',
interpretation:value>=2?'Appropriate/increased marrow response':'Hypoproliferative marrow response',
note:`Corrected reticulocyte count ${corrected.toFixed(2)}%; maturation factor ${maturation}. An RPI around ≥2 generally indicates an appropriate marrow response to anemia.`
};
}
};
export default rpi