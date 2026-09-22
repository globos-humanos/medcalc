const edd = {
  id: 'edd',
  name: 'Estimated Date of Delivery',
  shortName: 'EDD',
  categoryId: 'obgyn',
  description: 'Estimated date of delivery from the first day of the last menstrual period.',
  type: 'calculation',
  inputs: [
    {
      id: 'lmp',
      label: 'First day of LMP',
      type: 'date'
    }
  ],
  calculate(v) {
    if (!v.lmp) {
      return {
        value: '',
        unit: ''
      };
    }

    const [year, month, day] = v.lmp.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    date.setDate(date.getDate() + 280);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return {
      value: `${yyyy}-${mm}-${dd}`,
      unit: 'date',
      note: 'Standard 280-day LMP-based estimate. Established pregnancy dating may be revised when appropriate using ultrasound or other clinical information.'
    };
  }
};

export default edd;
