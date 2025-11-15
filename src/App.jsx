import { Route, Routes } from 'react-router';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/auth/auth.reducer';
import RegisterPage from './pages/RegisterPage';
import { LocalStorageService } from './services/LocalStorageService';
import { userService } from './services/userService';
import { authService } from './services/authService';
import { tryCatch } from './utils/helpers/errorHandlers';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Verify token validity and initial data to store
    async function initStoreCheckup() {
      tryCatch(
        dispatch,
        async () => {
          const token = LocalStorageService.getAccessToken();
          if (token) {
            await authService.verifyToken({ token });
            const user = await userService.get();
            dispatch(login({ user, access: token }));
          } else {
            dispatch(logout());
          }
        },
        {
          onError: () => dispatch(logout()),
        }
      );
    }
    initStoreCheckup();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<HomePage />} />
      </Route>
      <Route path="/auth" element={<MainLayout />}>
        <Route index path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
