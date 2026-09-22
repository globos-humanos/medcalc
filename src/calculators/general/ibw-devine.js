const calc={id:'ibw-devine',name:'Ideal Body Weight â€” Devine',shortName:'IBW Devine',categoryId: 'general-medicine',description:'Ideal body weight using the Devine formula.',type:'calculation',
inputs:[{id:'sex',label:'Sex',type:'choice',options:[{value:'male',label:'Male'},{value:'female',label:'Female'}]},{id:'height',label:'Height',unit:'cm',min:100,max:250,step:0.1}],
calculate(v){const inches=Number(v.height)/2.54;const base=v.sex==='male'?50:45.5;return{value:base+2.3*Math.max(0,inches-60),unit:'kg'}}
};export default calc

