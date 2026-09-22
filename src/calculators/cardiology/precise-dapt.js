const preciseDapt = {
  id: 'precise-dapt',
  name: 'PRECISE-DAPT Score',
  shortName: 'PRECISE-DAPT',
  categoryId: 'cardiology',
  description: 'Five-variable PRECISE-DAPT teaching estimator. This implementation uses an approximate interpolation and is not a reproduction of the validated nomogram.',
  keywords: ['PRECISE-DAPT', 'DAPT', 'bleeding', 'PCI', 'stent'],

  inputs: [
    {
      id: 'age',
      label: 'Age',
      type: 'number',
      unit: 'years',
      min: 18,
      max: 100
    },
    {
      id: 'creatinineClearance',
      label: 'Creatinine clearance',
      type: 'number',
      unit: 'mL/min',
      min: 1,
      max: 200
    },
    {
      id: 'hemoglobin',
      label: 'Hemoglobin',
      type: 'number',
      unit: 'g/dL',
      min: 3,
      max: 20
    },
    {
      id: 'wbc',
      label: 'White blood cell count',
      type: 'number',
      unit: '10⁹/L',
      min: 1,
      max: 100
    },
    {
      id: 'previousBleeding',
      label: 'Previous spontaneous bleeding',
      type: 'boolean'
    }
  ],

  calculate(values) {
    const age = Number(values.age);
    const crcl = Number(values.creatinineClearance);
    const hb = Number(values.hemoglobin);
    const wbc = Number(values.wbc);
    const previousBleeding = Boolean(values.previousBleeding);

    if (
      !Number.isFinite(age) ||
      !Number.isFinite(crcl) ||
      !Number.isFinite(hb) ||
      !Number.isFinite(wbc)
    ) {
      return {
        error: 'Please enter all required values.'
      };
    }

    /*
     * This is an approximate teaching estimator rather than
     * a reproduction of the validated PRECISE-DAPT nomogram.
     *
     * Published model variables:
     * age, creatinine clearance, hemoglobin, WBC count,
     * and previous spontaneous bleeding.
     */

    let score = 0;

    // Approximate contribution of age
    score += Math.max(0, (age - 20) * 0.5);

    // Approximate contribution of renal function
    if (crcl < 30) {
      score += 25;
    } else if (crcl < 60) {
      score += 15;
    } else if (crcl < 90) {
      score += 7;
    }

    // Approximate hemoglobin contribution
    if (hb < 10) {
      score += 20;
    } else if (hb < 12) {
      score += 10;
    }

    // Approximate WBC contribution
    if (wbc >= 15) {
      score += 10;
    } else if (wbc >= 10) {
      score += 5;
    }

    // Previous spontaneous bleeding
    if (previousBleeding) {
      score += 25;
    }

    score = Math.round(score);

    return {
      value: score,
      displayValue: score,
      unit: 'points',
      category:
        score >= 25
          ? 'Approximate score ≥25'
          : 'Approximate score <25',
      interpretation:
        score >= 25
          ? 'This approximate score is at or above the published PRECISE-DAPT threshold of 25.'
          : 'This approximate score is below the published PRECISE-DAPT threshold of 25.',
      note:
        'This is an approximate teaching implementation. The validated PRECISE-DAPT model uses age, creatinine clearance, hemoglobin, white-blood-cell count and previous spontaneous bleeding. Use a validated implementation for clinical decision-making.'
    };
  }
};

export default preciseDapt;
