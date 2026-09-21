const calc = {
  id: 'saps-ii', name: 'SAPS II', shortName: 'SAPS II', categoryId: 'icu',
  description: 'Simplified Acute Physiology Score II with published point table and mortality equation.', type: 'score',
  inputs: [
    {id:'age',label:'Age',unit:'years',min:18,max:120},
    {id:'hr',label:'Heart rate',unit:'/min',min:1,max:250},
    {id:'sbp',label:'Systolic blood pressure',unit:'mmHg',min:20,max:300},
    {id:'temp',label:'Temperature',unit:'°C',min:25,max:45,step:0.1},
    {id:'vent',label:'Mechanical ventilation or CPAP within scoring period?',type:'boolean'},
    {id:'pf',label:'PaO₂ / FiO₂',min:0,max:1000},
    {id:'urine',label:'Urine output',unit:'L/day',min:0,max:20,step:0.01},
    {id:'bun',label:'BUN',unit:'mg/dL',min:0,max:300,step:0.1},
    {id:'wbc',label:'WBC',unit:'×10⁹/L',min:0,max:100,step:0.1},
    {id:'k',label:'Potassium',unit:'mmol/L',min:0.5,max:15,step:0.1},
    {id:'na',label:'Sodium',unit:'mmol/L',min:80,max:220},
    {id:'hco3',label:'Bicarbonate',unit:'mmol/L',min:1,max:60,step:0.1},
    {id:'bilirubin',label:'Bilirubin',unit:'mg/dL',min:0,max:100,step:0.1},
    {id:'gcs',label:'GCS',min:3,max:15},
    {id:'chronic',label:'Chronic disease',type:'choice',options:[{value:0,label:'None'},{value:9,label:'Metastatic cancer'},{value:10,label:'Hematologic malignancy'},{value:17,label:'AIDS'}],optionsLayout:'stack'},
    {id:'admission',label:'Admission type',type:'choice',options:[{value:0,label:'Scheduled surgery'},{value:6,label:'Medical'},{value:8,label:'Unscheduled surgery'}],optionsLayout:'stack'}
  ],
  calculate(v) {
    const age=+v.age,hr=+v.hr,sbp=+v.sbp,temp=+v.temp,pf=+v.pf,urine=+v.urine,bun=+v.bun,wbc=+v.wbc,k=+v.k,na=+v.na,hco3=+v.hco3,bili=+v.bilirubin,gcs=+v.gcs;
    const agePts=age<40?0:age<60?7:age<70?12:age<75?15:age<80?16:18;
    const hrPts=hr<40?11:hr<70?2:hr<120?0:hr<160?4:7;
    const sbpPts=sbp<70?13:sbp<100?5:sbp<200?0:2;
    const tempPts=temp>=39?3:0;
    const pfPts=v.vent?(pf<100?11:pf<200?9:6):0;
    const urinePts=urine<0.5?11:urine<1?4:0;
    const bunPts=bun<28?0:bun<84?6:10;
    const wbcPts=wbc<1?12:wbc<20?0:3;
    const kPts=k<3?3:k<5?0:3;
    const naPts=na<125?5:na<145?0:1;
    const hco3Pts=hco3<15?6:hco3<20?3:0;
    const biliPts=bili<4?0:bili<6?4:9;
    const gcsPts=gcs>=14?0:gcs>=11?5:gcs>=9?7:gcs>=6?13:26;
    const total=agePts+hrPts+sbpPts+tempPts+pfPts+urinePts+bunPts+wbcPts+kPts+naPts+hco3Pts+biliPts+gcsPts+Number(v.chronic||0)+Number(v.admission||0);
    const logit=0.0737*total+0.9971*Math.log(total+1)-7.7631;
    const mortality=100*Math.exp(logit)/(1+Math.exp(logit));
    return {value:total,unit:'points',interpretation:`Estimated hospital mortality: ${mortality.toFixed(1)}%`,details:`Logit ${logit.toFixed(3)} • Published SAPS II logistic equation`};
  }
};
export default calc;