const preeclampsiaRisk = {
  id: 'preeclampsia-risk',
  name: 'Preeclampsia Risk Assessment',
  shortName: 'Preeclampsia Risk',
  categoryId: 'obgyn',
  description: 'Guideline-based assessment of established high-risk and moderate-risk factors for preeclampsia.',
  type: 'score',

  inputs: [
    {
      id: 'priorPreeclampsia',
      label: 'History of preeclampsia',
      type: 'boolean'
    },
    {
      id: 'multifetal',
      label: 'Multifetal gestation',
      type: 'boolean'
    },
    {
      id: 'chronicHypertension',
      label: 'Chronic hypertension',
      type: 'boolean'
    },
    {
      id: 'diabetes',
      label: 'Pregestational type 1 or type 2 diabetes',
      type: 'boolean'
    },
    {
      id: 'kidney',
      label: 'Kidney disease',
      type: 'boolean'
    },
    {
      id: 'autoimmune',
      label: 'Autoimmune disease',
      type: 'boolean'
    },
    {
      id: 'nulliparity',
      label: 'Nulliparity',
      type: 'boolean'
    },
    {
      id: 'obesity',
      label: 'BMI >30',
      type: 'boolean'
    },
    {
      id: 'familyHistory',
      label: 'Family history of preeclampsia',
      type: 'boolean'
    },
    {
      id: 'age35',
      label: 'Age >=35 years',
      type: 'boolean'
    },
    {
      id: 'personalHistory',
      label: 'Personal history factor such as prior adverse pregnancy outcome or long interpregnancy interval',
      type: 'boolean'
    },
    {
      id: 'ivf',
      label: 'In vitro fertilization',
      type: 'boolean'
    },
    {
      id: 'lowerIncome',
      label: 'Lower income',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const highRisk =
      (v.priorPreeclampsia ? 1 : 0) +
      (v.multifetal ? 1 : 0) +
      (v.chronicHypertension ? 1 : 0) +
      (v.diabetes ? 1 : 0) +
      (v.kidney ? 1 : 0) +
      (v.autoimmune ? 1 : 0);

    const moderateRisk =
      (v.nulliparity ? 1 : 0) +
      (v.obesity ? 1 : 0) +
      (v.familyHistory ? 1 : 0) +
      (v.age35 ? 1 : 0) +
      (v.personalHistory ? 1 : 0) +
      (v.ivf ? 1 : 0) +
      (v.lowerIncome ? 1 : 0);

    let interpretation;

    if (highRisk > 0) {
      interpretation = 'One or more high-risk factors present';
    } else if (moderateRisk >= 2) {
      interpretation = 'Multiple moderate-risk factors present';
    } else if (moderateRisk === 1) {
      interpretation = 'One moderate-risk factor present';
    } else {
      interpretation = 'No listed high-risk or multiple-moderate-risk factors identified';
    }

    return {
      value: highRisk + moderateRisk,
      unit: 'risk factors',
      interpretation,
      note: 'This is a guideline-based risk-factor assessment, not a validated percentage-risk prediction model. ACOG/SMFM identify one or more high-risk factors or multiple moderate-risk factors as relevant to preeclampsia prevention discussions.'
    };
  }
};

export default preeclampsiaRisk;
