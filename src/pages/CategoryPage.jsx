import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Search
} from 'lucide-react'

import {
  Link,
  useParams
} from 'react-router-dom'

import FavoriteButton from '../components/FavoriteButton'

import {
  calculators
} from '../calculators'

import {
  categories
} from '../data/categories'

function CategoryPage() {

  const {
    categoryId
  } = useParams()

  const category =
    categories.find(
      item =>
        item.id === categoryId
    )

  const categoryCalculators =
    calculators.filter(
      calculator =>
        calculator.categoryId === categoryId
    )

  if (!category) {

    return (

      <main className="category-page">

        <section className="category-empty">

          <div className="category-empty-icon">
            <Search size={25} />
          </div>

          <h1>
            Category not found
          </h1>

          <p>
            We couldn't find the category
            you're looking for.
          </p>

          <Link
            to="/"
            className="category-back-button"
          >
            <ArrowLeft size={17} />
            Back to home
          </Link>

        </section>

      </main>

    )
  }

  return (

    <main className="category-page">

      <Link
        to="/"
        className="category-back-link"
      >
        <ArrowLeft size={17} />
        <span>
          All categories
        </span>
      </Link>

      <section className="category-hero">

        <div className="category-hero-icon">
          {category.icon}
        </div>

        <div className="category-hero-content">

          <p className="eyebrow">
            CLINICAL CATEGORY
          </p>

          <h1>
            {category.name}
          </h1>

          <p>
            {category.description}
          </p>

          <div className="category-count">

            <Calculator size={15} />

            <span>
              {categoryCalculators.length}{' '}
              {categoryCalculators.length === 1
                ? 'calculator'
                : 'calculators'}
            </span>

          </div>

        </div>

      </section>

      <section className="category-results">

        <div className="category-results-heading">

          <div>

            <h2>
              Clinical tools
            </h2>

            <p>
              Select a calculator to get started.
            </p>

          </div>

        </div>

        {categoryCalculators.length > 0 ? (

          <div className="category-calculator-grid">

            {categoryCalculators.map(
              calculator => (

                <Link
                  key={calculator.id}
                  to={`/calculator/${calculator.id}`}
                  className="category-calculator-card"
                >

                  <div className="category-card-top">

                    <div className="category-card-icon">

                      <Calculator size={20} />

                    </div>

                    <FavoriteButton
                      calculatorId={
                        calculator.id
                      }
                    />

                  </div>

                  <div className="category-card-content">

                    <span className="category-card-type">

                      {calculator.type === 'score'
                        ? 'Clinical Score'
                        : 'Calculator'}

                    </span>

                    <h3>
                      {calculator.name}
                    </h3>

                    {calculator.shortName && (

                      <span className="category-card-short-name">

                        {calculator.shortName}

                      </span>

                    )}

                    <p>
                      {calculator.description}
                    </p>

                  </div>

                  <div className="category-card-footer">

                    <span>
                      Open calculator
                    </span>

                    <ArrowRight
                      size={17}
                    />

                  </div>

                </Link>

              )
            )}

          </div>

        ) : (

          <section className="category-empty-tools">

            <div className="category-empty-tools-icon">
              <Calculator size={24} />
            </div>

            <h2>
              No calculators yet
            </h2>

            <p>
              This category is ready for
              calculators from the master list.
            </p>

          </section>

        )}

      </section>

    </main>

  )
}

export default CategoryPage