const mentzer={id:'mentzer',name:'Mentzer Index',shortName:'Mentzer',categoryId:'hematology',description:'MCV divided by RBC count for microcytic anemia differentiation.',type:'calculation',
inputs:[{id:'mcv',label:'MCV',unit:'fL',min:1,max:200,step:0.1},{id:'rbc',label:'RBC count',unit:'×10¹²/L',min:0.1,max:20,step:0.1}],
calculate(v){const value=Number(v.mcv)/Number(v.rbc);return{value,unit:'ratio',interpretation:value<13?'Pattern favors thalassemia trait':'Pattern favors iron deficiency'}}
};export default mentzer