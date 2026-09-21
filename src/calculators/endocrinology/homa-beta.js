const calc={id:'homa-beta',name:'HOMA-β',shortName:'HOMA-β',categoryId:'endocrinology',description:'Homeostatic estimate of beta-cell function.',type:'calculation',
inputs:[{id:'glucose',label:'Fasting glucose',unit:'mg/dL',min:20,max:1000,step:0.1},{id:'insulin',label:'Fasting insulin',unit:'µU/mL',min:0,max:500,step:0.1}],
calculate(v){const value=(360*Number(v.insulin))/(Number(v.glucose)-63);return{value,unit:'%',note:'Formula assumes glucose in mg/dL; values become unstable near glucose 63 mg/dL.'}}
};export default calc