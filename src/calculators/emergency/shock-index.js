const shock={id:'shock-index',name:'Shock Index',shortName:'Shock Index',categoryId:'emergency',description:'Heart rate divided by systolic blood pressure.',type:'calculation',
inputs:[{id:'hr',label:'Heart rate',unit:'/min',min:20,max:250},{id:'sbp',label:'Systolic BP',unit:'mmHg',min:30,max:300}],
calculate(v){return{value:Number(v.hr)/Number(v.sbp),unit:'ratio',note:'Interpret in clinical context; thresholds vary by population.'}}
};export default shock