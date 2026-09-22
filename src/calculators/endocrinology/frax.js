const frax = {
  id: 'frax',
  name: 'FRAX Fracture Risk Assessment',
  shortName: 'FRAX',
  categoryId: 'endocrinology',
  category: 'Endocrinology',
  description:
    'Collects the clinical inputs used by FRAX. Actual 10-year fracture probabilities require the validated country-specific FRAX model.',
  type: 'assessment',

  inputs: [
    {
      id: 'country',
      label: 'Country / FRAX model',
      type: 'text'
    },
    {
      id: 'age',
      label: 'Age',
      unit: 'years',
      min: 40,
      max: 90,
      step: 1
    },
    {
      id: 'sex',
      label: 'Sex',
      type: 'choice',
      options: [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
      ]
    },
    {
      id: 'weight',
      label: 'Weight',
      unit: 'kg',
      min: 20,
      max: 300,
      step: 0.1
    },
    {
      id: 'height',
      label: 'Height',
      unit: 'cm',
      min: 100,
      max: 250,
      step: 0.1
    },
    {
      id: 'priorFracture',
      label: 'Previous fragility fracture?',
      type: 'boolean'
    },
    {
      id: 'parentHip',
      label: 'Parental hip fracture?',
      type: 'boolean'
    },
    {
      id: 'smoker',
      label: 'Current smoker?',
      type: 'boolean'
    },
    {
      id: 'glucocorticoid',
      label: 'Glucocorticoid use?',
      type: 'boolean'
    },
    {
      id: 'ra',
      label: 'Rheumatoid arthritis?',
      type: 'boolean'
    },
    {
      id: 'secondary',
      label: 'Secondary osteoporosis?',
      type: 'boolean'
    },
    {
      id: 'alcohol',
      label: 'Alcohol ≥3 units/day?',
      type: 'boolean'
    },
    {
      id: 'bmd',
      label: 'Femoral neck BMD',
      unit: 'g/cm²',
      min: 0.2,
      max: 2,
      step: 0.001
    }
  ],

  calculate(v) {
    const age = Number(v.age)
    const weight = Number(v.weight)
    const height = Number(v.height)
    const bmd = Number(v.bmd)

    if (
      !v.country ||
      !['male', 'female'].includes(v.sex) ||
      !Number.isFinite(age) ||
      !Number.isFinite(weight) ||
      !Number.isFinite(height) ||
      !Number.isFinite(bmd)
    ) {
      return {
        error: 'Please complete the FRAX input set, including the selected country/model.'
      }
    }

    const bmi = weight / Math.pow(height / 100, 2)

    return {
      value: 'FRAX inputs ready',
      displayValue: 'Ready',
      unit: 'FRAX',
      category: 'Validated country-specific calculation required',
      note:
        `Inputs captured for ${v.country}. Calculated BMI: ${bmi.toFixed(1)} kg/m². FRAX probabilities cannot be safely reproduced with a generic equation because the model is country-specific and incorporates fracture and mortality hazards. Use the corresponding validated FRAX country model for the 10-year hip and major osteoporotic fracture probabilities.`
    }
  },

  references: [
    'FRAXplus / FRAX. The FRAX models integrate clinical risk factors with or without femoral-neck BMD and provide 10-year hip and major osteoporotic fracture probabilities.',
    'International Osteoporosis Foundation / FRAXplus.'
  ]
}

export default frax
