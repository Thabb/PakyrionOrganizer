import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './front_page/FrontPage';
import UserPage from './user_page/UserPage';
import CharacterPage from './character_page/CharacterPage';
import AdminPage from './admin_page/AdminPage';
import ConventionPage from './convention_page/ConventionPage';
import ConventionSignUpPage from './convention_signup_page/ConventionSignUpPage';
import Header from './shared/Header';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import API from './shared/api';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
function App() {
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const [reloadCurrentUser, setReloadCurrentUser] = useState(false);
  const [reloadIsAdmin, setReloadIsAdmin] = useState(false);

  useEffect(() => {
    API.get('/api/current_user/')
      .then((response) => {
        setUsername(response.data.user);
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
  return (
    <Router>
      <Header username={username} isAdmin={isAdmin} />
      <main>
        <Container>
          <div className="main-card">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <FrontPage
                    username={username}
                    setReloadCurrentUser={setReloadCurrentUser}
                    setReloadIsAdmin={setReloadIsAdmin}
                  />
                }
              />
              <Route path="/user/" element={<UserPage username={username} />} />
              <Route path="/character/:characterId" element={<CharacterPage />} />
              <Route path="/admin/" element={<AdminPage />} />
              <Route path="/convention/:conventionId" element={<ConventionPage />} />
              <Route path="/signup/:conventionId" element={<ConventionSignUpPage />} />
            </Routes>
          </div>
        </Container>
      </main>
    </Router>
  );
}

export default App;
