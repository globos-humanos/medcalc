import { useParams, Link } from 'react-router-dom'
import { getCalculatorById } from '../calculators'
import CalculatorCard from '../components/CalculatorCard'

function CalculatorPage() {
  const { calculatorId } = useParams()

  const calculator = getCalculatorById(calculatorId)

  if (!calculator) {
    return (
      <main className="page">
        <h1>Calculator not found</h1>

        <Link to="/">
          Return home
        </Link>
      </main>
    )
  }

  return (
    <main className="page">

      <nav
        className="breadcrumb"
        aria-label="Breadcrumb"
      >
        <Link
          to="/"
          className="breadcrumb-link"
        >
          Home
        </Link>

        <span
          className="breadcrumb-separator"
          aria-hidden="true"
        >
          ›
        </span>

        <span className="breadcrumb-category">
          {calculator.category}
        </span>

        <span
          className="breadcrumb-separator"
          aria-hidden="true"
        >
          ›
        </span>

        <span className="breadcrumb-current">
          {calculator.name}
        </span>
      </nav>

      <CalculatorCard
        calculator={calculator}
      />

    </main>
  )
}

export default CalculatorPage