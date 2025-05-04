
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import GeneratorPage from '@/pages/GeneratorPage';
import LandingPreview from '@/pages/LandingPreview';
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/generator" element={
          <PrivateRoute>
            <GeneratorPage />
          </PrivateRoute>
        } />
        <Route path="/preview/:id" element={<LandingPreview />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
