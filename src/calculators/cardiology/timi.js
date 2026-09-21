const timi = {
  id: 'timi',
  name: 'TIMI Risk Score for UA/NSTEMI',
  shortName: 'TIMI',
  type: 'score',
  categoryId: 'cardiology',
  category: 'Cardiology',
  description: 'Estimates the risk of adverse cardiac outcomes in patients presenting with unstable angina or non-ST-elevation myocardial infarction.',
  keywords: [
    'TIMI',
    'TIMI score',
    'UA',
    'NSTEMI',
    'ACS',
    'acute coronary syndrome',
    'myocardial infarction',
    'cardiac risk'
  ],
  aliases: [
    'TIMI Risk Score',
    'TIMI UA NSTEMI',
    'TIMI score for unstable angina'
  ],
  inputs: [
    {
      id: 'age65',
      label: 'Age ≥65 years',
      type: 'boolean'
    },
    {
      id: 'riskFactors',
      label: '≥3 risk factors for coronary artery disease',
      type: 'boolean'
    },
    {
      id: 'knownCad',
      label: 'Known coronary stenosis ≥50%',
      type: 'boolean'
    },
    {
      id: 'stDeviation',
      label: 'ST-segment deviation on presentation ECG',
      type: 'boolean'
    },
    {
      id: 'anginalEvents',
      label: '≥2 anginal episodes in the preceding 24 hours',
      type: 'boolean'
    },
    {
      id: 'aspirin',
      label: 'Aspirin use within the preceding 7 days',
      type: 'boolean'
    },
    {
      id: 'biomarkers',
      label: 'Elevated cardiac biomarkers',
      type: 'boolean'
    }
  ],
  calculate(values) {
    const required = [
      'age65',
      'riskFactors',
      'knownCad',
      'stDeviation',
      'anginalEvents',
      'aspirin',
      'biomarkers'
    ]

    if (required.some(key => typeof values[key] !== 'boolean')) {
      return { error: 'Please complete all TIMI inputs.' }
    }

    const score = required.reduce(
      (total, key) => total + (values[key] ? 1 : 0),
      0
    )

    return {
      value: score,
      displayValue: String(score),
      unit: '/ 7 points',
      category:
        score <= 1 ? '0–1 points' :
        score === 2 ? '2 points' :
        score === 3 ? '3 points' :
        score === 4 ? '4 points' :
        score === 5 ? '5 points' :
        '6–7 points',
      interpretation:
        score <= 1
          ? 'Lower TIMI score range'
          : score <= 4
            ? 'Intermediate TIMI score range'
            : 'Higher TIMI score range'
    }
  },
  references: [
    'Antman EM, et al. The TIMI risk score for unstable angina/non-ST elevation MI. JAMA. 2000;284:835–842.',
    'ACCF/AHA Focused Update — TIMI Risk Score for Unstable Angina/Non-ST-Elevation MI.'
  ]
}

export default timi
