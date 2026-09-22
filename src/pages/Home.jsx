import {
  useState
} from 'react'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import {
  ArrowRight,
  Clock,
  Grid2X2,
  Star
} from 'lucide-react'

import {
  calculators
} from '../calculators'

import {
  categories
} from '../data/categories'

import {
  useApp
} from '../context/AppContext'

import CategoryCard from '../components/CategoryCard'
import CalculatorSearch from '../components/CalculatorSearch'

function Home() {

  const navigate = useNavigate()

  const {
    favorites,
    recent
  } = useApp()

  const [
    searchQuery,
    setSearchQuery
  ] = useState('')

  const recentCalculators =
    recent
      .map(id =>
        calculators.find(
          calculator =>
            calculator.id === id
        )
      )
      .filter(Boolean)

  function handleSearchSubmit(value) {

    const query =
      value.trim()

    if (!query) {
      navigate('/search')
      return
    }

    navigate(
      `/search?q=${encodeURIComponent(query)}`
    )
  }

  return (
    <main className="home">

      <section className="hero-card">

        <div>

          <p className="eyebrow">
            CLINICAL TOOLS
          </p>

          <h1>
            Better decisions,
            <br />
            every day.
          </h1>

          <p>
            Evidence-based calculators
            at your fingertips.
          </p>

        </div>

        <div className="hero-decoration">
          ðŸ©º
        </div>

      </section>

      <CalculatorSearch
        value={searchQuery}
        onChange={setSearchQuery}
        onSubmit={handleSearchSubmit}
        placeholder="Search calculators..."
      />

      <div className="quick-actions">

        <Link
          to="/favorites"
          className="quick-action pink"
        >

          <Star size={20} />

          <span>
            Favorites
          </span>

        </Link>

        <Link
          to="/"
          className="quick-action purple"
        >

          <Clock size={20} />

          <span>
            Recent
          </span>

        </Link>

        <Link
          to="/search"
          className="quick-action cyan"
        >

          <Grid2X2 size={20} />

          <span>
            All Tools
          </span>

        </Link>

      </div>

      {recentCalculators.length > 0 && (

        <section className="home-section">

          <div className="section-heading">

            <h2>
              Recently Used
            </h2>

            <Link to="/search">
              View all
              <ArrowRight size={15} />
            </Link>

          </div>

          <div className="recent-row">

            {recentCalculators
              .slice(0, 4)
              .map(calculator => (

                <Link
                  key={calculator.id}
                  to={`/calculator/${calculator.id}`}
                  className="recent-card"
                >

                  <strong>
                    {calculator.shortName ||
                      calculator.name}
                  </strong>

                  <span>
                    {calculator.category}
                  </span>

                </Link>

              ))}

          </div>

        </section>

      )}

      <section className="home-section">

        <div className="section-heading">

          <h2>
            Categories
          </h2>

          <Link to="/search">
            View all
            <ArrowRight size={15} />
          </Link>

        </div>

        <div className="category-grid">

          {categories.map(category => {

            const count =
              calculators.filter(
                calculator =>
                  calculator.categoryId ===
                  category.id
              ).length

            return (
              <CategoryCard
                key={category.id}
                category={category}
                calculatorCount={count}
              />
            )

          })}

        </div>

      </section>

    </main>
  )
}

export default Home
