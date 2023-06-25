import { Col, Container, Row } from 'react-bootstrap';
import ConventionDetailsCard from './ConventionDetailsCard';
import ConventionSignUpApprovalCard from './ConventionSignUpApprovalCard';

/**
 * y
 * @return {JSX.Element}
 * @constructor
 */
export default function ConventionPage() {
  return (
    <>
      <h1>Veranstaltungsdetails</h1>
      <Container>
        <Row>
          <Col md={6}>
            <ConventionDetailsCard />
          </Col>
        </Row>
        <div className="horizontal-line" />
        <Row>
          <Col md={6}>
            <ConventionSignUpApprovalCard />
          </Col>
        </Row>
      </Container>
    </>
  );
}
