const mchat={id:'mchat',name:'M-CHAT-R/F',shortName:'M-CHAT-R',categoryId:'pediatrics',description:'Toddler autism screening questionnaire framework.',type:'score',
inputs:Array.from({length:20},(_,i)=>({id:`q${i+1}`,label:`Question ${i+1}: concerning response?`,type:'boolean'})),
calculate(v){const s=Object.values(v).filter(Boolean).length;return{value:s,unit:'/20',note:'M-CHAT-R scoring depends on the exact questionnaire response pattern and follow-up interview; this simplified interface is not a substitute for the official form.'}}
};export default mchat