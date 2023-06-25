import ConventionCard from './ConventionCard';
import { Col, Container, Row } from 'react-bootstrap';

/**
 * a
 * @return {JSX.Element}
 * @constructor
 */
export default function AdminPage() {
  return (
    <>
      <h1>Organisatorisches</h1>
      <Container>
        <Row>
          <Col md={10}>
            <ConventionCard />
          </Col>
        </Row>
      </Container>
    </>
  );
}
