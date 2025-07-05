import React from 'react';
import { Card, Button, Toast, ToastContainer } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Product } from '../types/product'; // Importar la interfaz Product
import { useCart } from '../context/CartContext'; // Importar el hook useCart

/**
 * Interfaz para las props del componente ProductCard.
 */
interface ProductCardProps {
  product: Product;
}

/**
 * Componente ProductCard
 * Muestra la información resumida de un producto en una tarjeta.
 * Permite añadir el producto al carrito.
 *
 * @param {ProductCardProps} props - Las propiedades del componente.
 * @returns {JSX.Element} El componente de tarjeta de producto renderizado.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart(); // Obtener la función addItem del contexto del carrito
  const [showToast, setShowToast] = React.useState(false);

  /**
   * Manejador para el evento de clic en "Añadir al Carrito".
   * Llama a la función addItem del contexto y muestra una notificación.
   */
  const handleAddToCart = () => {
    addItem(product);
    setShowToast(true);
  };

  return (
    <>
      <Card className="h-100 shadow-sm product-card">
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            className="product-card-image"
          />
        </Link>
        <Card.Body className="d-flex flex-column p-3">
          <Card.Title className="mb-2 product-card-title">
            <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }} title={product.name}>
              {product.name}
            </Link>
          </Card.Title>
          <Card.Text className="text-muted small flex-grow-1 product-card-description">
            {product.description}
          </Card.Text>
          <Card.Text className="fs-5 fw-bold mb-3 product-card-price">
            ${product.price.toFixed(2)}
          </Card.Text>
          <div className="mt-auto d-grid gap-2">
            <Button
              variant="primary"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              aria-label={`Añadir ${product.name} al carrito`}
            >
              <i className="bi bi-cart-plus-fill me-2"></i>Añadir al Carrito
            </Button>
            <Button variant="outline-secondary" as={Link} to={`/products/${product.id}`}>
              Ver Detalles
            </Button>
          </div>
        </Card.Body>
        {product.rating && product.numReviews !== undefined && (
          <Card.Footer className="text-muted small d-flex justify-content-between align-items-center p-3">
            <div>
              {Array(Math.floor(product.rating))
                .fill(null)
                .map((_, i) => <i key={`star-full-${i}`} className="bi bi-star-fill text-warning"></i>)}
              {product.rating % 1 >= 0.5 && <i className="bi bi-star-half text-warning"></i>}
              {Array(5 - Math.ceil(product.rating))
                .fill(null)
                .map((_, i) => <i key={`star-empty-${i}`} className="bi bi-star text-warning"></i>)}
              <span className="ms-1">({product.numReviews} reseñas)</span>
            </div>
            {product.stock !== undefined ? (
              <span className={`badge ${product.stock > 0 ? 'bg-success-subtle text-success-emphasis' : 'bg-danger-subtle text-danger-emphasis'}`}>
                {product.stock > 0 ? 'En Stock' : 'Agotado'}
              </span>
            ) : null}
          </Card.Footer>
        )}
      </Card>

      {/* Toast para notificar que el producto se añadió al carrito */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success" text="white">
          <Toast.Header closeButton={false}>
            <strong className="me-auto">¡Éxito!</strong>
          </Toast.Header>
          <Toast.Body>{product.name} añadido al carrito.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

// Estilos básicos para ProductCard (se podrían mover a un archivo CSS)
const styles = `
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.15) !important;
  }
  .product-card-image {
    max-height: 200px;
    object-fit: contain;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  .product-card-title {
    font-size: 1.1rem;
    font-weight: 600;
  }
  .product-card-description {
    font-size: 0.85rem;
    min-height: 3.2em; /* Aproximadamente 2 líneas de texto */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Número de líneas a mostrar */
    -webkit-box-orient: vertical;
  }
  .product-card-price {
    color: #007bff; /* Azul Samsung */
  }
`;

// Inyectar estilos en el head (forma simple para este ejemplo)
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


export default ProductCard;
