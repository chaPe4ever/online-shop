import { Route, Routes } from 'react-router';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ValidationPage from './pages/ValidationPage';
import { Layout } from 'lucide-react';
import NavigationHeader from './pages/NavigationHeader';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavigationHeader />}>
        <Route path="" element={<HomePage />} />
      </Route>
      <Route path="/auth" element={<NavigationHeader />}>
        <Route index path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="validation" element={<ValidationPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
