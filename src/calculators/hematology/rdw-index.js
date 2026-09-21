const rdw={id:'rdw-index',name:'RDW Index',shortName:'RDWI',categoryId:'hematology',description:'Red-cell distribution width index used in microcytosis assessment.',type:'calculation',
inputs:[{id:'mcv',label:'MCV',unit:'fL',min:1,max:200,step:0.1},{id:'rbc',label:'RBC count',unit:'×10¹²/L',min:0.1,max:20,step:0.1},{id:'rdw',label:'RDW',unit:'%',min:1,max:50,step:0.1}],
calculate(v){const value=Number(v.mcv)*Number(v.rdw)/Number(v.rbc);return{value,unit:'RDWI'}}
};export default rdw