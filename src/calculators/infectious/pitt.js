const calc={
 id:'pitt-bacteremia',name:'Pitt Bacteremia Score',shortName:'Pitt',categoryId:'infectious',
 description:'Published Pitt bacteremia severity score.',type:'score',
 inputs:[
  {id:'temp',label:'Temperature',unit:'°C',min:25,max:45,step:0.1},
  {id:'mental',label:'Mental status',type:'choice',options:[{value:0,label:'Alert'},{value:1,label:'Disoriented'},{value:2,label:'Stuporous'},{value:4,label:'Comatose'}],optionsLayout:'stack'},
  {id:'hypotension',label:'Arterial hypotension',type:'boolean'},{id:'vent',label:'Mechanical ventilation',type:'boolean'},{id:'cardiac',label:'Cardiac arrest',type:'boolean'}
 ],
 calculate(v){const t=+v.temp;const tempPts=t<=35?2:t<36?1:t<39?0:t<40?1:2;const value=tempPts+Number(v.mental||0)+(v.hypotension?2:0)+(v.vent?2:0)+(v.cardiac?4:0);return{value,unit:'points',interpretation:value>=4?'Pitt score ≥4':'Pitt score <4'}}
};
export default calc;