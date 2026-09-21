function normalizeText(value = '') {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
}

function getSearchableText(calculator) {
  return normalizeText([
    calculator.name,
    calculator.shortName,
    calculator.category,
    calculator.categoryId,
    calculator.description,
    calculator.type,
    ...(calculator.keywords || []),
    ...(calculator.aliases || [])
  ].filter(Boolean).join(' '))
}

function scoreCalculator(calculator, query) {
  const normalizedQuery = normalizeText(query)

  if (!normalizedQuery) return 0

  const words = normalizedQuery
    .split(/\s+/)
    .filter(Boolean)

  const name = normalizeText(calculator.name)
  const shortName = normalizeText(calculator.shortName)
  const category = normalizeText(calculator.category)
  const categoryId = normalizeText(calculator.categoryId)
  const description = normalizeText(calculator.description)
  const keywords = (calculator.keywords || []).map(normalizeText)
  const aliases = (calculator.aliases || []).map(normalizeText)

  let score = 0

  // Exact full-name match
  if (name === normalizedQuery) {
    score += 100
  }

  // Exact short-name match
  if (shortName === normalizedQuery) {
    score += 90
  }

  // Exact alias match
  if (aliases.includes(normalizedQuery)) {
    score += 85
  }

  // Exact keyword match
  if (keywords.includes(normalizedQuery)) {
    score += 75
  }

  // Name contains entire query
  if (name.includes(normalizedQuery)) {
    score += 60
  }

  // Short name contains entire query
  if (shortName.includes(normalizedQuery)) {
    score += 55
  }

  // Category match
  if (
    category.includes(normalizedQuery) ||
    categoryId.includes(normalizedQuery)
  ) {
    score += 30
  }

  // Description match
  if (description.includes(normalizedQuery)) {
    score += 20
  }

  // Individual word matching
  for (const word of words) {
    if (name.includes(word)) {
      score += 20
    }

    if (shortName.includes(word)) {
      score += 18
    }

    if (aliases.some(alias => alias.includes(word))) {
      score += 12
    }

    if (keywords.some(keyword => keyword.includes(word))) {
      score += 10
    }

    if (category.includes(word) || categoryId.includes(word)) {
      score += 6
    }

    if (description.includes(word)) {
      score += 4
    }
  }

  return score
}

export function searchCalculators(calculators, query) {
  const normalizedQuery = normalizeText(query)

  if (!normalizedQuery) {
    return calculators
  }

  return calculators
    .map(calculator => ({
      calculator,
      score: scoreCalculator(calculator, normalizedQuery)
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }

      return a.calculator.name.localeCompare(b.calculator.name)
    })
    .map(result => result.calculator)
}

export function getSearchScore(calculator, query) {
  return scoreCalculator(calculator, query)
}

export function getSearchSuggestions(calculators, query, limit = 5) {
  return searchCalculators(calculators, query).slice(0, limit)
}

export function filterByType(calculators, type) {
  if (!type || type === 'all') {
    return calculators
  }

  return calculators.filter(calculator => calculator.type === type)
}

export function filterByCategory(calculators, categoryId) {
  if (!categoryId || categoryId === 'all') {
    return calculators
  }

  return calculators.filter(
    calculator => calculator.categoryId === categoryId
  )
}

export function getCalculatorTypes(calculators) {
  return [...new Set(
    calculators
      .map(calculator => calculator.type)
      .filter(Boolean)
  )]
}