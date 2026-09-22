const braden = {
  id: 'braden',
  name: 'Braden Scale',
  category: 'General Medicine',
  categoryId: 'general-medicine',
  description: 'Assesses risk of pressure injury using sensory perception, moisture, activity, mobility, nutrition, and friction/shear.',

  inputs: [
    {
      id: 'sensory',
      label: 'Sensory Perception',
      type: 'select',
      options: [
        {
          value: 1,
          label: 'Completely limited â€” unresponsive or unable to communicate discomfort'
        },
        {
          value: 2,
          label: 'Very limited â€” responds only to painful stimuli or cannot communicate discomfort except by moaning/restlessness'
        },
        {
          value: 3,
          label: 'Slightly limited â€” responds to verbal commands but cannot always communicate discomfort'
        },
        {
          value: 4,
          label: 'No impairment â€” responds to verbal commands and has no sensory deficit limiting ability to feel/report discomfort'
        }
      ]
    },

    {
      id: 'moisture',
      label: 'Moisture',
      type: 'select',
      options: [
        {
          value: 1,
          label: 'Constantly moist â€” skin is almost constantly exposed to perspiration, urine, etc.'
        },
        {
          value: 2,
          label: 'Very moist â€” skin is often, but not always, moist'
        },
        {
          value: 3,
          label: 'Occasionally moist â€” skin is occasionally moist'
        },
        {
          value: 4,
          label: 'Rarely moist â€” skin is usually dry'
        }
      ]
    },

    {
      id: 'activity',
      label: 'Activity',
      type: 'select',
      options: [
        {
          value: 1,
          label: 'Bedfast â€” confined to bed'
        },
        {
          value: 2,
          label: 'Chairfast â€” ability to walk severely limited or nonexistent; cannot bear own weight'
        },
        {
          value: 3,
          label: 'Walks occasionally â€” walks occasionally during the day, but for very short distances'
        },
        {
          value: 4,
          label: 'Walks frequently â€” walks outside the room at least twice a day and inside the room at least once every 2 hours'
        }
      ]
    },

    {
      id: 'mobility',
      label: 'Mobility',
      type: 'select',
      options: [
        {
          value: 1,
          label: 'Completely immobile â€” does not make even slight changes in body or extremity position without assistance'
        },
        {
          value: 2,
          label: 'Very limited â€” makes occasional slight changes in body or extremity position but unable to make frequent or significant changes independently'
        },
        {
          value: 3,
          label: 'Slightly limited â€” makes frequent though slight changes in body or extremity position independently'
        },
        {
          value: 4,
          label: 'No limitations â€” makes major and frequent changes in position without assistance'
        }
      ]
    },

    {
      id: 'nutrition',
      label: 'Nutrition',
      type: 'select',
      options: [
        {
          value: 1,
          label: 'Very poor â€” never eats a complete meal; rarely eats more than 1/3 of any food offered'
        },
        {
          value: 2,
          label: 'Probably inadequate â€” rarely eats a complete meal; generally eats about 1/2 of food offered'
        },
        {
          value: 3,
          label: 'Adequate â€” eats more than half of most meals; receives adequate nutrition'
        },
        {
          value: 4,
          label: 'Excellent â€” eats most of every meal; rarely refuses a meal'
        }
      ]
    },

    {
      id: 'friction',
      label: 'Friction & Shear',
      type: 'select',
      options: [
        {
          value: 1,
          label: 'Problem â€” requires moderate to maximum assistance in moving; frequent sliding in bed or chair'
        },
        {
          value: 2,
          label: 'Potential problem â€” moves weakly or requires minimum assistance; skin probably slides against sheets/chair'
        },
        {
          value: 3,
          label: 'No apparent problem â€” moves in bed and chair independently and has sufficient strength to lift completely during repositioning'
        }
      ]
    }
  ],

  calculate(values) {
    const sensory = Number(values.sensory)
    const moisture = Number(values.moisture)
    const activity = Number(values.activity)
    const mobility = Number(values.mobility)
    const nutrition = Number(values.nutrition)
    const friction = Number(values.friction)

    const scores = [
      sensory,
      moisture,
      activity,
      mobility,
      nutrition,
      friction
    ]

    if (scores.some(score => !Number.isFinite(score))) {
      return {
        error: 'Please complete all six Braden Scale domains.'
      }
    }

    const total =
      sensory +
      moisture +
      activity +
      mobility +
      nutrition +
      friction

    let interpretation = ''
    let riskLevel = ''

    if (total >= 19) {
      riskLevel = 'No apparent risk'
      interpretation =
        'Braden score 19â€“23: no apparent pressure-injury risk based on the score.'
    } else if (total >= 15) {
      riskLevel = 'Mild risk'
      interpretation =
        'Braden score 15â€“18: mild pressure-injury risk.'
    } else if (total >= 13) {
      riskLevel = 'Moderate risk'
      interpretation =
        'Braden score 13â€“14: moderate pressure-injury risk.'
    } else if (total >= 10) {
      riskLevel = 'High risk'
      interpretation =
        'Braden score 10â€“12: high pressure-injury risk.'
    } else {
      riskLevel = 'Severe risk'
      interpretation =
        'Braden score 6â€“9: severe pressure-injury risk.'
    }

    return {
      value: total,
      displayValue: `${total}/23`,
      category: riskLevel,
      interpretation,
      note:
        'Lower scores indicate greater pressure-injury risk. Use the score alongside clinical assessment and local pressure-injury prevention protocols.'
    }
  }
}

export default braden
