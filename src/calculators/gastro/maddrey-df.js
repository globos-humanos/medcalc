const maddrey = {
  id: 'maddrey-df',
  name: 'Maddrey Discriminant Function',
  shortName: 'Maddrey DF',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description:
    'Modified Maddrey discriminant function for alcohol-associated hepatitis.',

  inputs: [
    { id: 'pt', label: 'Patient prothrombin time', unit: 'seconds', min: 5, max: 100, step: 0.1 },
    { id: 'control', label: 'Control prothrombin time', unit: 'seconds', min: 5, max: 100, step: 0.1 },
    { id: 'bilirubin', label: 'Total bilirubin', unit: 'mg/dL', min: 0, step: 0.1 }
  ],

  calculate(v) {
    const pt = Number(v.pt)
    const control = Number(v.control)
    const bilirubin = Number(v.bilirubin)

    if (
      ![pt, control, bilirubin].every(Number.isFinite) ||
      pt <= 0 ||
      control <= 0 ||
      bilirubin < 0
    ) {
      return { error: 'Please enter valid Maddrey DF values.' }
    }

    const score = 4.6 * (pt - control) + bilirubin

    return {
      value: score,
      displayValue: score.toFixed(1),
      unit: 'points',
      category:
        score >= 32
          ? 'Severe alcoholic hepatitis range'
          : 'Below severe range',
      note:
        'Maddrey DF is used in the clinical context of alcohol-associated hepatitis and does not establish the diagnosis by itself.'
    }
  },

  references: [
    'Maddrey WC, et al. Corticosteroid therapy of alcoholic hepatitis. Gastroenterology. 1978.'
  ]
}

export default maddrey
