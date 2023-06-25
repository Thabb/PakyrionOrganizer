import { useState } from 'react';
import API from '../shared/api';
import PropTypes from 'prop-types';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function FrontPage({ username, setReloadCurrentUser, setReloadIsAdmin }) {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const registerNewUser = () => {
    const payload = {
      username: registerUsername,
      email: registerEmail,
      password: registerPassword
    };
    API.post('/api/register/', payload).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setReloadCurrentUser(true);
        setReloadIsAdmin(true);
      }
    });
  };

  const loginUser = () => {
    const payload = {
      username: loginUsername,
      password: loginPassword
    };
    API.post('/api/login/', payload).then((response) => {
      console.log(response);
      if (response.status === 200) {
        setReloadCurrentUser(true);
        setReloadIsAdmin(true);
      }
    });
  };

  const logoutUser = () => {
    API.post('/api/logout/').then((response) => {
      console.log(response);
      if (response.status === 200) {
        setReloadCurrentUser(true);
        setReloadIsAdmin(true);
      }
    });
  };

  return (
    <>
      {username === 'AnonymousUser' ? (
        <Container>
          <Row>
            <Col md={4}>
              <h2>Einloggen</h2>
              <Table className="table-borderless">
                <tbody>
                  <tr>
                    <th>Benutzername:</th>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Passwort:</th>
                    <td>
                      <input
                        className="form-control"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Button className="form-button form-button-width-100" onClick={loginUser}>
                        Einloggen
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>

            <Col md={{ span: 4, offset: 2 }}>
              <h2>Registrierung</h2>
              <Table className="table-borderless">
                <tbody>
                  <tr>
                    <th>Benutzername:</th>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>E-Mail:</th>
                    <td>
                      <input
                        className="form-control"
                        type="email"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Passwort:</th>
                    <td>
                      <input
                        className="form-control"
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <Button
                        className="form-button form-button-width-100"
                        onClick={registerNewUser}>
                        Registrieren
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <h2>Ausloggen</h2>
          <Button className="form-button-danger" onClick={logoutUser}>
            Ausloggen
          </Button>
        </>
      )}
    </>
  );
}
FrontPage.propTypes = {
  username: PropTypes.string.isRequired,
  setReloadCurrentUser: PropTypes.func.isRequired,
  setReloadIsAdmin: PropTypes.func.isRequired
};
