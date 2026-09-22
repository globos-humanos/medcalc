const piers = {
  id: 'piers',
  name: 'miniPIERS',
  shortName: 'miniPIERS',
  categoryId: 'obgyn',
  description: 'miniPIERS prediction model for adverse maternal outcomes in hypertensive disorders of pregnancy, designed for settings with limited laboratory access.',
  type: 'calculation',

  inputs: [
    {
      id: 'multiparous',
      label: 'Multiparous',
      type: 'boolean'
    },
    {
      id: 'ga',
      label: 'Gestational age at admission',
      type: 'number',
      unit: 'weeks',
      min: 20,
      max: 45,
      step: 0.1
    },
    {
      id: 'sbp',
      label: 'Systolic blood pressure',
      type: 'number',
      unit: 'mmHg',
      min: 50,
      max: 300
    },
    {
      id: 'protein',
      label: 'Urine dipstick protein',
      type: 'choice',
      options: [
        { value: 0, label: 'Negative / trace / 1+' },
        { value: 2, label: '2+' },
        { value: 3, label: '3+' },
        { value: 4, label: '4+' }
      ]
    },
    {
      id: 'bleedingPain',
      label: 'Vaginal bleeding with abdominal pain',
      type: 'boolean'
    },
    {
      id: 'headacheVisual',
      label: 'Headache and/or visual disturbance',
      type: 'boolean'
    },
    {
      id: 'chestDyspnea',
      label: 'Chest pain and/or dyspnea',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const ga = Number(v.ga);
    const sbp = Number(v.sbp);
    const protein = Number(v.protein);

    if (
      !Number.isFinite(ga) ||
      !Number.isFinite(sbp) ||
      !Number.isFinite(protein) ||
      ga <= 0 ||
      sbp <= 0
    ) {
      return {
        error: 'Enter valid miniPIERS values.'
      };
    }

    const protein2 = protein === 2 ? 1 : 0;
    const protein3 = protein === 3 ? 1 : 0;
    const protein4 = protein === 4 ? 1 : 0;

    const lp =
      -5.77 +
      (-0.298 * (v.multiparous ? 1 : 0)) +
      (-1.07 * Math.log(ga)) +
      (1.34 * Math.log(sbp)) +
      (-0.218 * protein2) +
      (0.424 * protein3) +
      (0.512 * protein4) +
      (1.18 * (v.bleedingPain ? 1 : 0)) +
      (0.422 * (v.headacheVisual ? 1 : 0)) +
      (0.847 * (v.chestDyspnea ? 1 : 0));

    const probability = 1 / (1 + Math.exp(-lp));

    return {
      value: probability * 100,
      displayValue: `${(probability * 100).toFixed(2)}%`,
      unit: 'predicted probability',
      interpretation: probability >= 0.25
        ? 'Predicted probability >=25%'
        : 'Predicted probability <25%',
      note: 'miniPIERS predicts adverse maternal outcomes within 48 hours among women with hypertensive disorders of pregnancy. The original model was developed for low-resource settings and has undergone external validation; performance varies by population.'
    };
  }
};

export default piers;
