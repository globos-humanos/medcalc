const calc={
 id:'nutric',name:'NUTRIC Score',shortName:'NUTRIC',categoryId:'icu',
 description:'Original NUTRIC / modified NUTRIC scoring with optional IL-6.',type:'score',
 inputs:[
  {id:'age',label:'Age',unit:'years',min:18,max:120},{id:'apache',label:'APACHE II score',min:0,max:71},
  {id:'sofa',label:'SOFA score',min:0,max:24},{id:'comorbidity',label:'Number of comorbidities',min:0,max:20},
  {id:'days',label:'Days from hospital admission to ICU admission',unit:'days',min:0,max:100,step:0.1},
  {id:'il6',label:'IL-6 available?',type:'boolean'},{id:'il6value',label:'IL-6',unit:'pg/mL',min:0,max:100000}
 ],
 calculate(v){
  const age=+v.age,ap=+v.apache,sofa=+v.sofa,com=+v.comorbidity,days=+v.days,il6=+v.il6value;
  const value=(age<50?0:age<75?1:2)+(ap<15?0:ap<20?1:ap<28?2:3)+(sofa<6?0:sofa<10?1:2)+(com>=2?1:0)+(days>=1?1:0)+(v.il6?(il6<400?0:1):0);
  const max=v.il6?10:9, high=v.il6?value>=6:value>=5;
  return{value,unit:`/${max}`,interpretation:high?'High nutritional risk':'Low nutritional risk',note:v.il6?'Original NUTRIC with IL-6':'Modified NUTRIC without IL-6'};
 }
};
export default calc;