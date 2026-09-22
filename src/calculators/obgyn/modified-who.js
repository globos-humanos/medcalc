const modifiedWho = {
  id: 'modified-who',
  name: 'Modified WHO 2.0 Classification',
  shortName: 'mWHO 2.0',
  categoryId: 'obgyn',
  description: 'Reference-based mWHO 2.0 maternal cardiovascular risk classification for selected common diagnoses.',
  type: 'score',

  inputs: [
    {
      id: 'diagnosis',
      label: 'Cardiac condition',
      type: 'choice',
      options: [
        {
          value: 'simple',
          label: 'Successfully repaired simple ASD/VSD/PDA/APVR without significant residual lesion'
        },
        {
          value: 'ectopic',
          label: 'Isolated atrial or ventricular ectopic beats'
        },
        {
          value: 'unoperated-septal',
          label: 'Uncomplicated unoperated ASD/VSD'
        },
        {
          value: 'repaired-tof',
          label: 'Repaired tetralogy of Fallot without significant residual disease'
        },
        {
          value: 'repaired-tga',
          label: 'Arterial-switch TGA without significant residual disease'
        },
        {
          value: 'systemic-rv',
          label: 'Systemic right ventricle with good or mildly decreased function'
        },
        {
          value: 'fontan',
          label: 'Uncomplicated Fontan circulation with good function'
        },
        {
          value: 'moderate-lv',
          label: 'Moderate LV impairment, EF 30-45%'
        },
        {
          value: 'severe-lv',
          label: 'Severe LV impairment, EF <30% or NYHA III-IV'
        },
        {
          value: 'pah',
          label: 'Pulmonary arterial hypertension'
        },
        {
          value: 'mechanical',
          label: 'Uncomplicated mechanical valve with stable controlled INR'
        },
        {
          value: 'severe-ms',
          label: 'Severe mitral stenosis'
        },
        {
          value: 'severe-as',
          label: 'Severe symptomatic aortic stenosis'
        },
        {
          value: 'eisenmenger',
          label: 'Eisenmenger syndrome'
        },
        {
          value: 'other',
          label: 'Other or complex cardiovascular condition'
        }
      ]
    }
  ],

  calculate(v) {
    const map = {
      simple: 'I',
      ectopic: 'I',
      'unoperated-septal': 'II',
      'repaired-tof': 'II',
      'repaired-tga': 'II',
      'systemic-rv': 'II-III',
      fontan: 'II-III',
      'moderate-lv': 'II-III',
      'severe-lv': 'III',
      pah: 'III',
      mechanical: 'III',
      'severe-ms': 'IV',
      'severe-as': 'IV',
      eisenmenger: 'IV'
    };

    if (v.diagnosis === 'other') {
      return {
        value: 'Requires specialist classification',
        unit: 'mWHO 2.0',
        interpretation: 'Do not infer the class from this calculator',
        note: 'The mWHO 2.0 classification contains detailed diagnosis-specific categories. Complex or unlisted disease should be classified using the complete guideline table.'
      };
    }

    const cls = map[v.diagnosis];

    const descriptions = {
      I: 'No detectable increased risk of maternal mortality with no or mild increase in morbidity.',
      II: 'Small increased risk of maternal mortality or moderate increase in morbidity.',
      'II-III': 'Intermediate increased risk of maternal mortality or moderate to severe increase in morbidity.',
      III: 'Significantly increased risk of maternal mortality or severe morbidity.',
      IV: 'Extremely high risk of maternal mortality or severe morbidity.'
    };

    return {
      value: `mWHO ${cls}`,
      unit: 'classification',
      interpretation: descriptions[cls],
      note: 'mWHO 2.0 is diagnosis based and should be interpreted using the complete classification. This calculator contains selected common diagnoses rather than the complete table.'
    };
  }
};

export default modifiedWho;