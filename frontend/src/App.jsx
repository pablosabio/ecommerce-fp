import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'

// import pages
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import ProductDetails from './pages/ProductDetails'

// import components
import Footer from './components/Footer'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <CartProvider>
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      <Footer />
    </Router>
    </CartProvider>
    </>
  )
}

export default App
