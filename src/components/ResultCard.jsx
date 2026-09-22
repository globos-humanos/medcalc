function ResultCard({ result }) {
  if (!result) {
    return null
  }

  if (result.error) {
    return (
      <div className="result-card error">
        <div className="result-label">
          Unable to calculate
        </div>

        <div className="result-error-message">
          {result.error}
        </div>
      </div>
    )
  }

  const displayValue =
    result.displayValue ??
    result.value ??
    result.score ??
    ''

  const meaning =
    result.category ??
    result.interpretation ??
    null

  return (
    <div className="result-card">

      <div className="result-label">
        Result
      </div>

      <div className="result-value">
        {displayValue}
      </div>

      {result.unit && (
        <div className="result-unit">
          {result.unit}
        </div>
      )}

      {meaning && (
        <div className="result-meaning">
          <span className="result-section-label">
            Meaning
          </span>

          <div className="result-category">
            {meaning}
          </div>
        </div>
      )}

      {result.interpretation &&
        result.interpretation !== meaning && (
          <div className="result-interpretation">
            {result.interpretation}
          </div>
        )}

      {result.note && (
        <div className="result-note">
          <span className="result-section-label">
            Clinical note
          </span>

          <p>
            {result.note}
          </p>
        </div>
      )}

    </div>
  )
}

export default ResultCard
