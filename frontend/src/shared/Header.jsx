import { Link } from 'react-router-dom';
import logo from '../resources/pakyrion-logo.png';
import { Container } from 'react-bootstrap';

/**
 * a
 * @constructor
 */
export default function Header() {
  return (
    <>
      <div className="header">
        <Container className="header-container">
          <Link to={'/'}>
            <img src={logo} />
          </Link>
        </Container>
      </div>
    </>
  );
}
