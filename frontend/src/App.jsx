import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './front_page/FrontPage';
import UserPage from './user_page/UserPage';
import CharacterPage from './character_page/CharacterPage';
import AdminPage from './admin_page/AdminPage';
import ConventionPage from './convention_page/ConventionPage';
import ConventionSignUpPage from './convention_signup_page/ConventionSignUpPage';
import Header from './shared/Header';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<FrontPage />} />
          <Route path="/user/" element={<UserPage />} />
          <Route path="/character/:characterId" element={<CharacterPage />} />
          <Route path="/admin/" element={<AdminPage />} />
          <Route path="/convention/:conventionId" element={<ConventionPage />} />
          <Route path="/signup/:conventionId" element={<ConventionSignUpPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
