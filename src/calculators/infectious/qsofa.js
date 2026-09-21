const calc={id:'qsofa',name:'qSOFA',shortName:'qSOFA',categoryId:'infectious',description:'Quick Sequential Organ Failure Assessment.',type:'score',
inputs:[{id:'rr',label:'Respiratory rate ≥22/min?',type:'boolean'},{id:'sbp',label:'Systolic BP ≤100 mmHg?',type:'boolean'},{id:'mental',label:'Altered mentation?',type:'boolean'}],
calculate(v){const s=Object.values(v).filter(Boolean).length;return{value:s,unit:'/3',interpretation:s>=2?'qSOFA ≥2':'qSOFA <2',note:'qSOFA is not a standalone sepsis diagnostic test.'}}
};export default calc