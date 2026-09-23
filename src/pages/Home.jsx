import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  Clock3,
  Grid2X2,
  Search,
  Star,
  ArrowRight
} from 'lucide-react'

import { calculators } from '../calculators'
import { categories } from '../data/categories'
import { useApp } from '../context/AppContext'
import CategoryCard from '../components/CategoryCard'

function Home() {

  const navigate = useNavigate()

  const {
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

  function handleSearchSubmit(event) {

    event.preventDefault()

    const query =
      searchQuery.trim()

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

      <section className="home-intro">

        <p className="home-greeting">
          MEDCALC
        </p>

        <h1>
          Clinical tools,
          <br />
          simplified.
        </h1>

        <p className="home-description">
          Essential clinical calculators,
          organized for everyday practice.
        </p>

      </section>


      <form
        className="home-search"
        onSubmit={handleSearchSubmit}
      >

        <Search
          size={19}
          strokeWidth={2}
        />

        <input
          value={searchQuery}
          onChange={event =>
            setSearchQuery(
              event.target.value
            )
          }
          placeholder="Search calculators..."
          aria-label="Search calculators"
        />

      </form>


      <section className="home-shortcuts">

        <Link
          to="/favorites"
          className="shortcut-tile"
        >

          <span className="shortcut-icon pink">
            <Star
              size={19}
              strokeWidth={2}
            />
          </span>

          <strong>
            Favorites
          </strong>

        </Link>


        <Link
          to="/recent"
          className="shortcut-tile"
        >

          <span className="shortcut-icon purple">
            <Clock3
              size={19}
              strokeWidth={2}
            />
          </span>

          <strong>
            Recent
          </strong>

        </Link>


        <Link
          to="/search"
          className="shortcut-tile"
        >

          <span className="shortcut-icon blue">
            <Grid2X2
              size={19}
              strokeWidth={2}
            />
          </span>

          <strong>
            All Tools
          </strong>

        </Link>

      </section>


      {recentCalculators.length > 0 && (

        <section
          className="home-section"
          id="recent"
        >

          <div className="section-heading">

            <div>

              <p className="section-kicker">
                YOUR ACTIVITY
              </p>

              <h2>
                Recently Used
              </h2>

            </div>

          </div>


          <div className="recent-list">

            {recentCalculators
              .slice(0, 5)
              .map(calculator => (

                <Link
                  key={calculator.id}
                  to={`/calculator/${calculator.id}`}
                  className="recent-list-row"
                >

                  <div className="list-leading-icon">
                    <Grid2X2 size={17} />
                  </div>

                  <div className="list-copy">

                    <strong>
                      {calculator.shortName ||
                        calculator.name}
                    </strong>

                    <span>
                      {calculator.category}
                    </span>

                  </div>

                  <ArrowRight size={16} />

                </Link>

              ))}

          </div>

        </section>

      )}


      <section className="home-section">

        <div className="section-heading">

          <div>

            <p className="section-kicker">
              CLINICAL LIBRARY
            </p>

            <h2>
              Categories
            </h2>

          </div>

          <Link
            to="/search"
            className="section-link"
          >
            See all
            <ArrowRight size={15} />
          </Link>

        </div>


        <div className="category-list">

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