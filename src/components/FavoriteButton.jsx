import {
  Star
} from 'lucide-react'

import { useApp } from '../context/AppContext'

function FavoriteButton({
  calculatorId
}) {

  const {
    isFavorite,
    toggleFavorite
  } = useApp()

  const favorite =
    isFavorite(calculatorId)

  return (
    <button
      className={`favorite-button ${
        favorite
          ? 'is-favorite'
          : ''
      }`}
      onClick={(event) => {

        event.preventDefault()
        event.stopPropagation()

        toggleFavorite(
          calculatorId
        )
      }}
      aria-label={
        favorite
          ? 'Remove from favorites'
          : 'Add to favorites'
      }
    >

      <Star
        size={18}
        fill={
          favorite
            ? 'currentColor'
            : 'none'
        }
      />

    </button>
  )
}

export default FavoriteButton