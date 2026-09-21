const sflt={id:'sflt1-plgf',name:'sFlt-1 / PlGF Ratio',shortName:'sFlt-1/PlGF',categoryId:'obgyn',description:'Angiogenic marker ratio used in pre-eclampsia assessment.',type:'calculation',
inputs:[{id:'sflt',label:'sFlt-1',unit:'pg/mL',min:0,max:100000},{id:'plgf',label:'PlGF',unit:'pg/mL',min:0.1,max:10000,step:0.1}],
calculate(v){return{value:Number(v.sflt)/Number(v.plgf),unit:'ratio',note:'Cutoffs are assay- and gestational-age-specific; use the validated assay pathway.'}}
};export default sflt