const surgeryCoefficients={hernia:0,anorectal:-0.16,aortic:1.60,bariatric:-0.25,brain:1.40,breast:-1.61,cardiac:1.01,ent:0.71,foregut:1.39,gbaas:0.59,intestinal:1.14,neck:0.18,obgyn:0.76,orthopedic:0.80,otherAbdomen:1.13,peripheral:0.86,skin:0.54,spine:0.21,thoracic:0.40,vein:-1.09,urology:-0.26};
const calc={
 id:'gupta-mica',name:'Gupta MICA Risk Model',shortName:'Gupta MICA',categoryId:'surgery',
 description:'Published Gupta perioperative myocardial infarction/cardiac arrest logistic model.',type:'score',
 inputs:[
  {id:'age',label:'Age',unit:'years',min:18,max:120},
  {id:'functional',label:'Functional status',type:'choice',options:[{value:0,label:'Independent'},{value:0.65,label:'Partially dependent'},{value:1.03,label:'Totally dependent'}],optionsLayout:'stack'},
  {id:'asa',label:'ASA physical status',type:'choice',options:[{value:-5.17,label:'I'},{value:-3.29,label:'II'},{value:-1.92,label:'III'},{value:-0.95,label:'IV'},{value:0,label:'V'}],optionsLayout:'stack'},
  {id:'creatinine',label:'Preoperative creatinine >1.5 mg/dL?',type:'boolean'},
  {id:'surgery',label:'Procedure category',type:'choice',options:[
   {value:'hernia',label:'Hernia repair'},{value:'anorectal',label:'Anorectal'},{value:'aortic',label:'Aortic'},{value:'bariatric',label:'Bariatric'},
   {value:'brain',label:'Brain'},{value:'breast',label:'Breast'},{value:'cardiac',label:'Cardiac'},{value:'ent',label:'ENT'},
   {value:'foregut',label:'Foregut / HPB'},{value:'gbaas',label:'Gallbladder / appendix / adrenal / spleen'},{value:'intestinal',label:'Intestinal'},
   {value:'neck',label:'Neck / thyroid / parathyroid'},{value:'obgyn',label:'Obstetric / gynecologic'},{value:'orthopedic',label:'Orthopedic'},
   {value:'otherAbdomen',label:'Other abdominal'},{value:'peripheral',label:'Peripheral vascular'},{value:'skin',label:'Skin'},
   {value:'spine',label:'Spine'},{value:'thoracic',label:'Thoracic non-cardiac'},{value:'vein',label:'Vein'},{value:'urology',label:'Urology'}
  ],optionsLayout:'stack'}
 ],
 calculate(v){const x=-5.25+0.02*Number(v.age)+Number(v.functional||0)+Number(v.asa||0)+(v.creatinine?0.61:0)+(surgeryCoefficients[v.surgery]??0);const risk=100*Math.exp(x)/(1+Math.exp(x));return{value:risk,unit:'%',interpretation:`Predicted 30-day MICA risk: ${risk.toFixed(2)}%`}}
};
export default calc;