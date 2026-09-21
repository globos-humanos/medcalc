import {
  ArrowRight
} from 'lucide-react'

import {
  Link
} from 'react-router-dom'

function CategoryCard({
  category,
  calculatorCount
}) {

  return (
    <Link
      to={`/category/${category.id}`}
      className="category-link"
    >

      <article
        className={`category-card ${category.color}`}
      >

        <div className="category-icon">
          {category.icon}
        </div>

        <div className="category-content">

          <h3>
            {category.name}
          </h3>

          <p>
            {category.description}
          </p>

          <span className="category-count">
            {calculatorCount} calculators
          </span>

        </div>

        <ArrowRight
          className="category-arrow"
          size={18}
        />

      </article>

    </Link>
  )
}

export default CategoryCard