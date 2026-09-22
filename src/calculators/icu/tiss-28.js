const items = [
  ['standard', 'Standard monitoring (hourly vital signs, registration and fluid balance)', 5],
  ['lab', 'Biochemical and microbiological investigations', 1],
  ['singleMed', 'Single medication, any route', 2],
  ['multipleMed', 'Multiple IV medications', 3],
  ['routineDress', 'Routine dressing / pressure-area care', 1],
  ['frequentDress', 'Frequent dressing changes / extensive wound care', 1],
  ['drains', 'Care of drains (excluding gastric tube)', 3],
  ['mechanicalVent', 'Mechanical ventilation / assisted ventilation / PEEP', 5],
  ['suppVent', 'Supplementary ventilatory support / oxygen', 2],
  ['airway', 'Care of artificial airway', 1],
  ['lung', 'Treatment to improve lung function', 1],
  ['singleVaso', 'Single vasoactive medication', 3],
  ['multipleVaso', 'Multiple vasoactive medications', 4],
  ['largeFluid', 'IV replacement of large fluid losses', 4],
  ['arterial', 'Peripheral arterial catheter', 5],
  ['pac', 'Pulmonary artery catheter', 8],
  ['central', 'Central venous line', 2],
  ['cpr', 'CPR after arrest within past 24 h', 3],
  ['singleSpecific', 'Single specific ICU intervention', 3],
  ['multipleSpecific', 'Multiple specific ICU interventions', 5],
  ['outside', 'Specific intervention outside ICU', 5],
  ['dialysis', 'Hemofiltration / dialysis', 3],
  ['urine', 'Quantitative urine output measurement', 2],
  ['diuresis', 'Active diuresis', 3],
  ['icp', 'Intracranial pressure measurement', 4],
  ['acidBase', 'Treatment of complicated metabolic acidosis / alkalosis', 4],
  ['ivNutrition', 'IV alimentation', 3],
  ['enteral', 'Enteral feeding', 2]
]

const calc = {
  id: 'tiss-28',
  name: 'TISS-28',
  shortName: 'TISS-28',
  categoryId: 'icu',
  category: 'ICU',
  description: 'Therapeutic Intervention Scoring System-28 using the weighted 28-item ICU intervention table.',
  type: 'score',

  inputs: items.map(([id, label]) => ({
    id,
    label,
    type: 'boolean'
  })),

  calculate(values) {
    const score = items.reduce(
      (total, [id, , points]) =>
        total + (values[id] === true ? points : 0),
      0
    )

    return {
      value: score,
      displayValue: `${score}/78`,
      unit: 'points',
      category: 'ICU therapeutic intervention / workload score',
      interpretation: `TISS-28 score ${score}/78.`,
      note: 'Higher scores reflect greater intensity of therapeutic interventions and nursing/ICU workload. TISS-28 is not a standalone mortality prediction score.'
    }
  }
}

export default calc
