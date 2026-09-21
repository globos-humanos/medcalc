const calc={id:'bisap',name:'BISAP Score',shortName:'BISAP',categoryId:'gastro',description:'Bedside Index for Severity in Acute Pancreatitis.',type:'score',
inputs:[{id:'bun',label:'BUN >25 mg/dL?',type:'boolean'},{id:'impaired',label:'Impaired mental status?',type:'boolean'},{id:'sirs',label:'SIRS present?',type:'boolean'},{id:'age',label:'Age >60 years?',type:'boolean'},{id:'effusion',label:'Pleural effusion?',type:'boolean'}],
calculate(v){const s=Object.values(v).filter(Boolean).length;return{value:s,unit:'/5',interpretation:s>=3?'Higher-risk score':'Lower score'}}
};export default calc