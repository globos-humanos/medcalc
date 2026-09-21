const niss={id:'niss',name:'New Injury Severity Score',shortName:'NISS',categoryId:'emergency',description:'Squares the three highest AIS injury severities regardless of body region.',type:'score',
inputs:[0,1,2].map(i=>({id:`ais${i}`,label:`AIS injury ${i+1}`,min:0,max:6,step:1})),
calculate(v){const s=Object.values(v).map(Number).sort((a,b)=>b-a).slice(0,3).reduce((a,b)=>a+b*b,0);return{value:s,unit:'NISS',note:'Requires AIS-coded injuries.'}}
};export default niss