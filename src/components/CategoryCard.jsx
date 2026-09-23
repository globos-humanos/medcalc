import {
  Activity,
  Baby,
  Brain,
  Droplets,
  FlaskConical,
  HeartPulse,
  Hospital,
  Microscope,
  Pill,
  Scissors,
  ShieldAlert,
  Stethoscope,
  Wind,
  ArrowRight
} from 'lucide-react'

import { Link } from 'react-router-dom'
function PregnantAbdomenIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9 3.5C9.8 5.1 9.5 7 8.2 8.5C7 10 6.2 11.7 6.2 14.2C6.2 17.9 8.8 20.5 12 20.5C15.8 20.5 18.7 18.1 18.7 14.4C18.7 11.6 17.4 9.7 15.8 8.3C14.3 7 14 5.2 15 3.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M8 9.2C9.1 10.1 10.5 10.6 12 10.6C13.5 10.6 14.9 10.1 16 9.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M9.1 14.3C10.1 13.5 11 13.2 12 13.2C13.1 13.2 14 13.5 14.9 14.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle
        cx="12"
        cy="15.8"
        r="1.15"
        fill="currentColor"
      />
    </svg>
  )
}

function CategoryIcon({ id }) {

  const icons = {
    'general-medicine': Stethoscope,
    'icu': Hospital,
    'cardiology': HeartPulse,
    'gastro': Activity,
    'nephrology': Droplets,
    'respiratory': Wind,
    'neurology': Brain,
    'infectious': Microscope,
    'hematology': Droplets,
    'emergency': ShieldAlert,
    'obgyn': PregnantAbdomenIcon,
    'pediatrics': Baby,
    'endocrinology': FlaskConical,
    'surgery': Scissors
  }

  const Icon = icons[id] || Pill

  if (id === 'obgyn') {
    return <PregnantAbdomenIcon />
  }

  return (
    <Icon
      size={20}
      strokeWidth={2.1}
    />
  )
}

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
          <CategoryIcon id={category.id} />
        </div>

        <div className="category-content">

          <h3>
            {category.name}
          </h3>

          <p>
            {calculatorCount} calculators
          </p>

        </div>

        <ArrowRight
          className="category-arrow"
          size={17}
          strokeWidth={2}
        />

      </article>

    </Link>
  )
}

export default CategoryCard