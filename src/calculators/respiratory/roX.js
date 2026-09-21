const calc={id:'rox',name:'ROX Index',shortName:'ROX',categoryId:'respiratory',description:'ROX index for patients receiving high-flow nasal cannula.',type:'calculation',
inputs:[{id:'spo2',label:'SpO₂',unit:'%',min:50,max:100},{id:'fio2',label:'FiO₂',unit:'fraction',min:0.21,max:1,step:0.01},{id:'rr',label:'Respiratory rate',unit:'/min',min:1,max:80}],
calculate(v){return{value:(Number(v.spo2)/Number(v.fio2))/Number(v.rr),unit:'ROX index'}}
};export default calc