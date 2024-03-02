import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import History from './pages/History/History';
import Popular from './pages/Popular/Popular';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/history" element={<History />} />
        <Route path="/popular" element={<Popular />} />
      </Routes>
    </div>
  );
}

export default App;
