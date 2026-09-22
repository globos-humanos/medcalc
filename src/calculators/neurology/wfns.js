const wfns = {
  id: 'wfns',
  name: 'WFNS Grade',
  shortName: 'WFNS',
  type: 'score',
  categoryId: 'neurology',
  category: 'Neurology',
  description: 'World Federation of Neurosurgical Societies grading system for subarachnoid hemorrhage.',
  keywords: ['WFNS', 'SAH', 'subarachnoid hemorrhage'],

  inputs: [
    {
      id: 'gcs',
      label: 'GCS',
      type: 'number',
      min: 3,
      max: 15,
      step: 1
    },
    {
      id: 'deficit',
      label: 'Focal neurological deficit',
      type: 'boolean'
    }
  ],

  calculate(v) {
    const gcs = Number(v.gcs)
    const deficit = v.deficit === true

    let grade

    if (gcs === 15 && !deficit) {
      grade = 1
    } else if ((gcs === 13 || gcs === 14) && deficit) {
      grade = 3
    } else if (gcs === 13 || gcs === 14) {
      grade = 2
    } else if (gcs >= 7 && gcs <= 12) {
      grade = 4
    } else {
      grade = 5
    }

    return {
      value: grade,
      displayValue: String(grade),
      unit: 'grade',
      category: 'WFNS Grade ' + grade,
      interpretation: 'WFNS Grade ' + grade + '.',
      note: 'WFNS combines GCS with focal neurological deficit in subarachnoid hemorrhage.'
    }
  },

  references: ['WFNS grading system for subarachnoid hemorrhage']
}

export default wfns
