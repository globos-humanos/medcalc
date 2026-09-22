const calc = {
  id: 'expected-paco2-alkalosis',
  name: 'Expected PaCO2 in Metabolic Alkalosis',
  shortName: 'Metabolic Alkalosis',
  categoryId: 'respiratory',
  description: 'Estimated respiratory compensation in metabolic alkalosis.',
  type: 'calculation',
  inputs: [
    { id: 'hco3', label: 'Serum bicarbonate', type: 'number', unit: 'mmol/L', min: 24, max: 60, step: 0.1 },
    { id: 'paco2', label: 'Measured PaCO2', type: 'number', unit: 'mmHg', min: 10, max: 150, step: 1 }
  ],
  calculate(v) {
    const hco3 = Number(v.hco3)
    const measured = Number(v.paco2)
    const expected = 40 + 0.7 * (hco3 - 24)
    const difference = measured - expected

    return {
      value: expected,
      unit: 'mmHg',
      interpretation:
        Math.abs(difference) <= 5
          ? 'Measured PaCO2 is broadly compatible with expected compensation.'
          : difference > 5
            ? 'PaCO2 is higher than expected; concurrent respiratory acidosis may be present.'
            : 'PaCO2 is lower than expected; concurrent respiratory alkalosis may be present.',
      note: 'Respiratory compensation in metabolic alkalosis is approximate and usually does not raise PaCO2 indefinitely.'
    }
  }
}

export default calc
