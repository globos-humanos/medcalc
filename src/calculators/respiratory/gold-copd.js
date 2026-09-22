const calc = {
  id: 'gold-copd',
  name: 'GOLD COPD Assessment',
  shortName: 'GOLD COPD',
  categoryId: 'respiratory',
  description: 'Assesses COPD airflow obstruction and the GOLD ABE clinical group.',
  type: 'score',
  inputs: [
    { id: 'ratio', label: 'Post-bronchodilator FEV1/FVC', type: 'number', unit: '', min: 0.1, max: 1.5, step: 0.01 },
    { id: 'fev1', label: 'Post-bronchodilator FEV1 % predicted', type: 'number', unit: '%', min: 0, max: 150, step: 1 },
    { id: 'mmrc', label: 'mMRC score', type: 'number', unit: '', min: 0, max: 4, step: 1 },
    { id: 'cat', label: 'CAT / CAAT score', type: 'number', unit: 'points', min: 0, max: 40, step: 1 },
    {
      id: 'exacerbations',
      label: 'Moderate/severe exacerbations in previous year',
      type: 'number',
      unit: '',
      min: 0,
      max: 20,
      step: 1
    }
  ],
  calculate(v) {
    const ratio = Number(v.ratio)
    const fev1 = Number(v.fev1)
    const mmrc = Number(v.mmrc)
    const cat = Number(v.cat)
    const exacerbations = Number(v.exacerbations)

    if (ratio >= 0.7) {
      return {
        value: fev1,
        unit: '% predicted',
        interpretation: 'Post-bronchodilator FEV1/FVC is not below 0.70; spirometric COPD obstruction criterion is not met by this input.',
        note: 'COPD diagnosis requires appropriate clinical assessment and spirometry.'
      }
    }

    const grade =
      fev1 >= 80 ? 'GOLD 1' :
      fev1 >= 50 ? 'GOLD 2' :
      fev1 >= 30 ? 'GOLD 3' : 'GOLD 4'

    const symptomatic = mmrc >= 2 || cat >= 10
    const group = exacerbations >= 1 ? 'E' : symptomatic ? 'B' : 'A'

    return {
      value: fev1,
      unit: '% predicted',
      interpretation: `${grade} airflow limitation; GOLD group ${group}.`,
      note: 'The 2026 GOLD ABE assessment uses airflow obstruction plus symptom burden and exacerbation history. Group E includes at least one moderate or severe exacerbation in the previous year.'
    }
  }
}

export default calc
