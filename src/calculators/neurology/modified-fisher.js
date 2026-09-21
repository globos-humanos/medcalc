const mf={id:'modified-fisher',name:'Modified Fisher Scale',shortName:'Modified Fisher',categoryId:'neurology',description:'Modified CT grading for SAH and vasospasm risk.',type:'score',
inputs:[{id:'sah',label:'SAH thickness',type:'choice',options:[{value:0,label:'None'},{value:1,label:'Thin <1 mm'},{value:2,label:'Thick ≥1 mm'}],optionsLayout:'stack'},{id:'ivh',label:'Intraventricular hemorrhage?',type:'boolean'}],
calculate(v){const s=Number(v.sah)+(v.ivh?2:0);return{value:s,unit:'grade',interpretation:`Modified Fisher grade ${s}`}}
};export default mf