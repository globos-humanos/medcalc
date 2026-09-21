const homa={id:'homa-ir',name:'HOMA-IR',shortName:'HOMA-IR',categoryId:'endocrinology',description:'Homeostatic Model Assessment of insulin resistance.',type:'calculation',
inputs:[{id:'glucose',label:'Fasting glucose',unit:'mg/dL',min:20,max:1000,step:0.1},{id:'insulin',label:'Fasting insulin',unit:'µU/mL',min:0,max:500,step:0.1}],
calculate(v){const value=(Number(v.glucose)*Number(v.insulin))/405;return{value,unit:'HOMA-IR',note:'This conventional formula assumes glucose in mg/dL; cutoffs vary by population and assay.'}}
};export default homa