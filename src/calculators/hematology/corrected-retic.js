const correctedRetic={
id:'corrected-retic',
name:'Corrected Reticulocyte Count',
shortName:'Corrected Retic',
categoryId:'hematology',
description:'Corrects the reticulocyte percentage for the degree of anemia.',
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
const value=r*(h/normal);
return{
value:Number(value.toFixed(2)),
unit:'%',
note:'Corrected reticulocyte count = reticulocyte % × patient hematocrit / reference hematocrit. RPI is a separate calculation and additionally accounts for reticulocyte maturation.'
};
}
};
export default correctedRetic