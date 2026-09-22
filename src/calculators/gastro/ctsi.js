const ctsi = {
  id: 'ctsi',
  name: 'CT Severity Index',
  shortName: 'CTSI',
  type: 'score',
  categoryId: 'gastro',
  category: 'Gastroenterology',
  description:
    'Balthazar CT Severity Index for acute pancreatitis.',

  inputs: [
    {
      id: 'balthazar',
      label: 'Balthazar grade',
      type: 'choice',
      options: [
        { value: 0, label: 'A — Normal pancreas' },
        { value: 1, label: 'B — Pancreatic enlargement' },
        { value: 2, label: 'C — Inflammatory changes in pancreas/peripancreatic fat' },
        { value: 3, label: 'D — Single peripancreatic fluid collection' },
        { value: 4, label: 'E — ≥2 collections or gas in/adjacent to pancreas' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'necrosis',
      label: 'Pancreatic necrosis',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 2, label: '≤30%' },
        { value: 4, label: '30–50%' },
        { value: 6, label: '>50%' }
      ],
      optionsLayout: 'stack'
    }
  ],

  calculate(v) {
    if (v.balthazar === undefined || v.necrosis === undefined) {
      return { error: 'Please select both CT severity components.' }
    }

    const score = Number(v.balthazar) + Number(v.necrosis)

    return {
      value: score,
      displayValue: String(score),
      unit: '/10',
      category:
        score <= 3 ? 'Mild' :
        score <= 6 ? 'Moderate' :
        'Severe',
      note:
        'CTSI combines the Balthazar inflammatory grade and pancreatic necrosis score. It requires appropriate interpretation of contrast-enhanced CT findings.'
    }
  },

  references: [
    'Balthazar EJ, et al. Acute pancreatitis: value of CT in establishing prognosis. Radiology. 1990.'
  ]
}

export default ctsi
