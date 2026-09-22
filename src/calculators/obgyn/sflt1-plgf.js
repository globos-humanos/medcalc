const sflt1Plgf = {
  id: 'sflt1-plgf',
  name: 'sFlt-1 / PlGF Ratio',
  shortName: 'sFlt-1/PlGF',
  categoryId: 'obgyn',
  description: 'Calculates the ratio of soluble fms-like tyrosine kinase-1 to placental growth factor.',
  type: 'calculation',
  inputs: [
    {
      id: 'sflt',
      label: 'sFlt-1 concentration',
      unit: 'pg/mL',
      min: 0
    },
    {
      id: 'plgf',
      label: 'PlGF concentration',
      unit: 'pg/mL',
      min: 0.1,
      step: 0.1
    }
  ],
  calculate(v) {
    const sflt = Number(v.sflt);
    const plgf = Number(v.plgf);

    if (!Number.isFinite(sflt) || !Number.isFinite(plgf) || plgf <= 0) {
      return {
        error: 'Enter valid positive biomarker values.'
      };
    }

    const ratio = sflt / plgf;

    return {
      value: ratio,
      displayValue: ratio.toFixed(2),
      unit: 'ratio',
      note: 'Interpretation depends on the assay, gestational age and validated clinical pathway. Do not apply a universal cutoff across assays.'
    };
  }
};

export default sflt1Plgf;
