import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * Componente HomePage
 * Muestra la página de inicio de la aplicación.
 * Puede incluir un banner principal, productos destacados, etc.
 */
const HomePage: React.FC = () => {
  return (
    <Container className="mt-5 text-center">
      <h1>Bienvenido a SamsungStyle</h1>
      <p className="lead">Descubre nuestros últimos productos y ofertas exclusivas.</p>
      <div className="mt-4">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/latin/home/2023/07/Home_BespokeAIWasherDryer_MainKV_PC_1440x640_without-text.jpg?$1440_640_JPG$"
          alt="Banner Principal Samsung"
          className="img-fluid rounded shadow-sm mb-4"
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      </div>
      <p>
        Explora nuestra amplia gama de productos innovadores diseñados para mejorar tu vida.
      </p>
      <Link to="/products">
        <Button variant="primary" size="lg">Ver Productos</Button>
      </Link>
    </Container>
  );
};

export default HomePage;
