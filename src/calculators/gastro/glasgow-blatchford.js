const glasgowBlatchford = {
  id: 'glasgow-blatchford',
  name: 'Glasgow-Blatchford Bleeding Score',
  shortName: 'GBS',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description: 'Stratifies upper gastrointestinal bleeding risk before endoscopy using clinical and laboratory findings.',
  keywords: ['Glasgow-Blatchford', 'GBS', 'GI bleed', 'upper GI bleeding', 'UGIB'],
  aliases: ['GBS', 'Glasgow Blatchford Score'],
  inputs: [
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]
    },
    { id: 'hemoglobin', label: 'Hemoglobin', type: 'number', unit: 'g/dL', min: 1, step: 0.1 },
    { id: 'bun', label: 'Blood Urea Nitrogen', type: 'number', unit: 'mmol/L', min: 0, step: 0.1, placeholder: 'Urea (mmol/L)' },
    { id: 'sbp', label: 'Initial Systolic BP', type: 'number', unit: 'mmHg', min: 40, step: 1 },
    { id: 'pulse100', label: 'Heart rate ≥100/min', type: 'boolean' },
    { id: 'melena', label: 'Melena', type: 'boolean' },
    { id: 'syncope', label: 'Recent syncope', type: 'boolean' },
    { id: 'hepatic', label: 'Hepatic disease', type: 'boolean' },
    { id: 'heartFailure', label: 'Cardiac failure', type: 'boolean' }
  ],
  calculate(values) {
    const hb = Number(values.hemoglobin)
    const bun = Number(values.bun)
    const sbp = Number(values.sbp)

    if (!values.sex || !Number.isFinite(hb) || !Number.isFinite(bun) || !Number.isFinite(sbp)) {
      return { error: 'Please enter sex, hemoglobin, BUN/urea, and systolic BP.' }
    }

    const boolIds = ['pulse100', 'melena', 'syncope', 'hepatic', 'heartFailure']
    if (boolIds.some(id => typeof values[id] !== 'boolean')) {
      return { error: 'Please answer all clinical GBS criteria.' }
    }

    let score = 0

    if (bun >= 25) score += 6
    else if (bun >= 10) score += 4
    else if (bun >= 8) score += 3
    else if (bun >= 6.5) score += 2

    if (values.sex === 'male') {
      if (hb < 10) score += 6
      else if (hb < 12) score += 3
      else if (hb < 13) score += 1
    } else {
      if (hb < 10) score += 6
      else if (hb < 12) score += 1
    }

    if (sbp < 90) score += 3
    else if (sbp < 100) score += 2
    else if (sbp < 110) score += 1

    if (values.pulse100) score += 1
    if (values.melena) score += 1
    if (values.syncope) score += 2
    if (values.hepatic) score += 2
    if (values.heartFailure) score += 2

    return {
      value: score,
      displayValue: String(score),
      unit: 'points',
      category: score <= 1 ? 'Low-risk range' : 'Higher-risk range'
    }
  },
  references: [
    'Blatchford O, et al. A risk score to predict the need for treatment for upper-gastrointestinal haemorrhage. Lancet. 2000;356:1318–1321.',
    'MDCalc — Glasgow-Blatchford Bleeding Score.'
  ]
}

export default glasgowBlatchford
