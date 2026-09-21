const calc={id:'expected-paco2-alkalosis',name:'Expected PaCO₂ in Metabolic Alkalosis',shortName:'Metabolic Alkalosis',categoryId:'respiratory',description:'Estimated respiratory compensation in metabolic alkalosis.',type:'calculation',
inputs:[{id:'hco3',label:'Serum bicarbonate',unit:'mmol/L',min:24,max:60}],
calculate(v){const value=40+0.7*(Number(v.hco3)-24);return{value,unit:'mmHg',note:'Expected PaCO₂ is approximate; compensation usually does not exceed roughly 55 mmHg.'}}
};export default calc