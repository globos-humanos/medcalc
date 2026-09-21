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

      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        {calculator.name}
      </div>

      <CalculatorCard
        calculator={calculator}
      />

    </main>
  )
}

export default CalculatorPage