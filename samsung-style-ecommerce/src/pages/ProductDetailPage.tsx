import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Spinner, Alert, Carousel, ListGroup, Badge, Card, Form, Toast, ToastContainer } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { Product, sampleProductsData } from '../types/product'; // Importar la interfaz y datos de ejemplo
import { useCart } from '../context/CartContext'; // Importar el hook useCart

/**
 * Componente ProductDetailPage
 * Muestra los detalles completos de un producto específico.
 * Recupera el ID del producto de los parámetros de la URL y muestra su información.
 */
const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { addItem } = useCart(); // Hook del carrito
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Estado para la cantidad
  const [showToast, setShowToast] = useState(false); // Estado para el toast de confirmación

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulación de llamada a API
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundProduct = sampleProductsData.find(p => p.id.toString() === productId);
        setProduct(foundProduct || null); // Establece null si no se encuentra
      } catch (err) {
        setError('Error al cargar los detalles del producto.');
        console.error(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails();
    } else {
      setError('ID de producto no proporcionado.');
      setLoading(false);
      setProduct(null);
    }
  }, [productId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Cargando detalles del producto...</span>
        </Spinner>
        <p>Cargando detalles del producto...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/products">
          <Button variant="secondary">Volver al Catálogo</Button>
        </Link>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="warning">
          <h2>Producto no Encontrado</h2>
          <p>El producto que estás buscando no existe o no está disponible.</p>
        </Alert>
        <Link to="/products">
          <Button variant="primary">Explorar otros productos</Button>
        </Link>
      </Container>
    );
  }

  // Helper para renderizar estrellas de calificación
  const renderRatingStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<i key={`star-full-${i}`} className="bi bi-star-fill text-warning"></i>);
      } else if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
        stars.push(<i key={`star-half-${i}`} className="bi bi-star-half text-warning"></i>);
      } else {
        stars.push(<i key={`star-empty-${i}`} className="bi bi-star text-warning"></i>);
      }
    }
    return stars;
  };

  /**
   * Manejador para añadir el producto al carrito.
   * Considera la cantidad seleccionada.
   */
  const handleAddToCart = () => {
    if (product && quantity > 0) {
      // La lógica de `addItem` en el contexto ya maneja si el item existe y suma cantidades,
      // o podemos pasar la cantidad directamente si el reducer la acepta.
      // Por simplicidad, llamaremos addItem N veces o modificaremos el reducer para que acepte cantidad.
      // Asumamos que addItem añade una unidad, y para múltiples, llamamos varias veces o ajustamos el context.
      // Para este ejemplo, el `addItem` actual añade 1. Si queremos `quantity` > 1,
      // el `CartContext` necesitaría una acción `ADD_ITEM_WITH_QUANTITY`.
      // Por ahora, simplificaremos y el botón "Añadir al Carrito" añadirá `quantity` items.
      // Esto requiere una modificación en CartContext o llamar addItem N veces.
      // Vamos a modificar `addItem` en el contexto para que acepte una cantidad opcional.
      // (Esta modificación se haría en CartContext.tsx, aquí asumimos que ya existe)
      addItem(product, quantity); // Ahora addItem acepta una cantidad
      setShowToast(true);
      setQuantity(1); // Resetear cantidad a 1 después de añadir
    }
  };


  return (
    <>
      <Container className="my-5">
        <Row className="mb-3">
            <Col>
              <Link to="/products" className="text-decoration-none text-muted">
                  <i className="bi bi-arrow-left me-2"></i>Volver al catálogo
              </Link>
            </Col>
        </Row>
        <Row>
          {/* Columna de Imágenes */}
          <Col md={6} className="mb-4 mb-md-0">
            {product.images && product.images.length > 1 ? (
              <Carousel fade>
                {product.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <Image src={img} alt={`${product.name} - Imagen ${index + 1}`} fluid rounded className="product-detail-image shadow-sm" />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <Image src={product.image} alt={product.name} fluid rounded className="product-detail-image shadow-sm" />
            )}
          </Col>

          {/* Columna de Detalles del Producto */}
          <Col md={6}>
            <h1 className="mb-3">{product.name}</h1>

            {product.rating && product.numReviews && (
              <div className="mb-3">
                {renderRatingStars(product.rating)}
                <span className="ms-2 text-muted">({product.numReviews} reseñas)</span>
              </div>
            )}

            <p className="lead text-muted mb-3">{product.longDescription || product.description}</p>

            <Card bg="light" className="p-3 mb-4 shadow-sm">
              <h2 className="mb-3 display-6 text-primary">${product.price.toFixed(2)}</h2>
              {product.stock !== undefined && (
                <Badge pill bg={product.stock > 0 ? 'success' : 'danger'} className="mb-2 fs-6">
                  {product.stock > 0 ? `${product.stock} en Stock` : 'Agotado'}
                </Badge>
              )}

              {/* Selector de Cantidad */}
              {product.stock !== undefined && product.stock > 0 && (
                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Form.Label column sm="3" md="4" lg="3" className="fw-medium">Cantidad:</Form.Label>
                  <Col sm="9" md="8" lg="9">
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        <i className="bi bi-dash-lg"></i>
                      </Button>
                      <Form.Control
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (val >= 1 && val <= (product.stock || 1)) {
                                setQuantity(val);
                            } else if (val < 1) {
                                setQuantity(1);
                            } else if (product.stock && val > product.stock) {
                                setQuantity(product.stock);
                            }
                        }}
                        className="mx-2 text-center"
                        style={{ width: '60px' }}
                        min={1}
                        max={product.stock}
                        aria-label="Cantidad de producto"
                      />
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setQuantity(Math.min(product.stock || Infinity, quantity + 1))}
                        disabled={quantity >= (product.stock || Infinity)}
                        aria-label="Aumentar cantidad"
                      >
                        <i className="bi bi-plus-lg"></i>
                      </Button>
                    </div>
                  </Col>
                </Form.Group>
              )}

               <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || quantity === 0}
                  aria-label={`Añadir ${quantity} ${product.name} al carrito`}
                >
                  <i className="bi bi-cart-plus-fill me-2"></i>Añadir al Carrito ({quantity})
                </Button>
                {/* <Button variant="outline-secondary" size="lg" disabled={product.stock === 0}>
                  Comprar Ahora
                </Button> */}
              </div>
            </Card>

            {product.category && <p className="mb-1"><small className="text-muted">Categoría: {product.category}</small></p>}
            {product.brand && <p><small className="text-muted">Marca: {product.brand}</small></p>}
          </Col>
        </Row>

        {/* Sección de Características y Especificaciones */}
        {(product.features || product.specs) && (
        <Row className="mt-5">
          <Col>
            <Card>
              <Card.Header as="h4">Detalles Adicionales</Card.Header>
              <Card.Body>
                {product.features && product.features.length > 0 && (
                  <div className="mb-4">
                    <h5>Características Destacadas:</h5>
                    <ListGroup variant="flush">
                      {product.features.map((feature, index) => (
                        <ListGroup.Item key={`feature-${index}`}><i className="bi bi-check-circle-fill text-success me-2"></i>{feature}</ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                )}

                {product.specs && product.specs.length > 0 && (
                  <div>
                    <h5>Especificaciones Técnicas:</h5>
                    <ListGroup variant="flush">
                      {product.specs.map((spec, index) => (
                        <ListGroup.Item key={`spec-${index}`}>
                          <strong>{spec.name}:</strong> {spec.value}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* TODO: Secciones como "Productos relacionados", "Reseñas de clientes", etc. */}
    </Container>

      {/* Toast para notificar que el producto se añadió al carrito */}
      <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1050 }}>
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg="success" text="white">
          <Toast.Header closeButton={false}>
            <strong className="me-auto">¡Éxito!</strong>
          </Toast.Header>
          <Toast.Body>
            {quantity} x {product?.name} añadido(s) al carrito.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default ProductDetailPage;
