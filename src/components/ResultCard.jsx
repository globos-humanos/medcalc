function ResultCard({ result }) {
  if (!result) {
    return null
  }

  if (result.error) {
    return (
      <div className="result-card error">
        {result.error}
      </div>
    )
  }

  const displayValue =
    result.displayValue ??
    result.value ??
    result.score ??
    ''

  const interpretation =
    result.interpretation ??
    result.category ??
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

      {interpretation && (
        <div className="result-category">
          {interpretation}
        </div>
      )}

      {result.note && (
        <div className="result-note">
          {result.note}
        </div>
      )}

    </div>
  )
}

export default ResultCard