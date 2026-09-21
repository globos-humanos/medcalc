const fisher={id:'fisher',name:'Fisher Grade',shortName:'Fisher',categoryId:'neurology',description:'CT blood burden classification in subarachnoid hemorrhage.',type:'score',
inputs:[{id:'grade',label:'CT finding',type:'choice',options:[{value:1,label:'No blood detected'},{value:2,label:'Diffuse thin SAH <1 mm'},{value:3,label:'Localized clot or thick SAH >1 mm'},{value:4,label:'Intraventricular or intracerebral blood with diffuse/thin SAH'}],optionsLayout:'stack'}],
calculate(v){return{value:Number(v.grade),unit:'grade',interpretation:`Fisher grade ${v.grade}`}}
};export default fisher