import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importar el hook useCart

/**
 * Componente Header
 * Muestra la barra de navegación principal de la aplicación.
 * Incluye enlaces de navegación, un campo de búsqueda y un enlace al carrito con contador de ítems.
 */
const Header: React.FC = () => {
  const { getItemCount } = useCart(); // Obtener la función para contar ítems del carrito
  const itemCount = getItemCount();

  return (
    <Navbar bg="light" expand="lg" className="mb-3 shadow-sm sticky-top">
      <Container fluid> {/* Usar fluid para un layout más ancho tipo Samsung */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          SamsungStyle
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="fw-medium">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/products" className="fw-medium">Productos</Nav.Link>
            {/* Se podrían añadir más Nav.Link aquí, por ejemplo:
            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/category/smartphones">Smartphones</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/tablets">Tablets</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/wearables">Wearables</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/promotions">Promociones</NavDropdown.Item>
            </NavDropdown>
            */}
          </Nav>
          <Form className="d-flex mx-auto my-2 my-lg-0" style={{ maxWidth: '500px' }}>
            <FormControl
              type="search"
              placeholder="Buscar en SamsungStyle..."
              className="me-2"
              aria-label="Buscar"
            />
            <Button variant="outline-primary">
              <i className="bi bi-search"></i>
            </Button>
          </Form>
          <Nav className="ms-auto">
            {/* Otros enlaces como "Mi Cuenta", "Ayuda" podrían ir aquí */}
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <i className="bi bi-cart-fill" style={{ fontSize: '1.5rem' }}></i>
              {itemCount > 0 && (
                <Badge
                  pill
                  bg="primary"
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem', padding: '0.3em 0.5em' }}
                >
                  {itemCount}
                  <span className="visually-hidden">ítems en el carrito</span>
                </Badge>
              )}
              <span className="ms-1 d-lg-none">Carrito</span> {/* Texto para móviles */}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
