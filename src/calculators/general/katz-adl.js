const calc={id:'katz-adl',name:'Katz Index of Independence in ADL',shortName:'Katz ADL',categoryId:'general',description:'Functional independence in activities of daily living.',type:'score',
inputs:['Bathing','Dressing','Toileting','Transferring','Continence','Feeding'].map((label,i)=>({id:`k${i}`,label,type:'boolean'})),
calculate(v){const s=Object.values(v).filter(Boolean).length;return{value:s,unit:'/6',interpretation:s===6?'Full independence':s>=4?'Moderate impairment':'Severe functional impairment'}}
};export default calc