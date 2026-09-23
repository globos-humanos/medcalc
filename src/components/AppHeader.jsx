import {
  Moon,
  Sun,
  Stethoscope
} from 'lucide-react'

import { useApp } from '../context/AppContext'

function AppHeader() {

  const {
    theme,
    toggleTheme
  } = useApp()

  return (
    <header className="app-header">

      <div className="brand">

        <div className="brand-icon">
          <Stethoscope size={19} strokeWidth={2.2} />
        </div>

        <div className="brand-copy">
          <div className="brand-name">
            MedCalc
          </div>

          <div className="brand-subtitle">
            Clinical tools, simplified.
          </div>
        </div>

      </div>

      <button
        className="icon-button"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {theme === 'light'
          ? <Moon size={18} strokeWidth={2} />
          : <Sun size={18} strokeWidth={2} />
        }
      </button>

    </header>
  )
}

export default AppHeader