import {
  Moon,
  Sun,
  Star,
  Clock,
  Settings,
  Info
} from 'lucide-react'

import {
  useApp
} from '../context/AppContext'

function More() {

  const {
    theme,
    toggleTheme,
    favorites,
    recent
  } = useApp()

  return (
    <main className="page more-page">

      <section className="profile-card">

        <div className="profile-avatar">
          A
        </div>

        <div>

          <p className="eyebrow">
            MEDCALC
          </p>

          <h1>
            Your Clinical Toolkit
          </h1>

          <p>
            Keep your frequently used
            tools close at hand.
          </p>

        </div>

      </section>

      <section className="stats-grid">

        <div className="stat-card">

          <Star size={19} />

          <strong>
            {favorites.length}
          </strong>

          <span>
            Favorites
          </span>

        </div>

        <div className="stat-card">

          <Clock size={19} />

          <strong>
            {recent.length}
          </strong>

          <span>
            Recently used
          </span>

        </div>

      </section>

      <section className="settings-list">

        <button
          className="settings-item"
          onClick={toggleTheme}
        >

          <div className="settings-icon">

            {theme === 'light'
              ? <Moon size={19} />
              : <Sun size={19} />
            }

          </div>

          <div>

            <strong>
              Appearance
            </strong>

            <span>
              {theme === 'light'
                ? 'Light mode'
                : 'Dark mode'
              }
            </span>

          </div>

        </button>

        <div className="settings-item">

          <div className="settings-icon">
            <Settings size={19} />
          </div>

          <div>

            <strong>
              App Settings
            </strong>

            <span>
              Units, preferences and
              calculator options
            </span>

          </div>

        </div>

        <div className="settings-item">

          <div className="settings-icon">
            <Info size={19} />
          </div>

          <div>

            <strong>
              About MedCalc
            </strong>

            <span>
              Clinical calculator toolkit
            </span>

          </div>

        </div>

      </section>

      <div className="quote-card">

        <p>
          "A good clinician is a lifelong
          student."
        </p>

      </div>

    </main>
  )
}

export default More