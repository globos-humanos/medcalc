const marshallCt = {
  id:'marshall-ct',
  name:'Marshall CT Classification',
  shortName:'Marshall CT',
  type:'score',
  categoryId:'neurology',
  category:'Neurology',
  description:'CT classification system for traumatic brain injury.',
  keywords:['Marshall CT','TBI','traumatic brain injury'],

  inputs:[
    {
      id:'class',
      label:'Marshall CT classification',
      type:'choice',
      options:[
        {value:'I',label:'I — No visible intracranial pathology'},
        {value:'II',label:'II — Cisterns present; midline shift 0–5 mm; no high- or mixed-density lesion >25 mL'},
        {value:'III',label:'III — Cisterns compressed/absent; midline shift 0–5 mm; no high- or mixed-density lesion >25 mL'},
        {value:'IV',label:'IV — Midline shift >5 mm; no high- or mixed-density lesion >25 mL'},
        {value:'V',label:'V — Any surgically evacuated mass lesion'},
        {value:'VI',label:'VI — High- or mixed-density lesion >25 mL not surgically evacuated'}
      ],
      optionsLayout:'stack'
    }
  ],

  calculate(v){
    return {
      value:v.class,
      displayValue:`Class ${v.class}`,
      unit:'Marshall',
      category:`Marshall CT Class ${v.class}`,
      interpretation:`Marshall CT Classification ${v.class}.`,
      note:'Marshall classification is based on CT findings in traumatic brain injury and should be assigned from the actual imaging characteristics.'
    }
  },

  references:['Marshall et al. A new classification of head injury based on computerized tomography']
}

export default marshallCt
