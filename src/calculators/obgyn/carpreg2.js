const carpreg2 = {
  id: 'carpreg-ii',
  name: 'CARPREG II',
  shortName: 'CARPREG II',
  categoryId: 'obgyn',
  description: 'CARPREG II maternal cardiac complication risk index for pregnancy.',
  type: 'score',
  inputs: [
    { id: 'prior', label: 'Prior cardiac event or arrhythmia', type: 'boolean' },
    { id: 'nyha', label: 'Poor functional class (NYHA III-IV) or cyanosis', type: 'boolean' },
    { id: 'mechanical', label: 'Mechanical valve', type: 'boolean' },
    { id: 'ventricular', label: 'Systemic ventricular dysfunction', type: 'boolean' },
    { id: 'left', label: 'High-risk valve disease or LV outflow tract obstruction', type: 'boolean' },
    { id: 'pulm', label: 'Pulmonary hypertension', type: 'boolean' },
    { id: 'cad', label: 'Coronary artery disease', type: 'boolean' },
    { id: 'aorta', label: 'High-risk aortopathy', type: 'boolean' },
    { id: 'noIntervention', label: 'No prior cardiac intervention', type: 'boolean' },
    { id: 'late', label: 'First cardiac assessment after 20 weeks', type: 'boolean' }
  ],
  calculate(v) {
    const score =
      (v.prior ? 3 : 0) +
      (v.nyha ? 3 : 0) +
      (v.mechanical ? 3 : 0) +
      (v.ventricular ? 2 : 0) +
      (v.left ? 2 : 0) +
      (v.pulm ? 2 : 0) +
      (v.cad ? 2 : 0) +
      (v.aorta ? 2 : 0) +
      (v.noIntervention ? 1 : 0) +
      (v.late ? 1 : 0);

    let risk;

    if (score <= 1) {
      risk = '5%';
    } else if (score === 2) {
      risk = '10%';
    } else if (score === 3) {
      risk = '15%';
    } else if (score === 4) {
      risk = '22%';
    } else {
      risk = '41%';
    }

    return {
      value: score,
      unit: 'points',
      interpretation: `Published CARPREG II risk group: ${risk}`,
      note: 'Predicted risk refers to the primary cardiac-event risk reported for the CARPREG II score groups. Interpret in the context of the original model population.'
    };
  }
};

export default carpreg2;
