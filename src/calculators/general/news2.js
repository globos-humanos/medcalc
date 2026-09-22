const calc = {
  id: 'news2',
  name: 'NEWS2',
  shortName: 'NEWS2',
  categoryId: 'general-medicine',
  category: 'General Medicine',
  description: 'National Early Warning Score 2.',
  type: 'score',

  inputs: [
    {
      id: 'rr',
      label: 'Respiratory rate',
      unit: '/min',
      min: 0,
      max: 80
    },
    {
      id: 'spo2',
      label: 'SpO2',
      unit: '%',
      min: 50,
      max: 100
    },
    {
      id: 'spo2Scale',
      label: 'SpO2 scoring scale',
      type: 'choice',
      options: [
        { value: 'scale1', label: 'Scale 1 — standard target range' },
        { value: 'scale2', label: 'Scale 2 — target 88–92%' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'suppO2',
      label: 'Supplemental oxygen?',
      type: 'boolean'
    },
    {
      id: 'sbp',
      label: 'Systolic BP',
      unit: 'mmHg',
      min: 20,
      max: 300
    },
    {
      id: 'pulse',
      label: 'Pulse',
      unit: '/min',
      min: 20,
      max: 250
    },
    {
      id: 'conscious',
      label: 'New confusion / altered consciousness?',
      type: 'boolean'
    },
    {
      id: 'temp',
      label: 'Temperature',
      unit: 'C',
      min: 25,
      max: 45,
      step: 0.1
    }
  ],

  calculate(values) {
    const rr = Number(values.rr)
    const spo2 = Number(values.spo2)
    const sbp = Number(values.sbp)
    const pulse = Number(values.pulse)
    const temp = Number(values.temp)
    const scale = values.spo2Scale

    if (
      !Number.isFinite(rr) ||
      !Number.isFinite(spo2) ||
      !Number.isFinite(sbp) ||
      !Number.isFinite(pulse) ||
      !Number.isFinite(temp) ||
      !scale
    ) {
      return {
        error: 'Please complete all NEWS2 parameters.'
      }
    }

    let rrScore
    if (rr <= 8) rrScore = 3
    else if (rr <= 11) rrScore = 1
    else if (rr <= 20) rrScore = 0
    else if (rr <= 24) rrScore = 2
    else rrScore = 3

    let spo2Score

    if (scale === 'scale1') {
      if (spo2 >= 96) spo2Score = 0
      else if (spo2 >= 94) spo2Score = 1
      else if (spo2 >= 92) spo2Score = 2
      else spo2Score = 3
    } else {
      if (spo2 <= 83) spo2Score = 3
      else if (spo2 <= 85) spo2Score = 2
      else if (spo2 <= 87) spo2Score = 1
      else if (spo2 <= 92) spo2Score = 0
      else if (values.suppO2 && spo2 <= 94) spo2Score = 1
      else if (values.suppO2 && spo2 <= 96) spo2Score = 2
      else if (values.suppO2 && spo2 >= 97) spo2Score = 3
      else spo2Score = 0
    }

    const oxygenScore = values.suppO2 ? 2 : 0

    let sbpScore
    if (sbp <= 90) sbpScore = 3
    else if (sbp <= 100) sbpScore = 2
    else if (sbp <= 110) sbpScore = 1
    else if (sbp <= 219) sbpScore = 0
    else sbpScore = 3

    let pulseScore
    if (pulse <= 40) pulseScore = 3
    else if (pulse <= 50) pulseScore = 1
    else if (pulse <= 90) pulseScore = 0
    else if (pulse <= 110) pulseScore = 1
    else if (pulse <= 130) pulseScore = 2
    else pulseScore = 3

    const consciousnessScore = values.conscious ? 3 : 0

    let temperatureScore
    if (temp <= 35) temperatureScore = 3
    else if (temp <= 36) temperatureScore = 1
    else if (temp <= 38) temperatureScore = 0
    else if (temp <= 39) temperatureScore = 1
    else temperatureScore = 2

    const total =
      rrScore +
      spo2Score +
      oxygenScore +
      sbpScore +
      pulseScore +
      consciousnessScore +
      temperatureScore

    let category

    if (total >= 7) {
      category = 'High clinical risk'
    } else if (total >= 5) {
      category = 'Medium clinical risk'
    } else if (
      rrScore === 3 ||
      spo2Score === 3 ||
      sbpScore === 3 ||
      pulseScore === 3 ||
      consciousnessScore === 3 ||
      temperatureScore === 3
    ) {
      category = 'Low–medium risk — red score present'
    } else {
      category = 'Low clinical risk'
    }

    return {
      value: total,
      displayValue: String(total),
      unit: 'points',
      category,
      interpretation: `NEWS2 total ${total}.`,
      note: 'A score of 3 in any single parameter is a red score. SpO2 Scale 2 should only be used when a target range of 88–92% is clinically appropriate.'
    }
  }
}

export default calc
