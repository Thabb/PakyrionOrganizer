import { Link } from 'react-router-dom';
import logo from '../resources/pakyrion-logo.png';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

/**
 * a
 * @constructor
 */
export default function Header({ username, isAdmin }) {
  return (
    <>
      <div className="header">
        <Container className="header-container">
          <Link to={'/'}>
            <img src={logo} />
          </Link>
          <span>
            Eingeloggt als: {username === 'AnonymousUser' ? '-' : username}
            <div>
              <Link to={'/user/'}>User Profil</Link>
            </div>
            <div>{isAdmin ? <Link to={'/admin/'}>Admin Seite</Link> : null}</div>
          </span>
        </Container>
      </div>
    </>
  );
}
Header.propTypes = {
  username: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired
};
