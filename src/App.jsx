import { Route, Routes } from 'react-router';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import NavigationHeader from './pages/NavigationHeader';
import { useEffect } from 'react';
import { fetchMyUser, verifyToken } from './lib/api';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/auth/auth.reducer';
import RegisterPage from './pages/RegisterPage';
import { tryCatch } from './lib/utils';
import { LocalStorageService } from './lib/LocalStorageService';

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
            await verifyToken({ token });
            const user = await fetchMyUser();
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
      <Route path="/" element={<NavigationHeader />}>
        <Route path="" element={<HomePage />} />
      </Route>
      <Route path="/auth" element={<NavigationHeader />}>
        <Route index path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
