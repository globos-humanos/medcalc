const calc = {
  id: 'winters-formula',
  name: "Winter's Formula",
  shortName: "Winter's",
  categoryId: 'respiratory',
  description: 'Expected respiratory compensation in metabolic acidosis.',
  type: 'calculation',
  inputs: [
    { id: 'hco3', label: 'Serum bicarbonate', type: 'number', unit: 'mmol/L', min: 1, max: 60, step: 0.1 },
    { id: 'paco2', label: 'Measured PaCO2', type: 'number', unit: 'mmHg', min: 10, max: 150, step: 1 }
  ],
  calculate(v) {
    const hco3 = Number(v.hco3)
    const measured = Number(v.paco2)
    const expected = 1.5 * hco3 + 8
    const low = expected - 2
    const high = expected + 2

    const interpretation =
      measured < low
        ? 'PaCO2 is lower than expected: concurrent respiratory alkalosis is possible.'
        : measured > high
          ? 'PaCO2 is higher than expected: concurrent respiratory acidosis is possible.'
          : 'PaCO2 is within the expected compensation range.'

    return {
      value: expected,
      displayValue: `${expected.toFixed(1)} (${low.toFixed(1)}-${high.toFixed(1)})`,
      unit: 'mmHg',
      interpretation,
      note: 'Expected PaCO2 = 1.5 × HCO3 + 8 ± 2 mmHg.'
    }
  }
}

export default calc
