const air = {
  id: 'air',
  name: 'AIR Score for Appendicitis',
  shortName: 'AIR',
  categoryId: 'emergency',
  category: 'Emergency / Trauma',
  description:
    'Appendicitis Inflammatory Response score for risk stratification in suspected acute appendicitis.',
  type: 'score',

  inputs: [
    {
      id: 'vomiting',
      label: 'Vomiting',
      type: 'boolean'
    },
    {
      id: 'rlq',
      label: 'Right lower quadrant pain',
      type: 'boolean'
    },
    {
      id: 'rebound',
      label: 'Rebound tenderness / muscular defense',
      type: 'choice',
      options: [
        { value: 0, label: 'None' },
        { value: 1, label: 'Mild' },
        { value: 2, label: 'Moderate' },
        { value: 3, label: 'Strong' }
      ],
      optionsLayout: 'stack'
    },
    {
      id: 'temp',
      label: 'Temperature ≥38.5°C',
      type: 'boolean'
    },
    {
      id: 'wbc',
      label: 'White blood cell count',
      unit: '×10⁹/L',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'neut',
      label: 'Neutrophils',
      unit: '%',
      min: 0,
      max: 100,
      step: 0.1
    },
    {
      id: 'crp',
      label: 'C-reactive protein',
      unit: 'mg/L',
      min: 0,
      max: 500,
      step: 1
    }
  ],

  calculate(v) {
    const wbc = Number(v.wbc)
    const neut = Number(v.neut)
    const crp = Number(v.crp)

    if (
      !Number.isFinite(wbc) ||
      !Number.isFinite(neut) ||
      !Number.isFinite(crp)
    ) {
      return {
        error: 'Please complete all AIR Score variables.'
      }
    }

    const score =
      (v.vomiting ? 1 : 0) +
      (v.rlq ? 1 : 0) +
      Number(v.rebound || 0) +
      (v.temp ? 1 : 0) +
      (wbc >= 15 ? 2 : wbc >= 10 ? 1 : 0) +
      (neut >= 85 ? 2 : neut >= 70 ? 1 : 0) +
      (crp >= 50 ? 2 : crp >= 10 ? 1 : 0)

    return {
      value: score,
      displayValue: String(score),
      unit: '/12',
      category:
        score <= 4
          ? 'Low risk'
          : score <= 8
            ? 'Intermediate risk'
            : 'High risk',
      note:
        'AIR Score is a clinical risk-stratification tool for suspected appendicitis. It does not by itself establish or exclude the diagnosis.'
    }
  },

  references: [
    'Andersson M, Andersson RE. The Appendicitis Inflammatory Response score: a tool for the diagnosis of acute appendicitis that outperforms the Alvarado score. World Journal of Surgery. 2008;32:1843–1849.',
    'Risk stratification by the Appendicitis Inflammatory Response score to guide decision-making in patients with suspected appendicitis.'
  ]
}

export default air
