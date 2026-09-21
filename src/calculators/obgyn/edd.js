const edd={id:'edd',name:'Estimated Date of Delivery',shortName:'EDD',categoryId:'obgyn',description:'Estimated delivery date from first day of the last menstrual period.',type:'calculation',
inputs:[{id:'lmp',label:'First day of LMP',type:'date'}],
calculate(v){if(!v.lmp)return{value:'',unit:''};const d=new Date(`${v.lmp}T00:00:00`);d.setDate(d.getDate()+280);return{value:d.toISOString().slice(0,10),unit:'date',note:'Standard Naegele-style estimate; dating may be adjusted by ultrasound and clinical context.'}}
};export default edd