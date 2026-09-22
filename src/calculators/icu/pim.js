const pim = {
  id: 'pim',
  name: 'Pediatric Index of Mortality 3',
  shortName: 'PIM-3',
  type: 'score',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Paediatric Index of Mortality 3 for mortality risk estimation using variables recorded around PICU admission.',
  keywords: ['PIM', 'PIM-3', 'Pediatric Index of Mortality', 'PICU'],
  aliases: ['Pediatric Index of Mortality', 'PIM 3'],

  inputs: [
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      unit: 'mmHg',
      min: 0,
      max: 300
    },
    {
      id: 'pupils',
      label: 'Pupillary reaction',
      type: 'choice',
      options: [
        { value: 'reactive', label: 'Both reactive' },
        { value: 'fixed', label: 'Both fixed and dilated' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'fio2',
      label: 'FiO₂',
      unit: '%',
      min: 21,
      max: 100,
      step: 1
    },
    {
      id: 'pao2',
      label: 'PaO₂',
      unit: 'mmHg',
      min: 20,
      max: 800,
      step: 1
    },
    {
      id: 'baseExcess',
      label: 'Base excess',
      unit: 'mmol/L',
      min: -40,
      max: 40,
      step: 0.1
    },
    {
      id: 'mechanicalVent',
      label: 'Mechanical respiratory assistance during first hour?',
      type: 'boolean'
    },
    {
      id: 'elective',
      label: 'Elective PICU admission?',
      type: 'boolean'
    },
    {
      id: 'postProcedure',
      label: 'Recovery from surgery/procedure as main reason for admission?',
      type: 'boolean'
    },
    {
      id: 'cardiacProcedure',
      label: 'Postoperative cardiac procedure',
      type: 'choice',
      options: [
        { value: 'none', label: 'No postoperative procedure' },
        { value: 'bypass', label: 'Cardiac surgery with bypass' },
        { value: 'nonBypass', label: 'Cardiac surgery without bypass' },
        { value: 'nonCardiac', label: 'Non-cardiac surgery/procedure' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'diagnosisRisk',
      label: 'Primary admission diagnosis risk category',
      type: 'choice',
      options: [
        { value: 'veryHigh', label: 'Very-high-risk diagnosis' },
        { value: 'high', label: 'High-risk diagnosis' },
        { value: 'low', label: 'Low-risk diagnosis' },
        { value: 'other', label: 'Other / none of these categories' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(values) {
    const n = id => Number(values[id])

    const requiredNumeric = ['sbp', 'fio2', 'pao2', 'baseExcess']

    if (
      requiredNumeric.some(id => !Number.isFinite(n(id))) ||
      !values.pupils ||
      values.mechanicalVent === undefined ||
      values.elective === undefined ||
      values.postProcedure === undefined ||
      !values.cardiacProcedure ||
      !values.diagnosisRisk
    ) {
      return {
        error: 'Please complete all PIM-3 admission variables.'
      }
    }

    const sbp = n('sbp')
    const fio2 = n('fio2')
    const pao2 = n('pao2')
    const baseExcess = Math.abs(n('baseExcess'))

    const oxygenation =
      (fio2 / pao2)

    const sbpSquared = (sbp * sbp) / 1000

    let logit = -1.7928

    if (values.pupils === 'fixed') {
      logit += 3.8233
    }

    if (values.elective) {
      logit -= 0.5378
    }

    if (values.mechanicalVent) {
      logit += 0.9763
    }

    logit += 0.0671 * baseExcess

    logit += -0.0431 * sbp
    logit += 0.1716 * sbpSquared

    logit += 0.4214 * oxygenation

    if (values.cardiacProcedure === 'bypass') {
      logit -= 1.2246
    } else if (values.cardiacProcedure === 'nonBypass') {
      logit -= 0.8762
    } else if (values.cardiacProcedure === 'nonCardiac') {
      logit -= 1.5164
    }

    if (values.diagnosisRisk === 'veryHigh') {
      logit += 1.6225
    } else if (values.diagnosisRisk === 'high') {
      logit += 1.0725
    } else if (values.diagnosisRisk === 'low') {
      logit -= 2.1766
    }

    const probability =
      1 / (1 + Math.exp(-logit))

    return {
      value: probability * 100,
      displayValue: `${(probability * 100).toFixed(1)}%`,
      unit: 'estimated mortality',
      category: 'PIM-3',
      note: 'PIM-3 is a population-level PICU mortality model based on admission variables. It is intended primarily for risk adjustment and benchmarking, not individual treatment or triage decisions.'
    }
  },

  references: [
    'Straney L, et al. Paediatric index of mortality 3: an updated model for predicting mortality in pediatric intensive care. Pediatr Crit Care Med. 2013;14(7):673–681.'
  ]
}

export default pim
