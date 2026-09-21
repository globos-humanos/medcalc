import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import AppHeader from './components/AppHeader'
import BottomNav from './components/BottomNav'

import Home from './pages/Home'
import Search from './pages/Search'
import Favorites from './pages/Favorites'
import More from './pages/More'

import CategoryPage from './pages/CategoryPage'
import CalculatorPage from './pages/CalculatorPage'

function App() {

  return (
    <BrowserRouter>

      <div className="app">

        <AppHeader />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/search"
            element={<Search />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/more"
            element={<More />}
          />

          <Route
            path="/category/:categoryId"
            element={<CategoryPage />}
          />

          <Route
            path="/calculator/:calculatorId"
            element={<CalculatorPage />}
          />

        </Routes>

        <BottomNav />

      </div>

    </BrowserRouter>
  )
}

export default App