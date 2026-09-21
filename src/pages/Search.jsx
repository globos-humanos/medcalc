import {
  useMemo,
  useState
} from 'react'

import {
  Link,
  useSearchParams
} from 'react-router-dom'

import {
  ArrowRight,
  Calculator,
  Search as SearchIcon,
  X
} from 'lucide-react'

import FavoriteButton from '../components/FavoriteButton'

import {
  calculators
} from '../calculators'

import {
  searchCalculators
} from '../utils/search'

function Search() {

  const [
    searchParams,
    setSearchParams
  ] = useSearchParams()

  const initialQuery =
    searchParams.get('q') || ''

  const [
    query,
    setQuery
  ] = useState(initialQuery)

  const [
    typeFilter,
    setTypeFilter
  ] = useState('all')

  const filteredCalculators =
    useMemo(() => {

      let results =
        searchCalculators(
          calculators,
          query
        )

      if (typeFilter !== 'all') {

        results =
          results.filter(
            calculator =>
              calculator.type ===
              typeFilter
          )

      }

      return results

    }, [
      query,
      typeFilter
    ])

  function handleSearchChange(event) {

    const value =
      event.target.value

    setQuery(value)

    if (value.trim()) {

      setSearchParams({
        q: value
      })

    } else {

      setSearchParams({})

    }
  }

  function clearSearch() {

    setQuery('')
    setSearchParams({})

  }

  return (

    <main className="search-page">

      {/* =========================
          HEADER
      ========================== */}

      <section className="search-header">

        <div>

          <p className="eyebrow">
            MEDCALC
          </p>

          <h1>
            Find a calculator
          </h1>

          <p className="search-subtitle">
            Search by name, abbreviation,
            category, or clinical keyword.
          </p>

        </div>

        <div className="search-header-icon">
          <SearchIcon size={28} />
        </div>

      </section>


      {/* =========================
          SEARCH BOX
      ========================== */}

      <section className="search-panel">

        <div className="search-main-input">

          <SearchIcon
            size={19}
            className="search-main-icon"
          />

          <input
            type="search"
            value={query}
            onChange={handleSearchChange}
            placeholder="Try BMI, Wells, MELD..."
            aria-label="Search calculators"
          />

          {query && (

            <button
              type="button"
              className="search-main-clear"
              onClick={clearSearch}
              aria-label="Clear search"
            >

              <X size={17} />

            </button>

          )}

        </div>


        {/* =========================
            FILTERS
        ========================== */}

        <div className="search-filter-row">

          <span className="filter-label">
            Show
          </span>

          <button
            type="button"
            className={
              `search-filter ${
                typeFilter === 'all'
                  ? 'active'
                  : ''
              }`
            }
            onClick={() =>
              setTypeFilter('all')
            }
          >
            All
          </button>

          <button
            type="button"
            className={
              `search-filter ${
                typeFilter === 'calculator'
                  ? 'active'
                  : ''
              }`
            }
            onClick={() =>
              setTypeFilter('calculator')
            }
          >
            Calculators
          </button>

          <button
            type="button"
            className={
              `search-filter ${
                typeFilter === 'score'
                  ? 'active'
                  : ''
              }`
            }
            onClick={() =>
              setTypeFilter('score')
            }
          >
            Scores
          </button>

        </div>

      </section>


      {/* =========================
          RESULTS HEADER
      ========================== */}

      <section className="search-results-heading">

        <div>

          <h2>
            {query
              ? 'Search results'
              : 'All calculators'}
          </h2>

          <p>

            {query
              ? `${filteredCalculators.length} ${
                  filteredCalculators.length === 1
                    ? 'result'
                    : 'results'
                } for "${query}"`
              : `${filteredCalculators.length} ${
                  filteredCalculators.length === 1
                    ? 'calculator'
                    : 'calculators'
                } available`}

          </p>

        </div>

        {query && (

          <button
            type="button"
            className="clear-search-button"
            onClick={clearSearch}
          >
            Clear
          </button>

        )}

      </section>


      {/* =========================
          RESULTS
      ========================== */}

      {filteredCalculators.length > 0 ? (

        <section className="search-results-grid">

          {filteredCalculators.map(
            calculator => (

              <Link
                key={calculator.id}
                to={`/calculator/${calculator.id}`}
                className="search-calculator-card"
              >

                <div className="search-card-top">

                  <div className="search-card-icon">

                    <Calculator size={20} />

                  </div>

                  <FavoriteButton
                    calculatorId={
                      calculator.id
                    }
                  />

                </div>


                <div className="search-card-content">

                  <span className="search-card-category">

                    {calculator.category}

                  </span>

                  <h3>

                    {calculator.name}

                  </h3>

                  {calculator.shortName && (

                    <span className="search-card-short-name">

                      {calculator.shortName}

                    </span>

                  )}

                  <p>

                    {calculator.description}

                  </p>

                </div>


                <div className="search-card-footer">

                  <span>

                    {calculator.type === 'score'
                      ? 'Clinical Score'
                      : 'Calculator'}

                  </span>

                  <ArrowRight
                    size={17}
                  />

                </div>

              </Link>

            )
          )}

        </section>

      ) : (

        /* =========================
           EMPTY STATE
        ========================== */

        <section className="search-empty">

          <div className="search-empty-icon">

            <SearchIcon size={25} />

          </div>

          <h2>
            No calculators found
          </h2>

          <p>
            Try a different name,
            abbreviation, or clinical
            keyword.
          </p>

          <button
            type="button"
            className="search-empty-button"
            onClick={clearSearch}
          >
            Clear search
          </button>

        </section>

      )}

    </main>

  )
}

export default Search