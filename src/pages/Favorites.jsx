import {
  Link
} from 'react-router-dom'

import {
  Star
} from 'lucide-react'

import {
  calculators
} from '../calculators'

import {
  useApp
} from '../context/AppContext'

function Favorites() {

  const {
    favorites
  } = useApp()

  const favoriteCalculators =
    calculators.filter(
      calculator =>
        favorites.includes(
          calculator.id
        )
    )

  return (
    <main className="page">

      <div className="page-heading">

        <p className="eyebrow">
          YOUR TOOLS
        </p>

        <h1>
          Favorites
        </h1>

        <p>
          Your frequently used calculators
          in one place.
        </p>

      </div>

      {favoriteCalculators.length === 0 ? (

        <div className="empty-state">

          <Star size={36} />

          <h3>
            No favorites yet
          </h3>

          <p>
            Tap the star on any calculator
            to save it here.
          </p>

          <Link
            to="/search"
            className="primary-button"
          >
            Browse calculators
          </Link>

        </div>

      ) : (

        <div className="simple-list">

          {favoriteCalculators.map(
            calculator => (

              <Link
                key={calculator.id}
                to={`/calculator/${calculator.id}`}
                className="list-item"
              >

                <div>

                  <strong>
                    {calculator.name}
                  </strong>

                  <span>
                    {calculator.category}
                  </span>

                </div>

                <Star
                  size={18}
                  fill="currentColor"
                />

              </Link>

            )
          )}

        </div>

      )}

    </main>
  )
}

export default Favorites