const calc = {
  id: 'surgical-apgar',
  name: 'Surgical Apgar Score',
  shortName: 'Surgical Apgar',
  categoryId: 'surgery',
  description: '10-point intraoperative score based on estimated blood loss, lowest mean arterial pressure and lowest heart rate.',
  type: 'score',

  inputs: [
    {
      id: 'ebl',
      label: 'Estimated blood loss',
      type: 'number',
      unit: 'mL',
      min: 0,
      max: 50000,
      step: 10
    },
    {
      id: 'map',
      label: 'Lowest mean arterial pressure',
      type: 'number',
      unit: 'mmHg',
      min: 0,
      max: 200,
      step: 1
    },
    {
      id: 'hr',
      label: 'Lowest heart rate',
      type: 'number',
      unit: '/min',
      min: 20,
      max: 250,
      step: 1
    }
  ],

  calculate(v) {
    const ebl = Number(v.ebl)
    const map = Number(v.map)
    const hr = Number(v.hr)

    if (![ebl, map, hr].every(Number.isFinite)) {
      return {
        error: 'Enter blood loss, lowest MAP and lowest heart rate.'
      }
    }

    const bloodLossPoints =
      ebl === 0 ? 3 :
      ebl <= 100 ? 2 :
      ebl <= 600 ? 1 : 0

    const mapPoints =
      map >= 70 ? 3 :
      map >= 55 ? 2 :
      map >= 40 ? 1 : 0

    const hrPoints =
      hr <= 55 ? 2 :
      hr <= 70 ? 1 :
      hr <= 100 ? 0 :
      hr <= 110 ? 1 : 0

    const score = bloodLossPoints + mapPoints + hrPoints

    let interpretation

    if (score <= 4) {
      interpretation = 'Lower Surgical Apgar score'
    } else if (score <= 7) {
      interpretation = 'Intermediate Surgical Apgar score'
    } else {
      interpretation = 'Higher Surgical Apgar score'
    }

    return {
      value: score,
      unit: '/10',
      interpretation,
      note: 'The Surgical Apgar Score uses estimated blood loss, lowest heart rate and lowest mean arterial pressure recorded during surgery. Lower scores are associated with greater postoperative complication risk in the populations studied.'
    }
  },

  references: [
    'Gawande AA, et al. An Apgar score for surgery. J Am Coll Surg. 2007.'
  ]
}

export default calc
