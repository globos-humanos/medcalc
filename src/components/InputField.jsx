function InputField({
  input,
  value,
  onChange
}) {

  /*
   * ================================
   * BOOLEAN INPUT
   * ================================
   *
   * Boolean inputs default to FALSE.
   *
   * This means:
   * - undefined / empty → No is visually selected
   * - true → Yes is selected
   * - false → No is selected
   *
   * We use `value === true` for Yes and
   * `value !== true` for No so an
   * uninitialized boolean defaults to No.
   */

  if (input.type === 'boolean') {

    const booleanValue = value === true

    return (
      <div className="input-group">

        <label>
          {input.label}
        </label>

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
              onChange(input.id, true)
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
              onChange(input.id, false)
            }
          >
            No
          </button>

        </div>

      </div>
    )
  }


  /*
   * ================================
   * MULTIPLE CHOICE INPUT
   * ================================
   */

  if (input.type === 'choice') {

    return (
      <div className="input-group">

        <label>
          {input.label}
        </label>

        <div className="choice-group">

          {input.options?.map(option => (

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

          ))}

        </div>

      </div>
    )
  }


  /*
   * ================================
   * DEFAULT / NUMBER INPUT
   * ================================
   */

  return (
    <div className="input-group">

      <label htmlFor={input.id}>
        {input.label}
      </label>

      <div className="input-with-unit">

        <input
          id={input.id}
          type={input.type || 'number'}
          value={value ?? ''}
          min={input.min}
          max={input.max}
          step={input.step}
          onChange={(event) =>
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