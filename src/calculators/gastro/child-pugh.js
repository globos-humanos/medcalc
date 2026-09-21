const childPugh = {
  id: 'child-pugh',
  name: 'Child-Pugh Score',
  shortName: 'Child-Pugh',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description: 'Stages severity of cirrhosis using bilirubin, albumin, INR, ascites, and hepatic encephalopathy.',
  keywords: ['Child-Pugh', 'cirrhosis', 'liver', 'hepatic failure', 'portal hypertension'],
  aliases: ['Child Pugh', 'Child-Turcotte-Pugh', 'CTP'],
  inputs: [
    {
      id: 'bilirubin',
      label: 'Total Bilirubin',
      type: 'choice',
      options: [
        { value: '1', label: '<2 mg/dL' },
        { value: '2', label: '2–3 mg/dL' },
        { value: '3', label: '>3 mg/dL' }
      ]
    },
    {
      id: 'albumin',
      label: 'Albumin',
      type: 'choice',
      options: [
        { value: '1', label: '>3.5 g/dL' },
        { value: '2', label: '2.8–3.5 g/dL' },
        { value: '3', label: '<2.8 g/dL' }
      ]
    },
    {
      id: 'inr',
      label: 'INR',
      type: 'choice',
      options: [
        { value: '1', label: '<1.7' },
        { value: '2', label: '1.7–2.3' },
        { value: '3', label: '>2.3' }
      ]
    },
    {
      id: 'ascites',
      label: 'Ascites',
      type: 'choice',
      options: [
        { value: '1', label: 'Absent' },
        { value: '2', label: 'Slight' },
        { value: '3', label: 'Moderate' }
      ]
    },
    {
      id: 'encephalopathy',
      label: 'Hepatic Encephalopathy',
      type: 'choice',
      options: [
        { value: '1', label: 'None' },
        { value: '2', label: 'Grade 1–2' },
        { value: '3', label: 'Grade 3–4' }
      ]
    }
  ],
  calculate(values) {
    const ids = ['bilirubin', 'albumin', 'inr', 'ascites', 'encephalopathy']
    if (ids.some(id => !values[id])) return { error: 'Please select all five Child-Pugh components.' }

    const score = ids.reduce((sum, id) => sum + Number(values[id]), 0)

    const klass =
      score <= 6 ? 'Class A' :
      score <= 9 ? 'Class B' :
      'Class C'

    return {
      value: score,
      displayValue: String(score),
      unit: '/ 15 points',
      category: klass
    }
  },
  references: [
    'Pugh RN, et al. Transection of the oesophagus for bleeding oesophageal varices. Br J Surg. 1973;60:646–649.',
    'MDCalc — Child-Pugh Score for Cirrhosis Mortality.'
  ]
}

export default childPugh
