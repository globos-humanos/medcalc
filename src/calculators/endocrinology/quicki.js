const quicki={id:'quicki',name:'QUICKI',shortName:'QUICKI',categoryId:'endocrinology',description:'Quantitative Insulin Sensitivity Check Index.',type:'calculation',
inputs:[{id:'glucose',label:'Fasting glucose',unit:'mg/dL',min:20,max:1000,step:0.1},{id:'insulin',label:'Fasting insulin',unit:'µU/mL',min:0.1,max:500,step:0.1}],
calculate(v){const value=1/(Math.log10(Number(v.glucose))+Math.log10(Number(v.insulin)));return{value,unit:'QUICKI'}}
};export default quicki