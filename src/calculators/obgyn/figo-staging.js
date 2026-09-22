const figo = {
  id: 'figo-staging',
  name: 'FIGO Cervical Cancer Staging',
  shortName: 'FIGO Staging',
  categoryId: 'obgyn',
  description: 'FIGO 2018 cervical cancer staging based on tumor extent, size, lymph nodes and distant spread.',
  type: 'score',

  inputs: [
    {
      id: 'distant',
      label: 'Distant metastasis',
      type: 'boolean'
    },
    {
      id: 'bladderRectum',
      label: 'Biopsy-proven bladder or rectal mucosal invasion',
      type: 'boolean'
    },
    {
      id: 'pelvicOrgans',
      label: 'Spread to adjacent pelvic organs',
      type: 'boolean'
    },
    {
      id: 'lowerVagina',
      label: 'Lower third of vagina involved',
      type: 'boolean'
    },
    {
      id: 'pelvicWall',
      label: 'Pelvic wall involvement',
      type: 'boolean'
    },
    {
      id: 'hydronephrosis',
      label: 'Hydronephrosis or non-functioning kidney attributable to tumor',
      type: 'boolean'
    },
    {
      id: 'paraAorticNodes',
      label: 'Para-aortic lymph node metastasis',
      type: 'boolean'
    },
    {
      id: 'pelvicNodes',
      label: 'Pelvic lymph node metastasis',
      type: 'boolean'
    },
    {
      id: 'parametrial',
      label: 'Parametrial involvement',
      type: 'boolean'
    },
    {
      id: 'upperVagina',
      label: 'Upper two-thirds of vagina involved without parametrial involvement',
      type: 'boolean'
    },
    {
      id: 'depth',
      label: 'Maximum stromal invasion depth',
      type: 'number',
      unit: 'mm',
      min: 0
    },
    {
      id: 'size',
      label: 'Maximum tumor diameter',
      type: 'number',
      unit: 'cm',
      min: 0
    }
  ],

  calculate(v) {
    if (v.distant) {
      return {
        value: 'IVB',
        unit: 'FIGO',
        interpretation: 'Stage IVB',
        note: 'Distant organ spread corresponds to FIGO stage IVB.'
      };
    }

    if (v.bladderRectum) {
      return {
        value: 'IVA',
        unit: 'FIGO',
        interpretation: 'Stage IVA',
        note: 'Biopsy-proven bladder or rectal mucosal invasion corresponds to stage IVA. Bullous edema alone is not sufficient.'
      };
    }

    if (v.pelvicOrgans) {
      return {
        value: 'IVA',
        unit: 'FIGO',
        interpretation: 'Stage IVA',
        note: 'Spread to adjacent pelvic organs corresponds to stage IVA.'
      };
    }

    if (v.paraAorticNodes) {
      return {
        value: 'IIIC2',
        unit: 'FIGO',
        interpretation: 'Stage IIIC2',
        note: 'Para-aortic lymph node metastasis corresponds to FIGO IIIC2 regardless of primary tumor size or local extent.'
      };
    }

    if (v.pelvicNodes) {
      return {
        value: 'IIIC1',
        unit: 'FIGO',
        interpretation: 'Stage IIIC1',
        note: 'Pelvic lymph node metastasis corresponds to FIGO IIIC1 regardless of primary tumor size or local extent.'
      };
    }

    if (v.lowerVagina || v.pelvicWall || v.hydronephrosis) {
      if (v.lowerVagina && !v.pelvicWall && !v.hydronephrosis) {
        return {
          value: 'IIIA',
          unit: 'FIGO',
          interpretation: 'Stage IIIA',
          note: 'Lower-third vaginal involvement without pelvic wall involvement corresponds to stage IIIA.'
        };
      }

      return {
        value: 'IIIB',
        unit: 'FIGO',
        interpretation: 'Stage IIIB',
        note: 'Pelvic wall involvement or tumor-related hydronephrosis/non-functioning kidney corresponds to stage IIIB.'
      };
    }

    if (v.parametrial) {
      return {
        value: 'IIB',
        unit: 'FIGO',
        interpretation: 'Stage IIB',
        note: 'Parametrial involvement without extension to the pelvic wall corresponds to stage IIB.'
      };
    }

    if (v.upperVagina) {
      const size = Number(v.size);

      if (Number.isFinite(size) && size >= 4) {
        return {
          value: 'IIA2',
          unit: 'FIGO',
          interpretation: 'Stage IIA2',
          note: 'Upper-two-thirds vaginal involvement without parametrial involvement and tumor size >=4 cm corresponds to IIA2.'
        };
      }

      return {
        value: 'IIA1',
        unit: 'FIGO',
        interpretation: 'Stage IIA1',
        note: 'Upper-two-thirds vaginal involvement without parametrial involvement and tumor size <4 cm corresponds to IIA1.'
      };
    }

    const depth = Number(v.depth);
    const size = Number(v.size);

    if (Number.isFinite(depth) && depth > 0 && depth < 5) {
      if (depth < 3) {
        return {
          value: 'IA1',
          unit: 'FIGO',
          interpretation: 'Stage IA1',
          note: 'Microscopically diagnosed invasive carcinoma with stromal invasion <3 mm corresponds to IA1.'
        };
      }

      return {
        value: 'IA2',
        unit: 'FIGO',
        interpretation: 'Stage IA2',
        note: 'Microscopically diagnosed invasive carcinoma with stromal invasion >=3 mm and <5 mm corresponds to IA2.'
      };
    }

    if (Number.isFinite(depth) && depth >= 5) {
      if (Number.isFinite(size)) {
        if (size < 2) {
          return {
            value: 'IB1',
            unit: 'FIGO',
            interpretation: 'Stage IB1',
            note: 'Tumor confined to the cervix, stromal invasion >=5 mm and size <2 cm corresponds to IB1.'
          };
        }

        if (size < 4) {
          return {
            value: 'IB2',
            unit: 'FIGO',
            interpretation: 'Stage IB2',
            note: 'Tumor confined to the cervix, stromal invasion >=5 mm and size >=2 cm but <4 cm corresponds to IB2.'
          };
        }

        return {
          value: 'IB3',
          unit: 'FIGO',
          interpretation: 'Stage IB3',
          note: 'Tumor confined to the cervix, stromal invasion >=5 mm and size >=4 cm corresponds to IB3.'
        };
      }
    }

    return {
      value: 'I',
      unit: 'FIGO',
      interpretation: 'Stage I range',
      note: 'The available findings indicate disease confined to the cervix, but complete pathologic and clinical information is required for definitive FIGO substage assignment.'
    };
  }
};

export default figo;
