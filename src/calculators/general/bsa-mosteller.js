const calc={id:'bsa-mosteller',name:'BSA — Mosteller',shortName:'BSA Mosteller',categoryId:'general',description:'Body surface area using the Mosteller formula.',type:'calculation',
inputs:[{id:'height',label:'Height',unit:'cm',min:30,max:250,step:0.1},{id:'weight',label:'Weight',unit:'kg',min:1,max:300,step:0.1}],
calculate(v){return{value:Math.sqrt((Number(v.height)*Number(v.weight))/3600),unit:'m²'}}
};export default calc