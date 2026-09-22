const fullPiers = {
  id: 'full-piers',
  name: 'fullPIERS',
  shortName: 'fullPIERS',
  categoryId: 'obgyn',
  description: 'Published fullPIERS model for predicted probability of adverse maternal outcome in preeclampsia.',
  type: 'calculation',

  inputs: [
    {
      id: 'ga',
      label: 'Gestational age at eligibility',
      type: 'number',
      unit: 'weeks',
      min: 20,
      max: 45,
      step: 0.1
    },
    {
      id: 'chestDyspnea',
      label: 'Chest pain or dyspnea',
      type: 'boolean'
    },
    {
      id: 'creatinine',
      label: 'Serum creatinine',
      type: 'number',
      unit: 'umol/L',
      min: 0,
      step: 0.1
    },
    {
      id: 'platelets',
      label: 'Platelet count',
      type: 'number',
      unit: 'x10^9/L',
      min: 1,
      step: 1
    },
    {
      id: 'ast',
      label: 'AST',
      type: 'number',
      unit: 'U/L',
      min: 0,
      step: 0.1
    },
    {
      id: 'spo2',
      label: 'Oxygen saturation',
      type: 'number',
      unit: '%',
      min: 50,
      max: 100,
      step: 0.1
    }
  ],

  calculate(v) {
    const ga = Number(v.ga);
    const creatinine = Number(v.creatinine);
    const platelets = Number(v.platelets);
    const ast = Number(v.ast);
    const spo2 = Number(v.spo2);

    if (
      !Number.isFinite(ga) ||
      !Number.isFinite(creatinine) ||
      !Number.isFinite(platelets) ||
      !Number.isFinite(ast) ||
      !Number.isFinite(spo2)
    ) {
      return {
        error: 'Enter valid values for all fullPIERS variables.'
      };
    }

    const lp =
      2.68 +
      (-0.0541 * ga) +
      (1.23 * (v.chestDyspnea ? 1 : 0)) +
      (-0.0271 * creatinine) +
      (0.207 * platelets) +
      (0.00004 * Math.pow(platelets, 2)) +
      (0.0101 * ast) +
      (-0.00000305 * Math.pow(ast, 2)) +
      (0.00025 * creatinine * platelets) +
      (-0.0000699 * platelets * ast) +
      (-0.00256 * platelets * spo2);

    const probability = 1 / (1 + Math.exp(-lp));

    let interpretation;

    if (probability < 0.025) {
      interpretation = 'Predicted probability <2.5%';
    } else if (probability < 0.05) {
      interpretation = 'Predicted probability 2.5% to <5%';
    } else if (probability < 0.30) {
      interpretation = 'Predicted probability 5% to <30%';
    } else {
      interpretation = 'Predicted probability >=30%';
    }

    return {
      value: probability * 100,
      displayValue: `${(probability * 100).toFixed(2)}%`,
      unit: 'predicted probability',
      interpretation,
      note: 'Original fullPIERS model predicting adverse maternal outcome within 48 hours of eligibility in women with preeclampsia. External performance varies by population; use the model in its validated clinical context.'
    };
  }
};

export default fullPiers;
