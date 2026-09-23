import {
  ArrowRight,
  Calculator,
  Clock3,
  Trash2
} from 'lucide-react'

import {
  Link
} from 'react-router-dom'

import {
  calculators
} from '../calculators'

import {
  useApp
} from '../context/AppContext'

function Recent() {

  const {
    recent,
    clearRecent
  } = useApp()

  const recentCalculators =
    recent
      .map(id =>
        calculators.find(
          calculator =>
            calculator.id === id
        )
      )
      .filter(Boolean)

  return (

    <main className="page activity-page">

      <Link
        to="/"
        className="ios-back-link"
      >
        <Clock3 size={16} />
        <span>
          MedCalc
        </span>
      </Link>


      <section className="page-title-block">

        <p className="page-kicker">
          YOUR ACTIVITY
        </p>

        <div className="activity-title-row">

          <div>

            <h1>
              Recently Used
            </h1>

            <p>
              Calculators you've opened recently.
            </p>

          </div>

          {recentCalculators.length > 0 && (

            <button
              type="button"
              className="activity-clear-button"
              onClick={clearRecent}
            >
              <Trash2 size={14} />
              Clear
            </button>

          )}

        </div>

      </section>


      {recentCalculators.length === 0 ? (

        <section className="activity-empty">

          <div className="activity-empty-icon">
            <Clock3 size={24} />
          </div>

          <h2>
            Nothing here yet
          </h2>

          <p>
            Calculators you use will appear
            here automatically.
          </p>

          <Link
            to="/search"
            className="activity-primary-button"
          >
            Browse calculators
          </Link>

        </section>

      ) : (

        <section className="activity-list">

          {recentCalculators.map(
            calculator => (

              <Link
                key={calculator.id}
                to={`/calculator/${calculator.id}`}
                className="activity-row"
              >

                <div className="activity-row-icon">
                  <Calculator size={18} />
                </div>

                <div className="activity-row-copy">

                  <strong>
                    {calculator.name}
                  </strong>

                  <span>
                    {calculator.category}
                  </span>

                </div>

                <ArrowRight
                  size={16}
                  className="activity-row-arrow"
                />

              </Link>

            )
          )}

        </section>

      )}

    </main>

  )
}

export default Recent