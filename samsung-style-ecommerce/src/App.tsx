import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage'; // Asegúrate de que la importación sea correcta
import CartPage from './pages/CartPage';
import './App.css'; // Puedes mantener tus estilos globales o específicos de App aquí

/**
 * Componente principal de la aplicación App.
 * Configura el enrutamiento y la estructura general de la página.
 * Incluye Header, Footer y las rutas a las diferentes páginas.
 */
function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100"> {/* Flex container para mantener el footer abajo */}
        <Header />
        <main className="flex-grow-1"> {/* Contenido principal que crece para empujar el footer */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductListPage />} />
            {/* Ruta para detalles de producto - productId será un parámetro */}
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Aquí puedes añadir más rutas según sea necesario, ej: /checkout, /profile, etc. */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
