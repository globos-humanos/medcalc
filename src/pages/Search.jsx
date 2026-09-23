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
  FolderOpen,
  Search as SearchIcon,
  Tag,
  X
} from 'lucide-react'

import FavoriteButton from '../components/FavoriteButton'

import {
  calculators
} from '../calculators'

import {
  categories
} from '../data/categories'

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
    filter,
    setFilter
  ] = useState('all')


  const results =
    useMemo(() => {

      const q =
        query.trim().toLowerCase()

      if (!q) {
        return calculators
      }

      if (filter === 'categories') {

        const matchingCategoryIds =
          categories
            .filter(category =>
              category.name
                .toLowerCase()
                .includes(q)
            )
            .map(category =>
              category.id
            )

        return calculators.filter(
          calculator =>
            matchingCategoryIds.includes(
              calculator.categoryId
            )
        )
      }


      if (filter === 'keywords') {

        return calculators.filter(
          calculator => {

            const keywords =
              Array.isArray(
                calculator.keywords
              )
                ? calculator.keywords
                : []

            const aliases =
              Array.isArray(
                calculator.aliases
              )
                ? calculator.aliases
                : []

            return [
              ...keywords,
              ...aliases
            ].some(value =>
              String(value)
                .toLowerCase()
                .includes(q)
            )

          }
        )
      }


      if (filter === 'calculators') {

        return calculators.filter(
          calculator => {

            const name =
              String(
                calculator.name || ''
              ).toLowerCase()

            const shortName =
              String(
                calculator.shortName || ''
              ).toLowerCase()

            const description =
              String(
                calculator.description || ''
              ).toLowerCase()

            return (
              name.includes(q) ||
              shortName.includes(q) ||
              description.includes(q)
            )

          }
        )
      }


      return searchCalculators(
        calculators,
        query
      )

    }, [
      query,
      filter
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


  const filters = [
    {
      id: 'all',
      label: 'All'
    },
    {
      id: 'calculators',
      label: 'Calculators'
    },
    {
      id: 'categories',
      label: 'Categories'
    },
    {
      id: 'keywords',
      label: 'Keywords'
    }
  ]


  return (

    <main className="page search-page">

      <section className="page-title-block">

        <p className="page-kicker">
          MEDCALC
        </p>

        <h1>
          Search
        </h1>

        <p>
          Find a calculator by name,
          category, abbreviation, or keyword.
        </p>

      </section>


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
            placeholder="Search calculators..."
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


        <div
          className="search-filter-row"
          role="tablist"
          aria-label="Search type"
        >

          {filters.map(item => (

            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={
                filter === item.id
              }
              className={
                `search-filter ${
                  filter === item.id
                    ? 'active'
                    : ''
                }`
              }
              onClick={() =>
                setFilter(item.id)
              }
            >

              {item.label}

            </button>

          ))}

        </div>

      </section>


      <section className="search-results-heading">

        <div>

          <p className="section-kicker">
            {query
              ? filter === 'categories'
                ? 'CATEGORY RESULTS'
                : filter === 'keywords'
                  ? 'KEYWORD RESULTS'
                  : 'RESULTS'
              : 'CLINICAL LIBRARY'}
          </p>

          <h2>
            {query
              ? `${results.length} ${
                  results.length === 1
                    ? 'result'
                    : 'results'
                }`
              : `${results.length} calculators`}
          </h2>

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


      {results.length > 0 ? (

        <section className="search-results-grid">

          {results.map(
            calculator => (

              <Link
                key={calculator.id}
                to={`/calculator/${calculator.id}`}
                className="search-calculator-card"
              >

                <div className="search-card-icon">

                  {filter === 'categories'
                    ? (
                      <FolderOpen
                        size={18}
                      />
                    )
                    : filter === 'keywords'
                      ? (
                        <Tag
                          size={18}
                        />
                      )
                      : (
                        <Calculator
                          size={18}
                        />
                      )}

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

                </div>


                <FavoriteButton
                  calculatorId={
                    calculator.id
                  }
                />


                <ArrowRight
                  className="search-card-arrow"
                  size={16}
                />

              </Link>

            )
          )}

        </section>

      ) : (

        <section className="search-empty">

          <div className="search-empty-icon">
            <SearchIcon size={23} />
          </div>

          <h2>
            No calculators found
          </h2>

          <p>
            Try a different name,
            category, or keyword.
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