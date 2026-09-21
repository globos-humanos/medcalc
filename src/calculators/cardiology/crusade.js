const calc={
 id:'crusade',name:'CRUSADE Bleeding Score',shortName:'CRUSADE',categoryId:'cardiology',
 description:'Published CRUSADE in-hospital major bleeding score for NSTE-ACS.',type:'score',
 inputs:[
  {id:'hematocrit',label:'Baseline hematocrit',unit:'%',min:5,max:70,step:0.1},
  {id:'crcl',label:'Creatinine clearance',unit:'mL/min',min:0,max:250,step:0.1},
  {id:'hr',label:'Heart rate',unit:'/min',min:20,max:250},{id:'sbp',label:'Systolic BP',unit:'mmHg',min:30,max:300},
  {id:'sex',label:'Sex',type:'choice',options:[{value:'male',label:'Male'},{value:'female',label:'Female'}]},
  {id:'chf',label:'Signs of CHF at presentation',type:'boolean'},{id:'vascular',label:'Prior vascular disease',type:'boolean'},{id:'diabetes',label:'Diabetes mellitus',type:'boolean'}
 ],
 calculate(v){
  const h=+v.hematocrit,c=+v.crcl,hr=+v.hr,sbp=+v.sbp;
  const hp=h<31?9:h<34?7:h<37?3:h<40?2:0;
  const cp=c<=15?39:c<=30?35:c<=60?28:c<=90?17:c<=120?7:0;
  const hrp=hr<=70?0:hr<=80?1:hr<=90?3:hr<=100?6:hr<=110?8:hr<=120?10:11;
  const bp=sbp<=90?10:sbp<=100?8:sbp<=120?5:sbp<=180?1:sbp<=200?3:5;
  const value=hp+cp+hrp+bp+(v.sex==='female'?8:0)+(v.chf?7:0)+(v.vascular?6:0)+(v.diabetes?6:0);
  return{value,unit:'points',interpretation:value<=20?'Low risk range':value<=40?'Moderate risk range':value<=60?'High risk range':'Very high risk range',note:'CRUSADE was developed for NSTE-ACS in-hospital major bleeding risk.'};
 }
};
export default calc;