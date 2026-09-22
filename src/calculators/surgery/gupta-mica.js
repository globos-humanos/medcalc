const surgeryCoefficients = {
  hernia: 0,
  anorectal: -0.16,
  aortic: 1.60,
  bariatric: -0.25,
  brain: 1.40,
  breast: -1.61,
  cardiac: 1.01,
  ent: 0.71,
  foregut: 1.39,
  gbaas: 0.59,
  intestinal: 1.14,
  neck: 0.18,
  obgyn: 0.76,
  orthopedic: 0.80,
  otherAbdomen: 1.13,
  peripheral: 0.86,
  skin: 0.54,
  spine: 0.21,
  thoracic: 0.40,
  vein: -1.09,
  urology: -0.26
}

const asaCoefficients = {
  1: -5.17,
  2: -3.29,
  3: -1.92,
  4: -0.95,
  5: 0
}

const calc = {
  id: 'gupta-mica',
  name: 'Gupta MICA Risk Model',
  shortName: 'Gupta MICA',
  categoryId: 'surgery',
  description: 'Gupta perioperative myocardial infarction or cardiac arrest logistic model.',
  type: 'score',

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      unit: 'years',
      min: 18,
      max: 120,
      step: 1
    },
    {
      id: 'functional',
      label: 'Functional status',
      type: 'choice',
      options: [
        { value: 0, label: 'Independent' },
        { value: 0.65, label: 'Partially dependent' },
        { value: 1.03, label: 'Totally dependent' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'asa',
      label: 'ASA physical status',
      type: 'choice',
      options: [
        { value: 1, label: 'I' },
        { value: 2, label: 'II' },
        { value: 3, label: 'III' },
        { value: 4, label: 'IV' },
        { value: 5, label: 'V' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'creatinine',
      label: 'Preoperative creatinine',
      type: 'choice',
      options: [
        { value: 0, label: '≤1.5 mg/dL' },
        { value: 0.61, label: '>1.5 mg/dL' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'surgery',
      label: 'Procedure category',
      type: 'choice',
      options: [
        { value: 'hernia', label: 'Hernia repair' },
        { value: 'anorectal', label: 'Anorectal' },
        { value: 'aortic', label: 'Aortic' },
        { value: 'bariatric', label: 'Bariatric' },
        { value: 'brain', label: 'Brain' },
        { value: 'breast', label: 'Breast' },
        { value: 'cardiac', label: 'Cardiac' },
        { value: 'ent', label: 'ENT' },
        { value: 'foregut', label: 'Foregut / hepatopancreatobiliary' },
        { value: 'gbaas', label: 'Gallbladder / appendix / adrenal / spleen' },
        { value: 'intestinal', label: 'Intestinal' },
        { value: 'neck', label: 'Neck' },
        { value: 'obgyn', label: 'Obstetric / gynecologic' },
        { value: 'orthopedic', label: 'Orthopedic' },
        { value: 'otherAbdomen', label: 'Other abdominal' },
        { value: 'peripheral', label: 'Peripheral vascular' },
        { value: 'skin', label: 'Skin' },
        { value: 'spine', label: 'Spine' },
        { value: 'thoracic', label: 'Thoracic' },
        { value: 'vein', label: 'Vein' },
        { value: 'urology', label: 'Urology' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    const age = Number(v.age)
    const asa = Number(v.asa)

    if (!Number.isFinite(age) || !asaCoefficients[asa] || !surgeryCoefficients[v.surgery]) {
      return { error: 'Enter all Gupta MICA inputs.' }
    }

    const logit =
      -5.25 +
      (0.02 * age) +
      Number(v.functional || 0) +
      asaCoefficients[asa] +
      Number(v.creatinine || 0) +
      surgeryCoefficients[v.surgery]

    const probability = 100 * Math.exp(logit) / (1 + Math.exp(logit))

    return {
      value: Number(probability.toFixed(2)),
      unit: '% predicted 30-day MICA risk',
      interpretation: 'Gupta MICA estimated probability',
      note: 'MICA refers to perioperative myocardial infarction or cardiac arrest. This model does not provide a universal treatment or surgical-clearance threshold.'
    }
  }
}

export default calc
