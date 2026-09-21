const calc={
 id:'zahara',name:'ZAHARA Score',shortName:'ZAHARA',categoryId:'obgyn',
 description:'Weighted ZAHARA risk score for pregnancy in congenital heart disease.',type:'score',
 inputs:[
  {id:'arrhythmia',label:'History of arrhythmia',type:'boolean'},{id:'meds',label:'Cardiovascular medication before pregnancy',type:'boolean'},
  {id:'nyha',label:'NYHA functional class ≥II',type:'boolean'},{id:'left',label:'Left-sided heart obstruction',type:'boolean'},
  {id:'systemicRegurg',label:'Moderate/severe systemic AV valve regurgitation',type:'boolean'},
  {id:'subpulmonaryRegurg',label:'Moderate/severe subpulmonary AV valve regurgitation',type:'boolean'},
  {id:'mechanical',label:'Mechanical valve prosthesis',type:'boolean'},{id:'cyanotic',label:'Cyanotic heart disease',type:'boolean'}
 ],
 calculate(v){const value=(v.arrhythmia?1.5:0)+(v.meds?1.5:0)+(v.nyha?0.75:0)+(v.left?2.5:0)+(v.systemicRegurg?0.75:0)+(v.subpulmonaryRegurg?0.75:0)+(v.mechanical?4.25:0)+(v.cyanotic?1:0);const risk=value<=0.5?2.9:value<=1.5?7.5:value<=2.5?17.5:value<=3.5?43.1:70;return{value,unit:'points',interpretation:`ZAHARA predicted event risk band: ${risk}%`}}
};
export default calc;