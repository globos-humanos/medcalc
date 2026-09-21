import {
  Search,
  X
} from 'lucide-react'

function CalculatorSearch({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search calculators...'
}) {

  function handleSubmit(event) {
    event.preventDefault()

    if (onSubmit) {
      onSubmit(value)
    }
  }

  return (
    <form
      className="search-box"
      onSubmit={handleSubmit}
    >

      <Search size={19} />

      <input
        type="text"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        aria-label="Search calculators"
      />

      {value && (

        <button
          type="button"
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <X size={17} />
        </button>

      )}

    </form>
  )
}

export default CalculatorSearch