const calc={id:'pao2-fio2',name:'P/F Ratio',shortName:'P/F Ratio',categoryId:'respiratory',description:'PaO₂ to FiO₂ ratio.',type:'calculation',
inputs:[{id:'pao2',label:'PaO₂',unit:'mmHg',min:20,max:800},{id:'fio2',label:'FiO₂',unit:'fraction',min:0.21,max:1,step:0.01}],
calculate(v){return{value:Number(v.pao2)/Number(v.fio2),unit:'mmHg',note:'Enter FiO₂ as a fraction, e.g. 0.40 for 40%.'}}
};export default calc