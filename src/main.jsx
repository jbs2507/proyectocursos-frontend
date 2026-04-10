import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './features/auth/context/AuthContext';
import { AppRoutes } from './AppRoutes';
import './shared/styles.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </StrictMode>
);
