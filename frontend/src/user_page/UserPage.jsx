import CharacterCard from './CharacterCard';
import UserDataCard from './UserDataCard';
import ConventionSignUpCard from './ConventionSignUpCard';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 *
 * @return {JSX.Element}
 * @constructor
 * */
export default function UserPage({ username }) {
  return (
    <>
      <h1>
        Profil von <i>{username}</i>
      </h1>
      <Container>
        <div className="horizontal-line" />
        <Row>
          <Col md={6}>
            <UserDataCard />
          </Col>
        </Row>
        <div className="horizontal-line" />
        <Row>
          <Col md={8}>
            <CharacterCard />
          </Col>
        </Row>
        <div className="horizontal-line" />
        <Row>
          <Col md={4}>
            <ConventionSignUpCard />
          </Col>
        </Row>
      </Container>
    </>
  );
}
UserPage.propTypes = {
  username: PropTypes.string.isRequired
};
