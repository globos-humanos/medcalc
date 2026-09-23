import {
  Moon,
  Sun,
  Star,
  Clock3,
  Settings,
  Info,
  ChevronRight,
  Palette,
  Ruler
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

      <section className="more-intro">

        <p className="page-kicker">
          MEDCALC
        </p>

        <h1>
          More
        </h1>

        <p>
          Preferences and app information.
        </p>

      </section>


      <section className="more-stats">

        <div className="more-stat">

          <div className="more-stat-icon pink">
            <Star size={17} />
          </div>

          <div>
            <strong>
              {favorites.length}
            </strong>

            <span>
              Favorites
            </span>
          </div>

        </div>


        <div className="more-stat">

          <div className="more-stat-icon purple">
            <Clock3 size={17} />
          </div>

          <div>
            <strong>
              {recent.length}
            </strong>

            <span>
              Recent
            </span>
          </div>

        </div>

      </section>


      <section className="more-section">

        <p className="section-kicker">
          APPEARANCE
        </p>

        <div className="settings-group">

          <button
            type="button"
            className="settings-row"
            onClick={toggleTheme}
          >

            <div className="settings-row-icon blue">

              {theme === 'light'
                ? <Moon size={18} />
                : <Sun size={18} />
              }

            </div>

            <div className="settings-row-copy">

              <strong>
                Appearance
              </strong>

              <span>
                {theme === 'light'
                  ? 'Light'
                  : 'Dark'
                }
              </span>

            </div>

            <ChevronRight
              size={17}
              className="settings-chevron"
            />

          </button>


          <div className="settings-row">

            <div className="settings-row-icon purple">
              <Palette size={18} />
            </div>

            <div className="settings-row-copy">

              <strong>
                Theme
              </strong>

              <span>
                Soft clinical interface
              </span>

            </div>

            <ChevronRight
              size={17}
              className="settings-chevron"
            />

          </div>

        </div>

      </section>


      <section className="more-section">

        <p className="section-kicker">
          PREFERENCES
        </p>

        <div className="settings-group">

          <div className="settings-row">

            <div className="settings-row-icon green">
              <Ruler size={18} />
            </div>

            <div className="settings-row-copy">

              <strong>
                Units
              </strong>

              <span>
                Metric
              </span>

            </div>

            <ChevronRight
              size={17}
              className="settings-chevron"
            />

          </div>


          <div className="settings-row">

            <div className="settings-row-icon orange">
              <Settings size={18} />
            </div>

            <div className="settings-row-copy">

              <strong>
                Calculator Settings
              </strong>

              <span>
                Preferences and defaults
              </span>

            </div>

            <ChevronRight
              size={17}
              className="settings-chevron"
            />

          </div>

        </div>

      </section>


      <section className="more-section">

        <p className="section-kicker">
          ABOUT
        </p>

        <div className="settings-group">

          <div className="settings-row">

            <div className="settings-row-icon cyan">
              <Info size={18} />
            </div>

            <div className="settings-row-copy">

              <strong>
                About MedCalc
              </strong>

              <span>
                Clinical calculator toolkit
              </span>

            </div>

            <ChevronRight
              size={17}
              className="settings-chevron"
            />

          </div>

        </div>

      </section>


      <p className="more-version">
        MedCalc · Clinical tools, simplified.
      </p>

    </main>

  )
}

export default More