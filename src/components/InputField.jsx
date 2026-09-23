function InputField({
  input,
  value,
  onChange
}) {

  if (input.type === 'boolean') {

    const booleanValue =
      value === true

    return (

      <div className="input-group choice-input-group">

        <div className="input-label-block">

          <label>
            {input.label}
          </label>

        </div>

        <div className="choice-group">

          <button
            type="button"
            className={
              `choice-button ${
                booleanValue
                  ? 'selected'
                  : ''
              }`
            }
            onClick={() =>
              onChange(
                input.id,
                true
              )
            }
          >
            Yes
          </button>

          <button
            type="button"
            className={
              `choice-button ${
                !booleanValue
                  ? 'selected'
                  : ''
              }`
            }
            onClick={() =>
              onChange(
                input.id,
                false
              )
            }
          >
            No
          </button>

        </div>

      </div>

    )
  }


  if (input.type === 'choice') {

    return (

      <div
        className="
          input-group
          choice-input-group
          stacked-choice
        "
      >

        <div className="input-label-block">

          <label>
            {input.label}
          </label>

        </div>

        <div
          className="
            choice-group
            choice-group-wrap
          "
        >

          {input.options?.map(
            option => (

              <button
                key={option.value}
                type="button"
                className={
                  `choice-button ${
                    String(value) ===
                    String(option.value)
                      ? 'selected'
                      : ''
                  }`
                }
                onClick={() =>
                  onChange(
                    input.id,
                    option.value
                  )
                }
              >
                {option.label}
              </button>

            )
          )}

        </div>

      </div>

    )
  }


  return (

    <div className="input-group">

      <label htmlFor={input.id}>
        {input.label}
      </label>

      <div className="input-with-unit">

        <input
          id={input.id}
          type={
            input.type ||
            'number'
          }
          value={
            value ?? ''
          }
          min={input.min}
          max={input.max}
          step={input.step}
          onChange={event =>
            onChange(
              input.id,
              event.target.value
            )
          }
          placeholder={
            input.placeholder ||
            'Enter value'
          }
        />

        {input.unit && (

          <span className="unit">
            {input.unit}
          </span>

        )}

      </div>

    </div>

  )
}

export default InputField