import { useEffect, useState } from 'react';
import API from '../shared/api';
import { Link } from 'react-router-dom';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
export default function FrontPage() {
  const [userEmail, setUserEmail] = useState('-');
  const [isAdmin, setIsAdmin] = useState(false);

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [reloadCurrentUser, setReloadCurrentUser] = useState(false);
  const [reloadIsAdmin, setReloadIsAdmin] = useState(false);

  useEffect(() => {
    API.get('/api/current_user/')
      .then((response) => {
        setUserEmail(response.data.user);
        setReloadCurrentUser(false);
      })
      .catch((error) => console.log(error));
  }, [reloadCurrentUser]);

  useEffect(() => {
    API.get('/api/is_user_admin/')
      .then((response) => {
        setIsAdmin(response.data.is_admin);
        setReloadIsAdmin(false);
      })
      .catch((error) => console.log(error));
  }, [reloadIsAdmin]);

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
      Eingeloggt als: {userEmail === 'AnonymousUser' ? '-' : userEmail}
      <h1>Front Page</h1>
      <div>
        <Link to={'/user/'}>User Profil</Link>
      </div>
      <div>{isAdmin ? <Link to={'/admin/'}>Admin Seite</Link> : null}</div>
      <h2>Registrierung</h2>
      <table>
        <tbody>
          <tr>
            <th>Username:</th>
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
