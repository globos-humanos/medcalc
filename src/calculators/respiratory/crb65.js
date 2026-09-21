const calc={id:'crb-65',name:'CRB-65',shortName:'CRB-65',categoryId:'respiratory',description:'Community-acquired pneumonia severity score without laboratory testing.',type:'score',
inputs:[{id:'confusion',label:'Confusion',type:'boolean'},{id:'rr',label:'Respiratory rate ≥30/min',type:'boolean'},{id:'bp',label:'SBP <90 or DBP ≤60 mmHg',type:'boolean'},{id:'age',label:'Age ≥65 years',type:'boolean'}],
calculate(v){const s=Object.values(v).filter(Boolean).length;return{value:s,unit:'/4',interpretation:s===0?'Lower risk':s===1?'Intermediate risk':'Higher risk'}}
};export default calc