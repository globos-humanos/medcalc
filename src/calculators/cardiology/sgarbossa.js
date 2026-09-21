const calc={
 id:'sgarbossa',name:'Sgarbossa Criteria',shortName:'Sgarbossa',categoryId:'cardiology',
 description:'Original Sgarbossa criteria for suspected MI with LBBB or ventricular pacing.',type:'score',
 inputs:[
  {id:'concordantSt',label:'Concordant ST elevation ≥1 mm?',type:'boolean'},
  {id:'concordantDep',label:'Concordant ST depression ≥1 mm in V1–V3?',type:'boolean'},
  {id:'discordantSt',label:'Discordant ST elevation ≥5 mm?',type:'boolean'}
 ],
 calculate(v){const value=(v.concordantSt?5:0)+(v.concordantDep?3:0)+(v.discordantSt?2:0);return{value,unit:'points',interpretation:value>=3?'Original Sgarbossa positive':'Original Sgarbossa not positive',note:'Smith-modified Sgarbossa uses proportional discordance and is not calculated by this original-criteria version.'}}
};
export default calc;