import { Link } from 'react-router-dom';
import logo from '../resources/pakyrion-logo.png';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import userIcon from '../resources/user_icon.png';

/**
 * a
 * @constructor
 */
export default function Header({ username, isAdmin }) {
  return (
    <>
      <div className="header">
        <Container className="header-container">
          <Row>
            <Col>
              <Link to={'/'}>
                <img src={logo} />
              </Link>
            </Col>
            <Col>
              <Container>
                <Row className="justify-content-end">
                  <Col className="col-3">
                    {isAdmin ? (
                      <Link to={'/admin/'}>
                        <div className="header-menu-item">Organisation</div>
                      </Link>
                    ) : null}
                  </Col>
                  <Col className="col-3">
                    <Link to={'/user/'}>
                      <div className="header-menu-item">
                        <img src={userIcon} width="32" height="32" />{' '}
                        {username === 'AnonymousUser' ? '-' : username}
                      </div>
                    </Link>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
Header.propTypes = {
  username: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired
};
