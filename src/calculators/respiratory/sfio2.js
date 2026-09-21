const calc={id:'sf-ratio',name:'S/F Ratio',shortName:'S/F Ratio',categoryId:'respiratory',description:'SpO₂ to FiO₂ ratio.',type:'calculation',
inputs:[{id:'spo2',label:'SpO₂',unit:'%',min:50,max:100},{id:'fio2',label:'FiO₂',unit:'fraction',min:0.21,max:1,step:0.01}],
calculate(v){return{value:Number(v.spo2)/Number(v.fio2),unit:'ratio'}}
};export default calc