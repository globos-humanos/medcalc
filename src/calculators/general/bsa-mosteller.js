const calc={id:'bsa-mosteller',name:'BSA â€” Mosteller',shortName:'BSA Mosteller',categoryId: 'general-medicine',description:'Body surface area using the Mosteller formula.',type:'calculation',
inputs:[{id:'height',label:'Height',unit:'cm',min:30,max:250,step:0.1},{id:'weight',label:'Weight',unit:'kg',min:1,max:300,step:0.1}],
calculate(v){return{value:Math.sqrt((Number(v.height)*Number(v.weight))/3600),unit:'mÂ²'}}
};export default calc

