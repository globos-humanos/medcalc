const calc={id:'corrected-sodium',name:'Corrected Sodium for Hyperglycemia',shortName:'Corrected Na',categoryId:'nephrology',description:'Estimates sodium after accounting for hyperglycemia.',type:'calculation',
inputs:[{id:'na',label:'Measured sodium',unit:'mmol/L',min:80,max:220},{id:'glucose',label:'Glucose',unit:'mg/dL',min:20,max:2000}],
calculate(v){const value=Number(v.na)+1.6*((Number(v.glucose)-100)/100);return{value,unit:'mmol/L',note:'A 2.4 mmol/L correction factor is also used in some references; document which convention is applied.'}}
};export default calc