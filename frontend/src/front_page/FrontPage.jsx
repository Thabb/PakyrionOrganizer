import { useState } from 'react';
import API from '../shared/api';
import { Link } from 'react-router-dom';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function FrontPage() {
  const [username, setUsername] = useState('nicht eingeloggt');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const registerNewUser = () => {
    const payload = {
      username: registerUsername,
      email: registerEmail,
      firstname: registerFirstName,
      lastname: registerLastName,
      password: registerPassword
    };
    API.post('/api/register/', payload).then((response) => {
      console.log(response);
    });
  };

  const loginUser = () => {
    const payload = {
      username: loginUsername,
      password: loginPassword
    };
    API.post('/api/login/', payload).then((response) => {
      console.log(response);
      if (response.status === 200) setUsername(loginUsername);
    });
  };

  const logoutUser = () => {
    API.post('/api/logout/').then((response) => {
      console.log(response);
      if (response.status === 200) setUsername('nicht eingeloggt');
    });
  };

  return (
    <>
      {username}
      <h1>Front Page</h1>
      <Link to={'/user/'}>User Profil</Link>
      <h2>Registrierung</h2>
      <table>
        <tbody>
          <tr>
            <th>Benutzername:</th>
            <td>
              <input
                type="text"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>
              <input
                type="text"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Vorname:</th>
            <td>
              <input
                type="text"
                value={registerFirstName}
                onChange={(e) => setRegisterFirstName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Nachname:</th>
            <td>
              <input
                type="text"
                value={registerLastName}
                onChange={(e) => setRegisterLastName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <input
                type="text"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={registerNewUser}>Registrieren</button>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Einloggen</h2>
      <table>
        <tbody>
          <tr>
            <th>Benutzername:</th>
            <td>
              <input
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
                type="text"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={loginUser}>Einloggen</button>
            </td>
          </tr>
        </tbody>
      </table>
      <h2>Ausloggen</h2>
      <button onClick={logoutUser}>Ausloggen</button>
    </>
  );
}
