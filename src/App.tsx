import './App.css'
import { Link, Outlet } from 'react-router-dom'
import { useCart } from './pages/cart/CartContext';

function App() {
  const { total, clear } = useCart();
  
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
        </nav>
        <div>
          🛒 <span>{total}</span>
          <button onClick={clear}>Reset</button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
