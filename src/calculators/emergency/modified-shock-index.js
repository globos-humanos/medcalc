const msi={id:'modified-shock-index',name:'Modified Shock Index',shortName:'MSI',categoryId:'emergency',description:'Heart rate divided by mean arterial pressure.',type:'calculation',
inputs:[{id:'hr',label:'Heart rate',unit:'/min',min:20,max:250},{id:'map',label:'Mean arterial pressure',unit:'mmHg',min:20,max:250}],
calculate(v){return{value:Number(v.hr)/Number(v.map),unit:'ratio'}}
};export default msi