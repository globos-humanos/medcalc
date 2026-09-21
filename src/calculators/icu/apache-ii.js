const calc={
 id:'apache-ii',name:'APACHE II',shortName:'APACHE II',categoryId:'icu',
 description:'Acute Physiology and Chronic Health Evaluation II.',type:'score',
 inputs:[
  {id:'temp',label:'Temperature',unit:'°C',min:25,max:45,step:0.1},{id:'map',label:'Mean arterial pressure',unit:'mmHg',min:20,max:300},
  {id:'hr',label:'Heart rate',unit:'/min',min:20,max:250},{id:'rr',label:'Respiratory rate',unit:'/min',min:0,max:80},
  {id:'oxygenMode',label:'Oxygenation assessment',type:'choice',options:[{value:'low',label:'FiO₂ <0.50'},{value:'high',label:'FiO₂ ≥0.50'}],optionsLayout:'stack'},
  {id:'pao2',label:'PaO₂',unit:'mmHg',min:20,max:800},{id:'aado2',label:'A–aDO₂',unit:'mmHg',min:0,max:700},
  {id:'arterialPh',label:'Arterial pH',min:6.5,max:8,step:0.01},{id:'na',label:'Sodium',unit:'mmol/L',min:80,max:220},
  {id:'k',label:'Potassium',unit:'mmol/L',min:1,max:15,step:0.1},{id:'creatinine',label:'Creatinine',unit:'mg/dL',min:0.1,max:20,step:0.1},
  {id:'acuteRenal',label:'Acute renal failure?',type:'boolean'},{id:'hct',label:'Hematocrit',unit:'%',min:5,max:70,step:0.1},
  {id:'wbc',label:'WBC',unit:'×10⁹/L',min:0,max:100,step:0.1},{id:'gcs',label:'GCS',min:3,max:15},{id:'age',label:'Age',unit:'years',min:18,max:120}
 ],
 calculate(v){
  const temp=+v.temp,map=+v.map,hr=+v.hr,rr=+v.rr,pao2=+v.pao2,aado2=+v.aado2,ph=+v.arterialPh,na=+v.na,k=+v.k,cr=+v.creatinine,hct=+v.hct,wbc=+v.wbc,gcs=+v.gcs,age=+v.age;
  const t=temp>=41?4:temp>=39?3:temp>=38.5?1:temp>=36?0:temp>=34?1:temp>=32?2:temp>=30?3:4;
  const m=map>=160?4:map>=130?3:map>=110?2:map>=70?0:map>=50?2:3;
  const h=hr>=180?4:hr>=140?3:hr>=110?2:hr>=70?0:hr>=55?2:hr>=40?3:4;
  const r=rr>=50?3:rr>=35?1:rr>=25?0:rr>=12?0:rr>=10?1:4;
  const oxy=v.oxygenMode==='high'?(aado2>=500?3:aado2>=350?2:aado2>=200?1:0):(pao2>=70?0:pao2>=61?1:pao2>=55?3:4);
  const p=ph>=7.7?4:ph>=7.6?3:ph>=7.5?1:ph>=7.33?0:ph>=7.25?2:ph>=7.15?3:4;
  const n=na>=180?4:na>=160?1:na>=155?1:na>=130?0:na>=120?2:3;
  const kk=k>=7?4:k>=6?3:k>=5.5?1:k>=3.5?0:k>=3?1:2;
  let c=cr>=3.5?4:cr>=2?3:cr>=1.5?2:0;if(v.acuteRenal)c*=2;
  const hh=hct>=60?4:hct>=50?2:hct>=46?1:hct>=30?0:hct>=20?2:4;
  const ww=wbc>=40?4:wbc>=20?1:wbc>=15?1:wbc>=3?0:wbc>=1?2:4;
  const total=t+m+h+r+oxy+p+n+kk+c+hh+ww+(15-gcs)+(age>=75?6:age>=65?5:age>=55?3:age>=45?2:0);
  return{value:total,unit:'points',interpretation:`APACHE II ${total}/71`,note:'When FiO₂ ≥0.50, APACHE II oxygenation scoring uses A–aDO₂: ≥500=3, 350–499=2, 200–349=1, <200=0.'};
 }
};
export default calc;