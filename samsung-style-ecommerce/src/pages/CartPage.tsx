import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Image, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart, CartItem } from '../context/CartContext'; // Importar useCart y CartItem

/**
 * Componente CartPage
 * Muestra el contenido del carrito de compras.
 * Permite al usuario ver los productos añadidos, modificar cantidades, eliminarlos y proceder al pago.
 */
const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart, getItemCount } = useCart();
  const isEmpty = items.length === 0;

  const subtotal = getCartTotal();
  // Lógica de envío (ejemplo simple, podría ser más complejo)
  const shippingFee = subtotal > 0 && subtotal < 500 ? 25 : 0; // Envío gratis sobre $500
  const total = subtotal + shippingFee;

  /**
   * Maneja el cambio de cantidad de un ítem en el carrito.
   * @param {string | number} id - El ID del ítem.
   * @param {number} quantity - La nueva cantidad.
   */
  const handleQuantityChange = (id: string | number, quantity: number) => {
    if (quantity >= 1) {
      updateQuantity(id, quantity);
    } else if (quantity === 0) {
      // Opcional: confirmar antes de eliminar si la cantidad es 0, o simplemente eliminar.
      removeItem(id);
    }
  };

  if (isEmpty) {
    return (
      <Container className="mt-5 text-center py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
                <h2 className="mt-3">Tu Carrito está Vacío</h2>
                <p className="lead text-muted">
                  Parece que no has añadido ningún producto a tu carrito todavía.
                  ¡Explora nuestros productos y encuentra algo que te encante!
                </p>
                <Link to="/products">
                  <Button variant="primary" size="lg" className="mt-3">
                    <i className="bi bi-shop me-2"></i>Explorar Productos
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Tu Carrito de Compras ({getItemCount()} {getItemCount() > 1 ? 'ítems' : 'ítem'})</h1>
      <Row>
        {/* Columna de Ítems del Carrito */}
        <Col lg={8} className="mb-4 mb-lg-0">
          {items.map((item: CartItem) => (
            <Card key={item.id} className="mb-3 shadow-sm">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2} xs={3} className="text-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                      style={{ maxHeight: '80px', objectFit: 'contain' }}
                    />
                  </Col>
                  <Col md={4} xs={9}>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted small mb-0">
                      Precio unitario: ${item.price.toFixed(2)}
                    </p>
                    {item.category && <p className="text-muted small mb-0">Categoría: {item.category}</p>}
                  </Col>
                  <Col md={3} xs={7} className="d-flex align-items-center mt-2 mt-md-0">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      aria-label={`Disminuir cantidad de ${item.name}`}
                      disabled={item.quantity <= 1}
                    >
                      <i className="bi bi-dash-lg"></i>
                    </Button>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="mx-2 text-center"
                      style={{ width: '60px' }}
                      min={1} // No permitir 0 directamente aquí, se maneja en handleQuantityChange
                      aria-label={`Cantidad de ${item.name}`}
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      aria-label={`Aumentar cantidad de ${item.name}`}
                      // Podrías añadir una comprobación de stock aquí si `item.stock` está disponible
                      // disabled={item.quantity >= (item.stock || Infinity)}
                    >
                      <i className="bi bi-plus-lg"></i>
                    </Button>
                  </Col>
                  <Col md={2} xs={3} className="text-md-end mt-2 mt-md-0">
                    <p className="fw-bold mb-0">${(item.price * item.quantity).toFixed(2)}</p>
                  </Col>
                  <Col md={1} xs={2} className="text-end mt-2 mt-md-0">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Eliminar ${item.name} del carrito`}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          <Button variant="outline-danger" onClick={clearCart} className="mt-3">
            <i className="bi bi-cart-x-fill me-2"></i>Vaciar Carrito
          </Button>
        </Col>

        {/* Columna de Resumen del Pedido */}
        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '80px' }}> {/* Sticky top para que siga al hacer scroll */}
            <Card.Body>
              <Card.Title as="h3" className="mb-3">Resumen del Pedido</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Subtotal ({getItemCount()} ítems):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Envío:</span>
                  <span>{shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : 'Gratis'}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between fw-bold fs-5 mt-2 pt-2 border-top">
                  <span>Total Estimado:</span>
                  <span>${total.toFixed(2)}</span>
                </ListGroup.Item>
              </ListGroup>
              <div className="d-grid mt-4">
                <Button variant="primary" size="lg" disabled={isEmpty}>
                  <i className="bi bi-credit-card-fill me-2"></i>Proceder al Pago
                </Button>
              </div>
              <Alert variant="info" className="mt-3 small">
                <i className="bi bi-info-circle-fill me-2"></i>
                Los costos de envío y los impuestos se calcularán durante el proceso de pago.
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
