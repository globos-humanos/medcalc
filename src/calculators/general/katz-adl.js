const calc = {
  id: 'katz-adl',
  name: 'Katz Index of Independence in ADL',
  shortName: 'Katz ADL',
  categoryId: 'general-medicine',
  category: 'General Medicine',
  description: 'Functional independence in six basic activities of daily living.',
  type: 'score',

  inputs: [
    {
      id: 'k0',
      label: 'Bathing',
      type: 'boolean'
    },
    {
      id: 'k1',
      label: 'Dressing',
      type: 'boolean'
    },
    {
      id: 'k2',
      label: 'Toileting',
      type: 'boolean'
    },
    {
      id: 'k3',
      label: 'Transferring',
      type: 'boolean'
    },
    {
      id: 'k4',
      label: 'Continence',
      type: 'boolean'
    },
    {
      id: 'k5',
      label: 'Feeding',
      type: 'boolean'
    }
  ],

  calculate(values) {
    const keys = ['k0', 'k1', 'k2', 'k3', 'k4', 'k5']

    if (keys.some(key => values[key] === undefined)) {
      return {
        error: 'Please complete all six Katz ADL domains.'
      }
    }

    const score = keys.filter(key => values[key] === true).length

    let interpretation

    if (score === 6) {
      interpretation = 'Full function.'
    } else if (score === 4) {
      interpretation = 'Moderate impairment.'
    } else if (score <= 2) {
      interpretation = 'Severe functional impairment.'
    } else {
      interpretation = 'Some functional impairment.'
    }

    return {
      value: score,
      displayValue: `${score}/6`,
      unit: 'points',
      category: interpretation,
      note: 'Higher scores indicate greater independence. The Katz Index assesses six basic ADLs and does not assess instrumental activities such as shopping or managing finances.'
    }
  }
}

export default calc
