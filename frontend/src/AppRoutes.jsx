// src/AppRoutes.jsx
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/context/AuthContext';

// Componentes layout
import { Header } from './features/layout/Header';
import { Footer } from './features/layout/Footer';
import { LandingPage } from './features/layout/LandingPage';

// Componentes auth
import { LoginPage } from './features/auth/components/LoginPage';
import { RegisterPage } from './features/auth/components/RegisterPage';

// Componentes dashboard
import { Dashboard } from './dashboard/Dashboard';

// Componente API / caricaturas
import ApiGf from './shared/components/ApiGf';

/** Ruta protegida: redirige al login si no hay sesión */
const PrivateRoute = ({ children }) => {
    const { isAuth } = useAuth();
    return isAuth ? children : <Navigate to="/login" replace />;
};

export const AppRoutes = () => {
    return (
        <HashRouter>
            {/* HEADER GLOBAL */}
            <Header />

            {/* RUTAS */}
            <Routes>
                {/* Landing / Home */}
                <Route path="/" element={<LandingPage />} />

                {/* Auth */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Dashboard protegido */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                {/* API / Caricaturas */}
                <Route path="/apigf" element={<ApiGf />} />

                {/* Ruta por defecto: redirige a home */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* FOOTER GLOBAL */}
            <Footer />
        </HashRouter>
    );
};