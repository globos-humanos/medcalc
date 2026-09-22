const caprini={
id:'caprini',
name:'Caprini Risk Assessment Model — 2013',
shortName:'Caprini 2013',
categoryId:'hematology',
description:'2013 Caprini VTE risk assessment model for surgical patients.',
type:'score',
inputs:[
{id:'age4160',label:'Age 41–60 years?',type:'boolean'},
{id:'minorSurgery',label:'Planned minor surgery <45 minutes?',type:'boolean'},
{id:'majorPast',label:'Major surgery >45 minutes within past month?',type:'boolean'},
{id:'varicose',label:'Visible varicose veins?',type:'boolean'},
{id:'ibd',label:'History of inflammatory bowel disease?',type:'boolean'},
{id:'swollenLegs',label:'Swollen legs?',type:'boolean'},
{id:'bmi25',label:'BMI ≥25 kg/m²?',type:'boolean'},
{id:'mi',label:'Myocardial infarction?',type:'boolean'},
{id:'chf',label:'Congestive heart failure?',type:'boolean'},
{id:'infection',label:'Serious infection?',type:'boolean'},
{id:'lungDisease',label:'Existing lung disease?',type:'boolean'},
{id:'mobility72',label:'Bed rest/restricted mobility <72 hours?',type:'boolean'},
{id:'hormone',label:'Current birth control or hormone replacement therapy?',type:'boolean'},
{id:'pregnancy',label:'Pregnancy or postpartum within 1 month?',type:'boolean'},
{id:'pregLoss',label:'Unexplained stillbirth/recurrent pregnancy loss/premature birth with preeclampsia or growth restriction?',type:'boolean'},
{id:'bmi40',label:'BMI >40 kg/m²?',type:'boolean'},
{id:'smoking',label:'Smoking?',type:'boolean'},
{id:'insulinDiabetes',label:'Diabetes requiring insulin?',type:'boolean'},
{id:'chemo',label:'Chemotherapy?',type:'boolean'},
{id:'transfusion',label:'Blood transfusion?',type:'boolean'},
{id:'surgery2h',label:'Surgery lasting >2 hours?',type:'boolean'},
{id:'age6174',label:'Age 61–74 years?',type:'boolean'},
{id:'malignancy',label:'Current or past malignancy?',type:'boolean'},
{id:'majorSurgery',label:'Planned major surgery >45 minutes?',type:'boolean'},
{id:'cast',label:'Immobilizing plaster cast within past month?',type:'boolean'},
{id:'centralLine',label:'Central venous access within past month?',type:'boolean'},
{id:'bed72',label:'Bed rest ≥72 hours?',type:'boolean'},
{id:'age75',label:'Age ≥75 years?',type:'boolean'},
{id:'vteHistory',label:'History of DVT or PE?',type:'boolean'},
{id:'familyVte',label:'Family history of DVT or PE?',type:'boolean'},
{id:'thrombophilia',label:'Known personal/family thrombophilia?',type:'boolean'},
{id:'hipKnee',label:'Elective hip or knee arthroplasty?',type:'boolean'},
{id:'fracture',label:'Hip, pelvis or leg fracture?',type:'boolean'},
{id:'trauma',label:'Serious trauma?',type:'boolean'},
{id:'spinal',label:'Spinal cord injury causing paralysis?',type:'boolean'},
{id:'stroke',label:'Stroke?',type:'boolean'}
],
calculate(v){
let s=0;
[
'age4160','minorSurgery','majorPast','varicose','ibd','swollenLegs','bmi25','mi','chf','infection','lungDisease','mobility72',
'hormone','pregnancy','pregLoss','bmi40','smoking','insulinDiabetes','chemo','transfusion','surgery2h'
].forEach(k=>{if(v[k])s+=1});
['age6174','malignancy','majorSurgery','cast','centralLine','bed72'].forEach(k=>{if(v[k])s+=2});
['age75','vteHistory','familyVte','thrombophilia'].forEach(k=>{if(v[k])s+=3});
['hipKnee','fracture','trauma','spinal','stroke'].forEach(k=>{if(v[k])s+=5});
return{
value:s,
unit:'points',
interpretation:s<=1?'Low risk':s===2?'Moderate risk':s<=4?'High risk':'Highest risk',
note:'2013 Caprini RAM. Add all applicable risk factors; several factors may coexist. The score estimates VTE risk and does not itself prescribe prophylaxis.'
};
}
};
export default caprini