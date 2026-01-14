import { Link, Outlet } from 'react-router-dom'
import { useCart } from './pages/cart/CartContext';

function App() {
  const { total, clear } = useCart();
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-sky-50 px-4 py-3 shadow-sm">
        <nav className="flex items-center gap-4">
          <Link className="text-sm font-medium text-slate-700 hover:text-slate-900" to="/">Home</Link>
          <Link className="text-sm font-medium text-slate-700 hover:text-slate-900" to="/products">Products</Link>
        </nav>
        <div className="flex items-center gap-3">
          🛒 <span className="relative inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-800">{total}</span>
          <button className="text-sm text-rose-600 hover:text-rose-700" onClick={clear}>Reset</button>
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App
