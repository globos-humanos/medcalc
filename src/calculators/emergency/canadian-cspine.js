const cspine = {
  id: 'canadian-cspine',
  name: 'Canadian C-Spine Rule',
  shortName: 'Canadian C-Spine',
  categoryId: 'emergency',
  category: 'Emergency / Trauma',
  description:
    'Cervical-spine imaging decision rule for alert, stable trauma patients.',
  type: 'decision',

  inputs: [
    {
      id: 'age65',
      label: 'Age ≥65 years',
      type: 'boolean'
    },
    {
      id: 'dangerousMechanism',
      label: 'Dangerous mechanism',
      type: 'boolean'
    },
    {
      id: 'paresthesias',
      label: 'Paresthesias in extremities',
      type: 'boolean'
    },
    {
      id: 'simpleRearEnd',
      label: 'Simple rear-end motor vehicle collision',
      type: 'boolean'
    },
    {
      id: 'sitting',
      label: 'Able to sit in the emergency department',
      type: 'boolean'
    },
    {
      id: 'ambulatory',
      label: 'Ambulatory at any time since injury',
      type: 'boolean'
    },
    {
      id: 'delayedPain',
      label: 'Delayed onset of neck pain',
      type: 'boolean'
    },
    {
      id: 'noMidlineTenderness',
      label: 'No midline cervical-spine tenderness',
      type: 'boolean'
    },
    {
      id: 'rom',
      label: 'Able to actively rotate neck 45° left and right',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const highRisk =
      v.age65 ||
      v.dangerousMechanism ||
      v.paresthesias

    if (highRisk) {
      return {
        value: 'Imaging indicated',
        displayValue: 'Image',
        unit: 'Canadian C-Spine Rule',
        category: 'High-risk factor present',
        note:
          'A high-risk factor is present: age ≥65 years, dangerous mechanism, or extremity paresthesias.'
      }
    }

    const lowRisk =
      v.simpleRearEnd ||
      v.sitting ||
      v.ambulatory ||
      v.delayedPain ||
      v.noMidlineTenderness

    if (!lowRisk) {
      return {
        value: 'Imaging indicated',
        displayValue: 'Image',
        unit: 'Canadian C-Spine Rule',
        category: 'No low-risk factor allowing ROM assessment',
        note:
          'No qualifying low-risk factor is present to proceed to active range-of-motion assessment.'
      }
    }

    if (!v.rom) {
      return {
        value: 'Imaging indicated',
        displayValue: 'Image',
        unit: 'Canadian C-Spine Rule',
        category: 'Unable to rotate neck 45°',
        note:
          'Active rotation 45° left and right is not possible.'
      }
    }

    return {
      value: 'No imaging by rule',
      displayValue: 'No imaging',
      unit: 'Canadian C-Spine Rule',
      category: 'Rule negative',
      note:
        'No high-risk factor is present, at least one low-risk factor permits ROM assessment, and the patient can actively rotate the neck 45° left and right.'
    }
  },

  references: [
    'Stiell IG, et al. The Canadian C-Spine Rule for Radiography in Alert and Stable Trauma Patients. JAMA. 2001;286:1841–1848.',
    'Stiell IG, et al. Implementation of the Canadian C-Spine Rule in the Emergency Department.'
  ]
}

export default cspine
