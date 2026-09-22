const hasBled = {
  id: 'has-bled',
  name: 'HAS-BLED Score for Major Bleeding',
  shortName: 'HAS-BLED',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Estimates bleeding risk in patients with atrial fibrillation receiving anticoagulation.',
  keywords: ['HAS-BLED', 'bleeding', 'atrial fibrillation', 'anticoagulation'],
  aliases: ['HASBLED', 'HAS BLED'],

  inputs: [
    {
      id: 'hypertension',
      label: 'Uncontrolled hypertension — systolic BP >160 mmHg',
      type: 'boolean'
    },
    {
      id: 'renal',
      label: 'Abnormal renal function',
      type: 'boolean'
    },
    {
      id: 'liver',
      label: 'Abnormal liver function',
      type: 'boolean'
    },
    {
      id: 'stroke',
      label: 'Previous stroke',
      type: 'boolean'
    },
    {
      id: 'bleeding',
      label: 'Previous major bleeding or bleeding predisposition',
      type: 'boolean'
    },
    {
      id: 'labileInr',
      label: 'Labile INR — unstable/high INR or TTR <60%',
      type: 'boolean'
    },
    {
      id: 'age65',
      label: 'Age >65 years',
      type: 'boolean'
    },
    {
      id: 'medications',
      label: 'Bleeding-predisposing drugs — antiplatelet agents or NSAIDs',
      type: 'boolean'
    },
    {
      id: 'alcohol',
      label: 'Alcohol use ≥8 drinks/week',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const ids = [
      'hypertension',
      'renal',
      'liver',
      'stroke',
      'bleeding',
      'labileInr',
      'age65',
      'medications',
      'alcohol'
    ]

    if (ids.some(id => typeof v[id] !== 'boolean')) {
      return {
        error: 'Please answer all HAS-BLED criteria.'
      }
    }

    const score =
      (v.hypertension ? 1 : 0) +
      (v.renal ? 1 : 0) +
      (v.liver ? 1 : 0) +
      (v.stroke ? 1 : 0) +
      (v.bleeding ? 1 : 0) +
      (v.labileInr ? 1 : 0) +
      (v.age65 ? 1 : 0) +
      (v.medications ? 1 : 0) +
      (v.alcohol ? 1 : 0)

    return {
      value: score,
      displayValue: `${score}/9`,
      unit: 'points',
      category:
        score >= 3
          ? 'Higher bleeding-risk score'
          : 'Lower HAS-BLED score',
      note: 'A HAS-BLED score ≥3 identifies a higher bleeding-risk group and should prompt review and correction of modifiable bleeding-risk factors; the score is not by itself a reason to withhold anticoagulation.'
    }
  },

  references: [
    'Pisters R, et al. Chest. 2010;138:1093–1100.',
    'HAS-BLED definitions reproduced in contemporary AF guidance and reviews.'
  ]
}

export default hasBled
