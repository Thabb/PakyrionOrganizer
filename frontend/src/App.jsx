import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './front_page/FrontPage';
import UserPage from './user_page/UserPage';
import CharacterPage from './character_page/CharacterPage';
import AdminPage from './convention_page/AdminPage';

/**
 *
 * @return {JSX.Element}
 * @constructor
 */
function App() {
  return (
    <Router>
      {/* PLACEHOLDER FOR HEADER*/}
      <main>
        <Routes>
          <Route exact path="/" element={<FrontPage />} />
          <Route path="/user/" element={<UserPage />} />
          <Route path="/character/:characterId" element={<CharacterPage />} />
          <Route path="/convention/" element={<AdminPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
