const calc = {
  id: 'acs-nsqip',
  name: 'ACS NSQIP Surgical Risk Calculator',
  shortName: 'ACS NSQIP',
  categoryId: 'surgery',
  description: 'Reference entry for the official ACS NSQIP Surgical Risk Calculator. The proprietary/current ACS model is not reproduced or automated here.',
  type: 'calculator',

  inputs: [
    {
      id: 'acknowledged',
      label: 'Official ACS NSQIP calculator should be used for the actual estimate',
      type: 'boolean'
    }
  ],

  calculate(v) {
    if (!v.acknowledged) {
      return {
        error: 'Use the official ACS NSQIP Surgical Risk Calculator for the actual patient-specific estimate.'
      }
    }

    return {
      value: 'External',
      displayValue: 'Official ACS NSQIP calculator',
      unit: '',
      interpretation: 'External validated model',
      note: 'The ACS NSQIP calculator is maintained by the American College of Surgeons. MedCalc does not reproduce or automate its proprietary/current risk model.'
    }
  },

  references: [
    'American College of Surgeons — ACS NSQIP Surgical Risk Calculator'
  ]
}

export default calc
