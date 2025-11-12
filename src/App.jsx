import { Route, Routes } from 'react-router';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Routes>
      <Route path="/test " element={<HomePage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
