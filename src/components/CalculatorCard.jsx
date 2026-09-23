import { useState } from 'react'

import {
  Info,
  BookOpen,
  Calculator as CalculatorIcon
} from 'lucide-react'

import InputField from './InputField'
import ResultCard from './ResultCard'
import FavoriteButton from './FavoriteButton'

import {
  useApp
} from '../context/AppContext'

function CalculatorCard({
  calculator
}) {

  const [
    values,
    setValues
  ] = useState({})

  const [
    result,
    setResult
  ] = useState(null)

  const [
    tab,
    setTab
  ] = useState('calculate')

  const {
    addToRecent
  } = useApp()

  function handleChange(
    id,
    value
  ) {

    setValues(previous => ({
      ...previous,
      [id]: value
    }))

  }

  function calculate() {

    const calculatedResult =
      calculator.calculate(values)

    setResult(
      calculatedResult
    )

    addToRecent(
      calculator.id
    )

  }

  function reset() {

    setValues({})
    setResult(null)

  }

  return (

    <div className="calculator-shell">

      <section className="calculator-title-block">

        <div>

          <p className="page-kicker">
            CLINICAL CALCULATOR
          </p>

          <h1>
            {calculator.name}
          </h1>

          <p>
            {calculator.description}
          </p>

        </div>

        <FavoriteButton
          calculatorId={
            calculator.id
          }
        />

      </section>


      <div
        className="calculator-tabs"
        role="tablist"
      >

        <button
          type="button"
          className={
            tab === 'calculate'
              ? 'active'
              : ''
          }
          onClick={() =>
            setTab('calculate')
          }
        >
          Calculate
        </button>

        <button
          type="button"
          className={
            tab === 'about'
              ? 'active'
              : ''
          }
          onClick={() =>
            setTab('about')
          }
        >
          About
        </button>

        <button
          type="button"
          className={
            tab === 'references'
              ? 'active'
              : ''
          }
          onClick={() =>
            setTab('references')
          }
        >
          References
        </button>

      </div>


      {tab === 'calculate' && (

        <>

          <section className="calculator-section">

            <div className="calculator-section-heading">

              <CalculatorIcon size={17} />

              <span>
                Inputs
              </span>

            </div>


            <div className="input-list">

              {calculator.inputs.map(
                input => (

                  <InputField
                    key={input.id}
                    input={input}
                    value={
                      values[input.id] ??
                      ''
                    }
                    onChange={
                      handleChange
                    }
                  />

                )
              )}

            </div>

          </section>


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


          <ResultCard
            result={result}
          />

        </>

      )}


      {tab === 'about' && (

        <section className="calculator-info-card">

          <div className="calculator-info-icon">
            <Info size={19} />
          </div>

          <div>

            <h2>
              About this calculator
            </h2>

            <p>
              {calculator.description}
            </p>

          </div>

        </section>

      )}


      {tab === 'references' && (

        <section
          className="calculator-info-card references-card"
        >

          <div className="calculator-info-icon">
            <BookOpen size={19} />
          </div>

          <div>

            <h2>
              References
            </h2>

            {calculator.references?.length > 0 ? (

              <ul>

                {calculator.references.map(
                  reference => (

                    <li key={reference}>
                      {reference}
                    </li>

                  )
                )}

              </ul>

            ) : (

              <p>
                No references have been added
                for this calculator yet.
              </p>

            )}

          </div>

        </section>

      )}

    </div>

  )
}

export default CalculatorCard