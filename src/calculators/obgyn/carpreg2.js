const calc={
 id:'carpreg-ii',name:'CARPREG II',shortName:'CARPREG II',categoryId:'obgyn',
 description:'Published CARPREG II maternal cardiac complication risk score.',type:'score',
 inputs:[
  {id:'prior',label:'Prior cardiac event or arrhythmia',type:'boolean'},{id:'nyha',label:'Baseline NYHA III–IV or cyanosis',type:'boolean'},
  {id:'mechanical',label:'Mechanical valve',type:'boolean'},{id:'ventricular',label:'Ventricular dysfunction',type:'boolean'},
  {id:'left',label:'High-risk left-sided valve disease / LVOT obstruction',type:'boolean'},{id:'pulm',label:'Pulmonary hypertension',type:'boolean'},
  {id:'cad',label:'Coronary artery disease',type:'boolean'},{id:'aorta',label:'High-risk aortopathy',type:'boolean'},
  {id:'noIntervention',label:'No prior cardiac intervention',type:'boolean'},{id:'late',label:'First pregnancy assessment after 20 weeks',type:'boolean'}
 ],
 calculate(v){const value=(v.prior?3:0)+(v.nyha?3:0)+(v.mechanical?3:0)+(v.ventricular?2:0)+(v.left?2:0)+(v.pulm?2:0)+(v.cad?2:0)+(v.aorta?2:0)+(v.noIntervention?1:0)+(v.late?1:0);const risk=value<=1?5:value===2?10:value===3?15:value===4?22:41;return{value,unit:'points',interpretation:`CARPREG II predicted event risk band: ${risk}%`}}
};
export default calc;