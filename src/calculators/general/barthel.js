const calc={
 id:'barthel',name:'Barthel Index',shortName:'Barthel',categoryId:'general',
 description:'Weighted Barthel Index for activities of daily living.',type:'score',
 inputs:[
  {id:'feeding',label:'Feeding',type:'choice',options:[{value:0,label:'Dependent'},{value:5,label:'Needs help'},{value:10,label:'Independent'}],optionsLayout:'stack'},
  {id:'bathing',label:'Bathing',type:'choice',options:[{value:0,label:'Dependent'},{value:5,label:'Independent'}],optionsLayout:'stack'},
  {id:'grooming',label:'Grooming',type:'choice',options:[{value:0,label:'Dependent'},{value:5,label:'Independent'}],optionsLayout:'stack'},
  {id:'dressing',label:'Dressing',type:'choice',options:[{value:0,label:'Dependent'},{value:5,label:'Needs help'},{value:10,label:'Independent'}],optionsLayout:'stack'},
  {id:'bowels',label:'Bowels',type:'choice',options:[{value:0,label:'Incontinent'},{value:5,label:'Occasional accident'},{value:10,label:'Continent'}],optionsLayout:'stack'},
  {id:'bladder',label:'Bladder',type:'choice',options:[{value:0,label:'Incontinent / catheterized'},{value:5,label:'Occasional accident'},{value:10,label:'Continent'}],optionsLayout:'stack'},
  {id:'toilet',label:'Toilet use',type:'choice',options:[{value:0,label:'Dependent'},{value:5,label:'Needs help'},{value:10,label:'Independent'}],optionsLayout:'stack'},
  {id:'transfer',label:'Transfers bed ↔ chair',type:'choice',options:[{value:0,label:'Unable'},{value:5,label:'Major help'},{value:10,label:'Minor help'},{value:15,label:'Independent'}],optionsLayout:'stack'},
  {id:'mobility',label:'Mobility on level surface',type:'choice',options:[{value:0,label:'Immobile'},{value:5,label:'Wheelchair independent'},{value:10,label:'Walks with help'},{value:15,label:'Independent'}],optionsLayout:'stack'},
  {id:'stairs',label:'Stairs',type:'choice',options:[{value:0,label:'Unable'},{value:5,label:'Needs help'},{value:10,label:'Independent'}],optionsLayout:'stack'}
 ],
 calculate(v){const value=Object.values(v).reduce((s,x)=>s+Number(x),0);return{value,unit:'/100',interpretation:value>=90?'Independent / minimal dependence':value>=60?'Moderate dependence':value>=40?'Severe dependence':'Total dependence'}}
};
export default calc;