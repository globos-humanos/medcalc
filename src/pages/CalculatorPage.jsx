import {
  Link,
  useParams
} from 'react-router-dom'

import {
  ArrowLeft
} from 'lucide-react'

import {
  getCalculatorById
} from '../calculators'

import CalculatorCard from '../components/CalculatorCard'

function CalculatorPage() {

  const {
    calculatorId
  } = useParams()

  const calculator =
    getCalculatorById(
      calculatorId
    )

  if (!calculator) {

    return (

      <main className="page">

        <section className="calculator-empty">

          <h1>
            Calculator not found
          </h1>

          <Link to="/">
            Return home
          </Link>

        </section>

      </main>

    )
  }

  return (

    <main
      className="
        page
        calculator-page
      "
    >

      <Link
        to={`/category/${calculator.categoryId}`}
        className="ios-back-link"
      >

        <ArrowLeft size={17} />

        <span>
          {calculator.category}
        </span>

      </Link>


      <CalculatorCard
        calculator={calculator}
      />

    </main>

  )
}

export default CalculatorPage