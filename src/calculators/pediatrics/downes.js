const calc={id:'downes',name:'Downes Score',shortName:'Downes',categoryId:'pediatrics',description:'Neonatal respiratory distress score.',type:'score',
inputs:['Respiratory rate','Cyanosis','Air entry','Grunting','Retractions'].map((label,i)=>({id:`d${i}`,label,type:'choice',options:[0,1,2].map(v=>({value:v,label:String(v)})),optionsLayout:'stack'})),
calculate(v){const s=Object.values(v).reduce((a,b)=>a+Number(b),0);return{value:s,unit:'/10',interpretation:s<=3?'Mild':s<=6?'Moderate':'Severe'}}
};export default calc