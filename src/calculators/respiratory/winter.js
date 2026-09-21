const calc={id:'winters-formula',name:'Winter’s Formula',shortName:'Winter’s',categoryId:'respiratory',description:'Expected PaCO₂ compensation in metabolic acidosis.',type:'calculation',
inputs:[{id:'hco3',label:'Serum bicarbonate',unit:'mmol/L',min:1,max:60}],
calculate(v){const value=1.5*Number(v.hco3)+8;return{value,unit:'mmHg',note:'Expected PaCO₂ ≈ 1.5 × HCO₃⁻ + 8 ±2 mmHg.'}}
};export default calc