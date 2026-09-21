const iss={id:'iss',name:'Injury Severity Score',shortName:'ISS',categoryId:'emergency',description:'Anatomic trauma severity score using the three most severe AIS injuries from different body regions.',type:'score',
inputs:[0,1,2,3,4,5].map(i=>({id:`r${i}`,label:`Body region ${i+1} AIS`,min:0,max:6,step:1})),
calculate(v){const vals=Object.values(v).map(Number).sort((a,b)=>b-a);const s=vals.slice(0,3).reduce((a,b)=>a+b*b,0);return{value:s,unit:'ISS',note:'True ISS requires AIS-coded injuries by body region; entering generic AIS values is an interface simplification.'}}
};export default iss