import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

/**
 * Componente Footer
 * Muestra el pie de página de la aplicación.
 * Incluye información de copyright y enlaces útiles.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={6}>
            <p>&copy; {new Date().getFullYear()} SamsungStyle E-commerce. Todos los derechos reservados.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="/privacy-policy" className="text-decoration-none me-3">Política de Privacidad</a>
            <a href="/terms-of-service" className="text-decoration-none">Términos de Servicio</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
