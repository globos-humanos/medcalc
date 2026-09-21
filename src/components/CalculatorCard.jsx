import { useState } from 'react'

import InputField from './InputField'
import ResultCard from './ResultCard'
import FavoriteButton from './FavoriteButton'

function CalculatorCard({ calculator }) {
  const [values, setValues] = useState({})
  const [result, setResult] = useState(null)

  function handleChange(id, value) {
    setValues(previous => ({
      ...previous,
      [id]: value
    }))
  }

  function calculate() {
    const calculatedResult = calculator.calculate(values)

    setResult(calculatedResult)
  }

  function reset() {
    setValues({})
    setResult(null)
  }

  return (
    <div className="calculator-card">

      {/* Calculator heading */}
      <div className="calculator-header-row">

        <div className="calculator-header">

          <h1>
            {calculator.name}
          </h1>

          <p>
            {calculator.description}
          </p>

        </div>

        {/* Favorite button */}
        <FavoriteButton
          calculatorId={calculator.id}
        />

      </div>

      {/* Calculator inputs */}
      <div className="calculator-inputs">

        {calculator.inputs.map(input => (
          <InputField
            key={input.id}
            input={input}
            value={values[input.id] || ''}
            onChange={handleChange}
          />
        ))}

      </div>

      {/* Actions */}
      <div className="calculator-actions">

        <button
          className="calculate-button"
          onClick={calculate}
        >
          Calculate
        </button>

        <button
          className="reset-button"
          onClick={reset}
        >
          Reset
        </button>

      </div>

      {/* Result */}
      <ResultCard
        result={result}
      />

      {/* References */}
      {calculator.references?.length > 0 && (

        <div className="references">

          <h3>
            Reference
          </h3>

          <ul>

            {calculator.references.map(reference => (
              <li key={reference}>
                {reference}
              </li>
            ))}

          </ul>

        </div>

      )}

    </div>
  )
}

export default CalculatorCard