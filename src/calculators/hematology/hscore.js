const calc={
 id:'hscore',name:'HScore',shortName:'HScore',categoryId:'hematology',
 description:'Published HScore for probability of reactive hemophagocytic syndrome / secondary HLH.',type:'score',
 inputs:[
  {id:'immuno',label:'Known underlying immunosuppression',type:'boolean'},
  {id:'temp',label:'Temperature',unit:'°C',min:30,max:45,step:0.1},
  {id:'organomegaly',label:'Organomegaly',type:'choice',options:[{value:0,label:'None'},{value:23,label:'Hepatomegaly OR splenomegaly'},{value:38,label:'Both hepatomegaly AND splenomegaly'}],optionsLayout:'stack'},
  {id:'cytopenias',label:'Number of cytopenic lineages',type:'choice',options:[{value:0,label:'1 lineage'},{value:24,label:'2 lineages'},{value:34,label:'3 lineages'}],optionsLayout:'stack'},
  {id:'ferritin',label:'Ferritin',unit:'ng/mL',min:0,max:100000},{id:'triglycerides',label:'Triglycerides',unit:'mmol/L',min:0,max:30,step:0.1},
  {id:'fibrinogen',label:'Fibrinogen',unit:'g/L',min:0,max:10,step:0.1},{id:'ast',label:'AST',unit:'U/L',min:0,max:10000},{id:'hemo',label:'Hemophagocytosis on bone marrow aspirate',type:'boolean'}
 ],
 calculate(v){
  const t=+v.temp,f=+v.ferritin,tg=+v.triglycerides,fb=+v.fibrinogen,ast=+v.ast;
  const value=(v.immuno?18:0)+(t<38.4?0:t<=39.4?33:49)+Number(v.organomegaly||0)+Number(v.cytopenias||0)+(f<2000?0:f<=6000?35:50)+(tg<1.5?0:tg<=4?44:64)+(fb>2.5?0:30)+(ast>=30?19:0)+(v.hemo?35:0);
  return{value,unit:'points',interpretation:value>=169?'HScore ≥169':'HScore <169',note:'HScore estimates probability of secondary/reactive HLH; diagnosis requires clinical context.'};
 }
};
export default calc;