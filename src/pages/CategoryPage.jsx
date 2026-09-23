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

      <main className="page category-page">

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

    <main className="page category-page">

      <Link
        to="/"
        className="ios-back-link"
      >
        <ArrowLeft size={17} />
        <span>
          MedCalc
        </span>
      </Link>


      <section
        className={`category-hero ${category.color}`}
      >

        <div className="category-hero-icon">
          {category.icon}
        </div>

        <div className="category-hero-content">

          <p className="page-kicker">
            CLINICAL CATEGORY
          </p>

          <h1>
            {category.name}
          </h1>

          <p>
            {category.description}
          </p>

        </div>

        <div className="category-hero-count">

          <Calculator size={15} />

          {categoryCalculators.length}
          {' '}
          calculators

        </div>

      </section>


      <section className="category-results">

        <div className="section-heading">

          <div>

            <p className="section-kicker">
              TOOLS
            </p>

            <h2>
              Clinical calculators
            </h2>

          </div>

        </div>


        {categoryCalculators.length > 0 ? (

          <div className="calculator-list">

            {categoryCalculators.map(
              calculator => (

                <Link
                  key={calculator.id}
                  to={`/calculator/${calculator.id}`}
                  className="calculator-list-row"
                >

                  <div className="calculator-list-icon">
                    <Calculator size={18} />
                  </div>

                  <div className="calculator-list-copy">

                    <h3>
                      {calculator.name}
                    </h3>

                    <p>
                      {calculator.description ||
                        (
                          calculator.type === 'score'
                            ? 'Clinical score'
                            : 'Clinical calculator'
                        )}
                    </p>

                  </div>

                  <FavoriteButton
                    calculatorId={
                      calculator.id
                    }
                  />

                  <ArrowRight
                    className="calculator-list-arrow"
                    size={16}
                  />

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