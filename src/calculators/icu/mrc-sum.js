const calc = {
  id: 'mrc-sum',
  name: 'MRC Sum Score',
  shortName: 'MRC Sum',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Medical Research Council sum score for bedside assessment of muscle strength.',
  type: 'score',

  inputs: [
    {
      id: 'shoulderRight',
      label: 'Shoulder abduction — right',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    },
    {
      id: 'shoulderLeft',
      label: 'Shoulder abduction — left',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    },
    {
      id: 'elbowRight',
      label: 'Elbow flexion — right',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    },
    {
      id: 'elbowLeft',
      label: 'Elbow flexion — left',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    },
    {
      id: 'wristRight',
      label: 'Wrist extension — right',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    },
    {
      id: 'wristLeft',
      label: 'Wrist extension — left',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    },
    {
      id: 'hipRight',
      label: 'Hip flexion — right',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    },
    {
      id: 'hipLeft',
      label: 'Hip flexion — left',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    },
    {
      id: 'kneeRight',
      label: 'Knee extension — right',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    },
    {
      id: 'kneeLeft',
      label: 'Knee extension — left',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    },
    {
      id: 'ankleRight',
      label: 'Ankle dorsiflexion — right',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    },
    {
      id: 'ankleLeft',
      label: 'Ankle dorsiflexion — left',
      type: 'choice',
      options: [
        { value: 0, label: '0 — No contraction' },
        { value: 1, label: '1 — Flicker / trace contraction' },
        { value: 2, label: '2 — Movement with gravity eliminated' },
        { value: 3, label: '3 — Movement against gravity' },
        { value: 4, label: '4 — Movement against resistance' },
        { value: 5, label: '5 — Normal power' }
      ]
    }
  ],

  calculate(v) {
    const keys = [
      'shoulderRight',
      'shoulderLeft',
      'elbowRight',
      'elbowLeft',
      'wristRight',
      'wristLeft',
      'hipRight',
      'hipLeft',
      'kneeRight',
      'kneeLeft',
      'ankleRight',
      'ankleLeft'
    ]

    if (keys.some(key => v[key] === undefined || v[key] === '')) {
      return {
        error: 'Please complete all 12 muscle-strength assessments.'
      }
    }

    const score = keys.reduce(
      (total, key) => total + Number(v[key]),
      0
    )

    return {
      value: score,
      displayValue: `${score}/60`,
      unit: 'points',
      category: score < 48
        ? 'Severe weakness threshold reached'
        : 'MRC sum score ≥48',
      interpretation: score < 48
        ? 'An MRC sum score below 48 is commonly used as a threshold for ICU-acquired weakness.'
        : 'The MRC sum score is 48 or higher.',
      note: 'The MRC sum score assesses six bilateral muscle groups and ranges from 0–60.'
    }
  }
}

export default calc
