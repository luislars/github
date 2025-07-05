import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard'; // Importar el componente ProductCard
import { Product, sampleProductsData } from '../types/product'; // Importar la interfaz y datos de ejemplo

/**
 * Componente ProductListPage
 * Muestra una lista de productos disponibles.
 * Simula la carga de datos y maneja estados de carga y error.
 */
const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simular la carga de datos de una API
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulación de llamada a API con un pequeño retraso
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(sampleProductsData); // Usar los datos de ejemplo importados
      } catch (err) {
        setError('Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Cargando productos...</span>
        </Spinner>
        <p className="mt-2">Cargando productos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info">No hay productos disponibles en este momento.</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Descubre Nuestros Productos</h1>
      <p className="lead text-center mb-5">
        Explora la última tecnología e innovación de Samsung, diseñada para inspirar al mundo y crear el futuro.
      </p>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4"> {/* Responsive grid layout */}
        {products.map(product => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductListPage;
