const calc={id:'serum-osmolality',name:'Calculated Serum Osmolality',shortName:'Serum Osm',categoryId:'nephrology',description:'Calculated serum osmolality.',type:'calculation',
inputs:[{id:'na',label:'Sodium',unit:'mmol/L',min:50,max:250},{id:'glucose',label:'Glucose',unit:'mg/dL',min:0,max:2000},{id:'bun',label:'BUN',unit:'mg/dL',min:0,max:300}],
calculate(v){return{value:2*Number(v.na)+Number(v.glucose)/18+Number(v.bun)/2.8,unit:'mOsm/kg'}}
};export default calc