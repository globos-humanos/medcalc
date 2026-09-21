const calc={id:'tbw',name:'Total Body Water',shortName:'TBW',categoryId:'nephrology',description:'Estimated total body water from weight and sex.',type:'calculation',
inputs:[{id:'weight',label:'Body weight',unit:'kg',min:1,max:300},{id:'sex',label:'Sex',type:'choice',options:[{value:'male',label:'Male'},{value:'female',label:'Female'}]}],
calculate(v){const value=Number(v.weight)*(v.sex==='male'?0.6:0.5);return{value,unit:'L',note:'Fixed coefficients are approximations and should be adjusted for age/body composition when appropriate.'}}
};export default calc