const calc={id:'cao2',name:'Arterial Oxygen Content',shortName:'CaO₂',categoryId:'respiratory',description:'Calculated arterial oxygen content.',type:'calculation',
inputs:[{id:'hb',label:'Hemoglobin',unit:'g/dL',min:1,max:25,step:0.1},{id:'sao2',label:'SaO₂',unit:'%',min:0,max:100},{id:'pao2',label:'PaO₂',unit:'mmHg',min:0,max:800}],
calculate(v){const value=1.34*Number(v.hb)*(Number(v.sao2)/100)+0.0031*Number(v.pao2);return{value,unit:'mL O₂/dL'}}
};export default calc