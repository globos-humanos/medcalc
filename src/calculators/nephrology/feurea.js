const feurea = {
  id:'feurea',
  name:'Fractional Excretion of Urea',
  shortName:'FEUrea',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Fractional excretion of urea from paired serum and urine measurements.',
  keywords:['FEUrea','AKI','urea'],

  inputs:[
    {id:'urineUrea',label:'Urine urea',type:'number',unit:'mg/dL',min:0,step:0.1},
    {id:'serumUrea',label:'Serum urea',type:'number',unit:'mg/dL',min:0.1,step:0.1},
    {id:'urineCr',label:'Urine creatinine',type:'number',unit:'mg/dL',min:0.1,step:0.1},
    {id:'serumCr',label:'Serum creatinine',type:'number',unit:'mg/dL',min:0.1,step:0.01}
  ],

  calculate(v){
    const value=
      100*
      (Number(v.urineUrea)*Number(v.serumCr))/
      (Number(v.serumUrea)*Number(v.urineCr))

    return {
      value,
      displayValue:value.toFixed(2),
      unit:'%',
      category:
        value<35?'Lower FEUrea':
        'Higher FEUrea',
      interpretation:`FEUrea = ${value.toFixed(2)}%.`,
      note:'FEUrea can be useful when FENa is confounded by diuretic exposure, but it is not a standalone discriminator of AKI etiology.'
    }
  },

  references:['Fractional excretion of urea equation']
}

export default feurea
