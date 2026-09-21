const calc={id:'apri',name:'APRI',shortName:'APRI',categoryId:'gastro',description:'AST-to-platelet ratio index.',type:'calculation',
inputs:[{id:'ast',label:'AST',unit:'U/L',min:1,max:10000,step:0.1},{id:'uln',label:'AST upper limit of normal',unit:'U/L',min:1,max:500,step:0.1},{id:'platelets',label:'Platelets',unit:'×10⁹/L',min:1,max:1000}],
calculate(v){const value=((Number(v.ast)/Number(v.uln))/Number(v.platelets))*100;return{value,unit:'APRI',note:'Interpretation depends on disease population and assay reference range.'}}
};export default calc