import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </nav>
        <div>
          Cart
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
