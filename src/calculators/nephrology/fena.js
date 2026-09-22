const fena = {
  id:'fena',
  name:'Fractional Excretion of Sodium',
  shortName:'FENa',
  type:'calculation',
  categoryId:'nephrology',
  category:'Nephrology',
  description:'Fractional excretion of sodium from paired serum and urine measurements.',
  keywords:['FENa','AKI','sodium'],

  inputs:[
    {id:'urineNa',label:'Urine sodium',type:'number',unit:'mmol/L',min:0,step:0.1},
    {id:'serumNa',label:'Serum sodium',type:'number',unit:'mmol/L',min:50,max:250,step:0.1},
    {id:'urineCr',label:'Urine creatinine',type:'number',unit:'mg/dL',min:0.1,step:0.1},
    {id:'serumCr',label:'Serum creatinine',type:'number',unit:'mg/dL',min:0.1,step:0.01}
  ],

  calculate(v){
    const value=
      100*
      (Number(v.urineNa)*Number(v.serumCr))/
      (Number(v.serumNa)*Number(v.urineCr))

    return {
      value,
      displayValue:value.toFixed(2),
      unit:'%',
      category:
        value<1?'Low FENa':
        value<=2?'Intermediate range':
        'Higher FENa',
      interpretation:`FENa = ${value.toFixed(2)}%.`,
      note:'FENa is context-dependent and can be misleading with diuretics, CKD, glomerular disease and some other clinical settings.'
    }
  },

  references:['Fractional excretion of sodium equation']
}

export default fena
