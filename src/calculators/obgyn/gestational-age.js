const gestationalAge = {
  id: 'gestational-age',
  name: 'Gestational Age Calculator',
  shortName: 'Gestational Age',
  categoryId: 'obgyn',
  description: 'Calculates gestational age from the first day of the last menstrual period.',
  type: 'calculation',
  inputs: [
    {
      id: 'lmp',
      label: 'First day of LMP',
      type: 'date'
    },
    {
      id: 'date',
      label: 'Date of assessment',
      type: 'date'
    }
  ],
  calculate(v) {
    if (!v.lmp || !v.date) {
      return {
        value: '',
        unit: ''
      };
    }

    const [ly, lm, ld] = v.lmp.split('-').map(Number);
    const [ay, am, ad] = v.date.split('-').map(Number);

    const lmp = new Date(ly, lm - 1, ld);
    const assessment = new Date(ay, am - 1, ad);

    const days = Math.floor((assessment - lmp) / 86400000);

    if (days < 0) {
      return {
        error: 'Assessment date cannot be before the LMP date.'
      };
    }

    return {
      value: `${Math.floor(days / 7)} weeks ${days % 7} days`,
      unit: 'gestational age',
      note: 'LMP-based gestational age. Use the established pregnancy dating method when LMP dating is uncertain or has been revised.'
    };
  }
};

export default gestationalAge;
